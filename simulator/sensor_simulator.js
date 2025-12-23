const mqtt = require('mqtt');
const os = require('os');

// Public MQTT broker (HiveMQ)
const client = mqtt.connect('mqtt://broker.hivemq.com');

// Simulated network devices
const networkDevices = [
  { deviceId: 'sensor-001', deviceName: 'Heart Monitor Sensor', deviceType: 'sensor', location: 'Room 101' },
  { deviceId: 'sensor-002', deviceName: 'Temperature Sensor', deviceType: 'sensor', location: 'Room 102' },
  { deviceId: 'sensor-003', deviceName: 'BP Monitor Sensor', deviceType: 'sensor', location: 'Room 103' },
  { deviceId: 'gateway-001', deviceName: 'Main Gateway', deviceType: 'gateway', location: 'Floor 1' },
  { deviceId: 'gateway-002', deviceName: 'Backup Gateway', deviceType: 'gateway', location: 'Floor 2' },
  { deviceId: 'server-001', deviceName: 'Central Server', deviceType: 'server', location: 'Data Center' }
];

function getRandomIP() {
  return `192.168.1.${Math.floor(Math.random() * 200) + 10}`;
}

function getRandomMAC() {
  return Array.from({length: 6}, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':');
}

function simulateNetworkMetrics(deviceId) {
  // Base metrics that change over time
  const baseLatency = deviceId.includes('sensor') ? 20 : deviceId.includes('gateway') ? 10 : 5;
  const baseBandwidth = deviceId.includes('sensor') ? 100 : deviceId.includes('gateway') ? 1000 : 10000;
  
  return {
    deviceId,
    latency: Math.floor(baseLatency + Math.random() * 30), // ms
    bandwidth: Math.floor(baseBandwidth + Math.random() * 500), // kbps
    packetLoss: (Math.random() * 2).toFixed(2), // percentage
    uptime: Math.floor(Math.random() * 86400 * 7), // seconds (up to 7 days)
    cpuUsage: (Math.random() * 60 + 10).toFixed(1), // percentage
    memoryUsage: (Math.random() * 70 + 20).toFixed(1), // percentage
    temperature: (Math.random() * 15 + 35).toFixed(1), // °C
    signalStrength: Math.floor(Math.random() * 40 - 90) // dBm
  };
}

function simulateTrafficMetrics(deviceId) {
  const baseTraffic = deviceId.includes('sensor') ? 1000 : deviceId.includes('gateway') ? 50000 : 500000;
  
  return {
    deviceId,
    bytesIn: Math.floor(baseTraffic + Math.random() * baseTraffic * 0.5),
    bytesOut: Math.floor(baseTraffic + Math.random() * baseTraffic * 0.5),
    packetsIn: Math.floor(Math.random() * 1000),
    packetsOut: Math.floor(Math.random() * 1000),
    bandwidth: Math.floor(Math.random() * 1000),
    latency: Math.floor(Math.random() * 50 + 10)
  };
}

client.on('connect', () => {
  console.log("✅ Simulated ESP32 connected to MQTT");
  
  // Initialize network devices with static info
  networkDevices.forEach(device => {
    const initialData = {
      ...device,
      ipAddress: getRandomIP(),
      macAddress: getRandomMAC(),
      firmwareVersion: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      status: 'online',
      ...simulateNetworkMetrics(device.deviceId)
    };
    
    client.publish(
      `network/devices/${device.deviceId}`,
      JSON.stringify(initialData)
    );
    console.log(`📡 Initialized device: ${device.deviceId}`);
  });

  // Publish patient vitals every 3 seconds
  setInterval(() => {
    const heartRate = Math.floor(Math.random() * (110 - 60) + 60);
    const temperature = parseFloat((Math.random() * (38 - 36) + 36).toFixed(1));
    const spo2 = Math.floor(Math.random() * (100 - 92) + 92);
    const systolic = Math.floor(Math.random() * (140 - 90) + 90);
    const diastolic = Math.floor(Math.random() * (90 - 60) + 60);
    const timestamp = new Date().toISOString();

    // Publish to separate topics for Node-RED
    client.publish(
      'healthcare/vitals/heart_rate',
      JSON.stringify({ value: heartRate, timestamp: timestamp })
    );

    client.publish(
      'healthcare/vitals/temperature',
      JSON.stringify({ value: temperature, timestamp: timestamp })
    );

    client.publish(
      'healthcare/vitals/spo2',
      JSON.stringify({ value: spo2, timestamp: timestamp })
    );

    client.publish(
      'healthcare/vitals/blood_pressure',
      JSON.stringify({ systolic: systolic, diastolic: diastolic, timestamp: timestamp })
    );

    // Also publish to old topic for backward compatibility with Express server
    const vitals = {
      heartRate: heartRate,
      temperature: temperature.toString(),
      spo2: spo2,
      bloodPressure: `${systolic}/${diastolic}`
    };

    client.publish(
      'healthcare/patient1/vitals',
      JSON.stringify(vitals)
    );

    console.log("💓 Published Vitals:", { heartRate, temperature, spo2, bp: `${systolic}/${diastolic}` });
  }, 3000);
  
  // Update network device metrics every 5 seconds
  setInterval(() => {
    networkDevices.forEach(device => {
      const metrics = {
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        deviceType: device.deviceType,
        status: Math.random() > 0.05 ? 'online' : 'warning', // 5% chance of warning
        ...simulateNetworkMetrics(device.deviceId)
      };
      
      client.publish(
        `network/devices/${device.deviceId}`,
        JSON.stringify(metrics)
      );
    });
    
    console.log("📊 Updated network device metrics");
  }, 5000);
  
  // Publish traffic metrics every 10 seconds
  setInterval(() => {
    networkDevices.forEach(device => {
      const traffic = simulateTrafficMetrics(device.deviceId);
      
      client.publish(
        `network/metrics/${device.deviceId}`,
        JSON.stringify(traffic)
      );
    });
    
    console.log("🌐 Published network traffic metrics");
  }, 10000);
});
