// ===============================
// Real-Time Healthcare IoT Server
// ===============================

const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const os = require('os');
const dns = require('dns').promises;

// -------------------------------
// App & Server Setup
// -------------------------------
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static('public'));

// -------------------------------
// MongoDB (LOCAL) Connection
// -------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to Local MongoDB'))
.catch(err => console.error('❌ MongoDB Error:', err));

// -------------------------------
// MongoDB Schema & Model
// -------------------------------
const VitalSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Vital = mongoose.model('Vital', VitalSchema);

// -------------------------------
// Network Device Schema & Model
// -------------------------------
const NetworkDeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  deviceName: String,
  ipAddress: String,
  macAddress: String,
  deviceType: String, // sensor, gateway, server, router
  status: { type: String, default: 'online' }, // online, offline, warning
  lastSeen: { type: Date, default: Date.now },
  bandwidth: Number, // kbps
  latency: Number, // ms
  packetLoss: Number, // percentage
  uptime: Number, // seconds
  firmwareVersion: String,
  location: String
});

const NetworkDevice = mongoose.model('NetworkDevice', NetworkDeviceSchema);

// Network Traffic Schema
const NetworkTrafficSchema = new mongoose.Schema({
  deviceId: String,
  bytesIn: Number,
  bytesOut: Number,
  packetsIn: Number,
  packetsOut: Number,
  bandwidth: Number,
  latency: Number,
  timestamp: { type: Date, default: Date.now }
});

const NetworkTraffic = mongoose.model('NetworkTraffic', NetworkTrafficSchema);

// Network Alert Schema
const NetworkAlertSchema = new mongoose.Schema({
  deviceId: String,
  alertType: String, // latency, bandwidth, connection, security
  severity: String, // critical, warning, info
  message: String,
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

const NetworkAlert = mongoose.model('NetworkAlert', NetworkAlertSchema);

// In-memory device tracking
const connectedDevices = new Map();
const networkMetrics = {
  totalDevices: 0,
  onlineDevices: 0,
  totalBandwidth: 0,
  averageLatency: 0,
  alertCount: 0
};

// -------------------------------
// MQTT Connection (Simulator)
// -------------------------------
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

mqttClient.on('connect', () => {
  console.log('✅ Connected to MQTT Broker');
  mqttClient.subscribe('healthcare/patient1/vitals');
  mqttClient.subscribe('network/devices/#');
  mqttClient.subscribe('network/metrics/#');
});

// Receive data from simulator
mqttClient.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    if (topic.startsWith('network/devices/')) {
      // Handle network device updates
      await handleNetworkDeviceUpdate(data);
      io.emit('networkDevice', data);
    } else if (topic.startsWith('network/metrics/')) {
      // Handle network metrics
      await handleNetworkMetrics(data);
      io.emit('networkMetrics', data);
    } else if (topic === 'healthcare/patient1/vitals') {
      // Handle patient vitals
      console.log('📥 Received:', data);

      // Save data to MongoDB
      const vital = new Vital({
        heartRate: data.heartRate,
        temperature: data.temperature
      });
      await vital.save();

      // Send data to dashboard
      io.emit('vitals', data);
    }

  } catch (err) {
    console.error('❌ Error processing MQTT message:', err);
  }
});

// Network device update handler
async function handleNetworkDeviceUpdate(data) {
  try {
    const device = await NetworkDevice.findOneAndUpdate(
      { deviceId: data.deviceId },
      { 
        ...data, 
        lastSeen: new Date(),
        status: 'online'
      },
      { upsert: true, new: true }
    );
    
    connectedDevices.set(data.deviceId, device);
    updateNetworkMetrics();
    
    // Check for alerts
    if (data.latency > 200) {
      await createNetworkAlert(data.deviceId, 'latency', 'warning', 
        `High latency detected: ${data.latency}ms`);
    }
    
    if (data.packetLoss > 5) {
      await createNetworkAlert(data.deviceId, 'connection', 'critical', 
        `Packet loss detected: ${data.packetLoss}%`);
    }
    
    console.log('📡 Network device updated:', data.deviceId);
  } catch (err) {
    console.error('Error updating network device:', err);
  }
}

// Network metrics handler
async function handleNetworkMetrics(data) {
  try {
    const traffic = new NetworkTraffic(data);
    await traffic.save();
    
    updateNetworkMetrics();
    console.log('📊 Network metrics recorded:', data.deviceId);
  } catch (err) {
    console.error('Error recording network metrics:', err);
  }
}

// Create network alert
async function createNetworkAlert(deviceId, alertType, severity, message) {
  try {
    const alert = new NetworkAlert({
      deviceId,
      alertType,
      severity,
      message
    });
    await alert.save();
    
    networkMetrics.alertCount++;
    io.emit('networkAlert', alert);
    
    console.log(`🚨 Alert: ${message}`);
  } catch (err) {
    console.error('Error creating alert:', err);
  }
}

// Update network metrics
function updateNetworkMetrics() {
  const devices = Array.from(connectedDevices.values());
  networkMetrics.totalDevices = devices.length;
  networkMetrics.onlineDevices = devices.filter(d => d.status === 'online').length;
  networkMetrics.totalBandwidth = devices.reduce((sum, d) => sum + (d.bandwidth || 0), 0);
  networkMetrics.averageLatency = devices.length > 0 
    ? devices.reduce((sum, d) => sum + (d.latency || 0), 0) / devices.length 
    : 0;
}

// -------------------------------
// API: Get Last 10 Records
// -------------------------------
app.get('/history', async (req, res) => {
  const vitals = await Vital.find()
    .sort({ time: -1 })
    .limit(10);

  res.json(vitals);
});
app.get('/api/history', async (req, res) => {
    const data = await Vital.find().sort({ timestamp: -1 }).limit(20);
    res.json(data);
});

// -------------------------------
// Network Management APIs
// -------------------------------

// Get all network devices
app.get('/api/network/devices', async (req, res) => {
  try {
    const devices = await NetworkDevice.find().sort({ lastSeen: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get device by ID
app.get('/api/network/devices/:deviceId', async (req, res) => {
  try {
    const device = await NetworkDevice.findOne({ deviceId: req.params.deviceId });
    if (!device) return res.status(404).json({ error: 'Device not found' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get network topology
app.get('/api/network/topology', async (req, res) => {
  try {
    const devices = await NetworkDevice.find();
    const topology = {
      nodes: devices.map(d => ({
        id: d.deviceId,
        name: d.deviceName,
        type: d.deviceType,
        status: d.status,
        ip: d.ipAddress
      })),
      links: generateTopologyLinks(devices)
    };
    res.json(topology);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get network metrics summary
app.get('/api/network/metrics', async (req, res) => {
  try {
    res.json(networkMetrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get network traffic history
app.get('/api/network/traffic/:deviceId', async (req, res) => {
  try {
    const traffic = await NetworkTraffic.find({ 
      deviceId: req.params.deviceId 
    })
    .sort({ timestamp: -1 })
    .limit(50);
    res.json(traffic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get network alerts
app.get('/api/network/alerts', async (req, res) => {
  try {
    const alerts = await NetworkAlert.find({ resolved: false })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resolve network alert
app.post('/api/network/alerts/:id/resolve', async (req, res) => {
  try {
    const alert = await NetworkAlert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    networkMetrics.alertCount = Math.max(0, networkMetrics.alertCount - 1);
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bandwidth usage by device
app.get('/api/network/bandwidth', async (req, res) => {
  try {
    const devices = await NetworkDevice.find();
    const bandwidthData = devices.map(d => ({
      deviceId: d.deviceId,
      deviceName: d.deviceName,
      bandwidth: d.bandwidth || 0,
      status: d.status
    }));
    res.json(bandwidthData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Network health check
app.get('/api/network/health', async (req, res) => {
  try {
    const devices = await NetworkDevice.find();
    const now = Date.now();
    const health = {
      total: devices.length,
      online: devices.filter(d => (now - d.lastSeen.getTime()) < 60000).length,
      offline: devices.filter(d => (now - d.lastSeen.getTime()) >= 60000).length,
      warning: devices.filter(d => d.status === 'warning').length,
      averageLatency: networkMetrics.averageLatency,
      totalBandwidth: networkMetrics.totalBandwidth,
      timestamp: new Date()
    };
    res.json(health);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// System information
app.get('/api/system/info', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const info = {
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    cpuCount: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    networkInterfaces: Object.keys(networkInterfaces).map(name => ({
      name,
      addresses: networkInterfaces[name].filter(i => i.family === 'IPv4')
    }))
  };
  res.json(info);
});

// Helper function to generate topology links
function generateTopologyLinks(devices) {
  const links = [];
  const servers = devices.filter(d => d.deviceType === 'server');
  const gateways = devices.filter(d => d.deviceType === 'gateway');
  const sensors = devices.filter(d => d.deviceType === 'sensor');
  
  // Connect sensors to gateways
  sensors.forEach((sensor, idx) => {
    const gateway = gateways[idx % gateways.length];
    if (gateway) {
      links.push({ source: sensor.deviceId, target: gateway.deviceId });
    }
  });
  
  // Connect gateways to servers
  gateways.forEach(gateway => {
    const server = servers[0];
    if (server) {
      links.push({ source: gateway.deviceId, target: server.deviceId });
    }
  });
  
  return links;
}

// Periodic device health check
setInterval(async () => {
  try {
    const devices = await NetworkDevice.find();
    const now = Date.now();
    
    for (const device of devices) {
      const timeSinceLastSeen = now - device.lastSeen.getTime();
      
      if (timeSinceLastSeen > 60000 && device.status !== 'offline') {
        device.status = 'offline';
        await device.save();
        connectedDevices.delete(device.deviceId);
        
        await createNetworkAlert(
          device.deviceId,
          'connection',
          'critical',
          `Device ${device.deviceName} went offline`
        );
      }
    }
    
    updateNetworkMetrics();
    io.emit('networkMetricsUpdate', networkMetrics);
  } catch (err) {
    console.error('Error in health check:', err);
  }
}, 30000); // Check every 30 seconds


// -------------------------------
// Start Server
// -------------------------------
server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
