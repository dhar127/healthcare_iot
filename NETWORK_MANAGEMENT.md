# Healthcare IoT Network Management System

## Overview
This project is a comprehensive Healthcare IoT monitoring system with advanced network management capabilities. It combines real-time patient vital signs monitoring with sophisticated network infrastructure management.

## Features

### Patient Monitoring
- **Real-time Vital Signs Tracking**: Heart rate, temperature, SpO2, and blood pressure
- **Live Charts**: Visual representation of patient data trends
- **Alert System**: Automatic notifications for abnormal readings
- **Historical Data**: MongoDB storage for long-term tracking

### Network Management System 🌐

#### 1. Device Discovery & Tracking
- Automatic device registration and discovery
- Support for multiple device types:
  - **Sensors**: Patient monitoring devices (heart rate, temperature, BP monitors)
  - **Gateways**: Network bridges and aggregators
  - **Servers**: Central processing units
  - **Routers**: Network routing equipment

#### 2. Real-Time Monitoring
- **Device Status**: Online/offline/warning states
- **Bandwidth Monitoring**: Track data usage per device
- **Latency Tracking**: Monitor response times
- **Packet Loss Detection**: Identify network quality issues
- **Connection Health**: Automatic health checks every 30 seconds

#### 3. Network Topology Visualization
- Interactive network diagram using D3.js
- Visual representation of device connections
- Device type differentiation with color coding
- Drag-and-drop node repositioning
- Real-time topology updates

#### 4. Traffic Analytics
- Bytes in/out tracking
- Packets transmitted/received
- Bandwidth utilization graphs
- Historical traffic data storage
- Traffic pattern analysis

#### 5. Alert Management
- **Alert Types**:
  - Latency alerts (>200ms)
  - Packet loss alerts (>5%)
  - Connection failures
  - Device offline notifications
- **Severity Levels**: Critical, Warning, Info
- Alert resolution tracking
- Real-time alert notifications

#### 6. Performance Metrics
- **System-wide Metrics**:
  - Total devices count
  - Online devices count
  - Total bandwidth usage
  - Average network latency
  - Active alerts count
- **Per-Device Metrics**:
  - CPU usage
  - Memory usage
  - Device temperature
  - Signal strength
  - Uptime tracking

## Technology Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database for storing vitals and network data
- **Mongoose** - MongoDB ODM
- **MQTT** - IoT messaging protocol (HiveMQ public broker)
- **Socket.IO** - Real-time bidirectional communication

### Frontend
- **HTML5/CSS3** - Structure and styling
- **Vanilla JavaScript** - Client-side logic
- **Chart.js** - Data visualization
- **D3.js** - Network topology visualization
- **Socket.IO Client** - Real-time updates

## Project Structure

```
healthcare_iot/
├── server/
│   ├── server.js           # Main server with network management APIs
│   ├── package.json        # Server dependencies
│   └── public/
│       ├── index.html      # Patient monitoring dashboard
│       ├── network.html    # Network management dashboard
│       └── script.js       # Client scripts
└── simulator/
    ├── sensor_simulator.js # Device & network metrics simulator
    └── package.json        # Simulator dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install express mongoose mqtt socket.io

# Install simulator dependencies
cd ../simulator
npm install mqtt
```

### Step 2: Start MongoDB
Make sure MongoDB is running on `mongodb://127.0.0.1:27017/healthcare`

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### Step 3: Start the Server

```bash
cd server
node server.js
```

Server will start at `http://localhost:3000`

### Step 4: Start the Simulator

```bash
cd simulator
node sensor_simulator.js
```

The simulator will:
- Publish patient vitals every 3 seconds
- Update network device metrics every 5 seconds
- Publish traffic metrics every 10 seconds

## API Endpoints

### Patient Vitals
- `GET /history` - Get last 10 vital records
- `GET /api/history` - Get last 20 vital records

### Network Management

#### Devices
- `GET /api/network/devices` - List all network devices
- `GET /api/network/devices/:deviceId` - Get specific device details

#### Topology & Metrics
- `GET /api/network/topology` - Get network topology data
- `GET /api/network/metrics` - Get system-wide network metrics
- `GET /api/network/health` - Get network health summary

#### Traffic & Monitoring
- `GET /api/network/traffic/:deviceId` - Get device traffic history
- `GET /api/network/bandwidth` - Get bandwidth usage by device

#### Alerts
- `GET /api/network/alerts` - Get unresolved alerts
- `POST /api/network/alerts/:id/resolve` - Mark alert as resolved

#### System Information
- `GET /api/system/info` - Get server system information

## Usage

### Access Dashboards

1. **Patient Monitoring Dashboard**: `http://localhost:3000/index.html`
   - View real-time patient vitals
   - Monitor health trends
   - Receive alert notifications

2. **Network Management Dashboard**: `http://localhost:3000/network.html`
   - Monitor all connected devices
   - View network topology
   - Track bandwidth and latency
   - Manage network alerts

### Monitor Network Health

The network management system provides:

1. **Real-time Metrics**
   - Total and online device counts
   - Aggregate bandwidth usage
   - Average network latency
   - Active alert count

2. **Visual Analytics**
   - Bandwidth usage bar chart
   - Latency distribution pie chart
   - Interactive network topology map

3. **Device Management**
   - Complete device inventory
   - Status indicators (online/warning/offline)
   - Performance metrics per device
   - Last seen timestamps

4. **Alert System**
   - Automatic alert generation
   - Severity classification
   - One-click resolution
   - Alert history tracking

## Network Device Types

### Sensors (Patient Monitors)
- Monitor patient vital signs
- Low bandwidth usage (~100-600 kbps)
- Higher latency tolerance (20-50ms)
- Examples: Heart rate monitors, temperature sensors, BP monitors

### Gateways
- Aggregate sensor data
- Medium bandwidth (~1000-1500 kbps)
- Low latency requirements (10-40ms)
- Bridge between sensors and servers

### Servers
- Central data processing
- High bandwidth (10000+ kbps)
- Ultra-low latency (5-35ms)
- Store and analyze all data

## Monitoring & Alerts

### Automatic Alert Triggers

1. **High Latency**: Triggered when latency > 200ms
2. **Packet Loss**: Triggered when packet loss > 5%
3. **Device Offline**: Triggered when no heartbeat for 60 seconds
4. **Abnormal Vitals**: Triggered for out-of-range patient readings

### Alert Severity Levels

- **Critical**: Immediate attention required (offline devices, severe packet loss)
- **Warning**: Should be addressed soon (high latency, moderate issues)
- **Info**: Informational only (device reconnected, normal operations)

## Data Models

### Network Device
```javascript
{
  deviceId: String,        // Unique device identifier
  deviceName: String,      // Human-readable name
  ipAddress: String,       // IP address
  macAddress: String,      // MAC address
  deviceType: String,      // sensor/gateway/server/router
  status: String,          // online/offline/warning
  lastSeen: Date,          // Last communication timestamp
  bandwidth: Number,       // Current bandwidth (kbps)
  latency: Number,         // Current latency (ms)
  packetLoss: Number,      // Packet loss percentage
  uptime: Number,          // Uptime in seconds
  firmwareVersion: String, // Firmware version
  location: String         // Physical location
}
```

### Network Traffic
```javascript
{
  deviceId: String,
  bytesIn: Number,
  bytesOut: Number,
  packetsIn: Number,
  packetsOut: Number,
  bandwidth: Number,
  latency: Number,
  timestamp: Date
}
```

### Network Alert
```javascript
{
  deviceId: String,
  alertType: String,      // latency/bandwidth/connection/security
  severity: String,       // critical/warning/info
  message: String,
  timestamp: Date,
  resolved: Boolean
}
```

## Real-Time Features

### Socket.IO Events

**Server → Client:**
- `vitals` - Patient vital signs update
- `networkDevice` - Device status update
- `networkMetrics` - Network metrics update
- `networkMetricsUpdate` - System-wide metrics update
- `networkAlert` - New alert generated

## Performance Considerations

- **Data Retention**: Configure MongoDB TTL indexes for automatic old data cleanup
- **Scalability**: Can handle 100+ devices with current architecture
- **Real-time Updates**: Socket.IO ensures sub-second latency for dashboard updates
- **Network Efficiency**: MQTT protocol minimizes bandwidth usage

## Future Enhancements

Potential features for expansion:

1. **Security Monitoring**
   - Intrusion detection
   - Anomaly detection
   - Authentication logs

2. **Predictive Analytics**
   - ML-based failure prediction
   - Capacity planning
   - Performance optimization

3. **Multi-site Support**
   - Multiple hospital locations
   - Geographic topology
   - Cross-site analytics

4. **Mobile App**
   - iOS/Android apps
   - Push notifications
   - Remote monitoring

5. **Advanced Reporting**
   - PDF report generation
   - Scheduled email reports
   - Custom dashboards

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string in server.js
   - Verify port 27017 is not blocked

2. **MQTT Connection Issues**
   - Check internet connectivity
   - Verify HiveMQ broker is accessible
   - Try alternative MQTT broker

3. **Devices Not Appearing**
   - Ensure simulator is running
   - Check MQTT topics match
   - Verify server subscriptions

4. **Real-time Updates Not Working**
   - Check Socket.IO connection
   - Verify no firewall blocking WebSocket
   - Check browser console for errors

## License

This project is for educational and demonstration purposes.

## Contributors

Developed as a comprehensive IoT healthcare and network management demonstration system.

## Support

For issues or questions, refer to the project documentation or create an issue in the repository.

---

**Note**: This system uses a public MQTT broker (HiveMQ). For production use, implement a private MQTT broker with authentication and encryption.
