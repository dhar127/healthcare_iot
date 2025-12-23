# Node-RED Integration Guide

## 🎯 Overview

This Healthcare IoT project now includes **Node-RED** for visual flow-based programming, providing:
- Visual workflow editor
- Real-time dashboard with gauges and charts
- MQTT message processing
- Alert management system
- Data storage integration

---

## 📦 Installation

### Step 1: Install Node-RED Dependencies

```powershell
# Navigate to node-red folder
cd node-red

# Install Node-RED and required packages
npm install
```

### Step 2: Verify Installation

```powershell
# Check Node-RED version
node-red --version
```

---

## 🚀 Running Node-RED

### Start Node-RED Server

```powershell
# From healthcare_iot/node-red folder
npm start

# OR with verbose logging
npm run dev
```

### Access Node-RED

Once started, access:
- **Flow Editor**: http://localhost:1881
- **Dashboard**: http://localhost:1881/ui
- **Admin API**: http://localhost:1881/admin

**Login Credentials:**
- Username: `admin`
- Password: `admin`

---

## 🏗️ System Architecture

```
┌─────────────────────┐
│  Sensor Simulator   │ (Port 1883 - MQTT)
└──────────┬──────────┘
           │ MQTT Messages
           ▼
┌─────────────────────┐
│   MQTT Broker       │ (localhost:1883)
└──────────┬──────────┘
           │
           ├──────────────────────┐
           │                      │
           ▼                      ▼
┌─────────────────────┐  ┌─────────────────────┐
│     Node-RED        │  │   Express Server    │
│   (Port 1881)       │  │   (Port 3000)       │
│                     │  │                     │
│ • Flow Processing   │  │ • Web Dashboards    │
│ • Visual Dashboard  │  │ • MongoDB Storage   │
│ • Alert Logic       │  │ • Socket.io         │
└─────────────────────┘  └─────────────────────┘
```

---

## 🎨 Node-RED Features Implemented

### 1. **MQTT Subscribers**
- ✅ Heart Rate monitoring
- ✅ Temperature monitoring  
- ✅ SpO2 (Blood Oxygen) monitoring
- ✅ Blood Pressure monitoring

### 2. **Real-Time Dashboard**
- **Gauges**: Live vital sign displays with color-coded ranges
- **Charts**: Trend analysis with 5-minute history
- **Text Displays**: Blood pressure readings
- **Toast Notifications**: Pop-up alerts for abnormal values

### 3. **Alert Logic**
- **Heart Rate**:
  - Critical: < 60 or > 100 bpm
  - Normal: 60-100 bpm
- **Temperature**:
  - Warning: < 36.5°C or > 37.5°C
  - Normal: 36.5-37.5°C
- **SpO2**:
  - Critical: < 95%
  - Normal: ≥ 95%
- **Blood Pressure**:
  - Warning: Systolic < 90 or > 140, Diastolic < 60 or > 90
  - Normal: 90-140 / 60-90 mmHg

### 4. **Data Processing Flows**
- JSON parsing
- Range validation
- Alert generation
- Database storage integration
- Debug logging

---

## 🔧 Complete Setup & Testing

### Terminal 1: Start MongoDB (if not running)
```powershell
mongod
```

### Terminal 2: Start Express Server
```powershell
cd server
node server.js
```

### Terminal 3: Start Node-RED
```powershell
cd node-red
npm start
```

### Terminal 4: Start Sensor Simulator
```powershell
cd simulator
node sensor_simulator.js
```

---

## 📊 Accessing Dashboards

### Main Web Dashboards (Express Server)
- **Patient Monitor**: http://localhost:3000/
- **Analytics**: http://localhost:3000/analytics.html
- **3D Visualization**: http://localhost:3000/visualization.html
- **Network Monitor**: http://localhost:3000/network.html

### Node-RED Dashboards
- **Flow Editor**: http://localhost:1881 (Create/Edit flows)
- **UI Dashboard**: http://localhost:1881/ui (View live dashboard)

---

## 🎛️ Node-RED Dashboard Components

### Vital Signs Group
```
┌─────────────────────────────────┐
│     VITAL SIGNS                 │
├─────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐      │
│  │ Heart   │  │  Temp   │      │
│  │  Rate   │  │ 37.2°C  │      │
│  │ 75 bpm  │  │         │      │
│  └─────────┘  └─────────┘      │
│                                 │
│  ┌─────────┐  ┌─────────┐      │
│  │  SpO2   │  │   BP    │      │
│  │  98%    │  │ 120/80  │      │
│  └─────────┘  └─────────┘      │
└─────────────────────────────────┘
```

### Trends Group
```
┌─────────────────────────────────┐
│        TRENDS (5 min)           │
├─────────────────────────────────┤
│  Heart Rate Trend               │
│  ╱╲    ╱╲                       │
│ ╱  ╲  ╱  ╲                      │
│╱    ╲╱    ╲                     │
├─────────────────────────────────┤
│  Temperature Trend              │
│  ─────────────                  │
├─────────────────────────────────┤
│  SpO2 Trend                     │
│  ─────────────                  │
└─────────────────────────────────┘
```

---

## 🔍 Understanding the Flows

### Flow Structure

```
MQTT Input → JSON Parse → Range Check → Alert/Normal → Debug/Dashboard
                              │
                              ├─→ Critical → Red Alert
                              ├─→ Warning → Yellow Alert  
                              └─→ Normal → Green Status
```

### Key Nodes

1. **MQTT In**: Subscribes to sensor topics
2. **JSON**: Parses incoming messages
3. **Function**: Custom JavaScript logic for range checking
4. **Debug**: Logs messages to sidebar
5. **UI Gauge**: Visual gauge widgets
6. **UI Chart**: Line charts for trends
7. **HTTP Request**: Send data to Express API

---

## 🛠️ Customizing Flows

### Adding New Sensor

1. Open http://localhost:1881
2. Drag **MQTT In** node to canvas
3. Configure topic: `healthcare/vitals/new_sensor`
4. Add **JSON** parser node
5. Add **Function** node for validation
6. Add **UI Gauge** for display
7. Connect nodes and **Deploy**

### Modifying Alert Thresholds

Edit the function nodes in the flow:
```javascript
// Example: Heart Rate threshold
if (hr < 60) {  // Change 60 to your threshold
    // Critical alert
} else if (hr > 100) {  // Change 100 to your threshold
    // Warning alert
}
```

---

## 📱 Mobile Access

Node-RED dashboard is responsive! Access from mobile:
- Find your computer's IP: `ipconfig`
- Access: `http://YOUR_IP:1881/ui`

---

## 🐛 Troubleshooting

### Node-RED Won't Start
```powershell
# Check if port 1881 is in use
netstat -ano | findstr :1881

# Kill the process if needed
taskkill /PID <PID> /F
```

### No Data on Dashboard
1. ✅ Check MQTT broker is running
2. ✅ Verify sensor simulator is publishing
3. ✅ Check Node-RED flow is deployed (Deploy button)
4. ✅ Look at Debug sidebar for errors

### MQTT Connection Failed
- Ensure MQTT broker is running on `localhost:1883`
- Check firewall settings
- Verify MQTT broker config in flows.json

### Dashboard Shows "No Data"
- Wait 5-10 seconds for data to flow
- Check if sensor simulator is running
- Refresh browser page

---

## 🎓 Node-RED Learning Resources

- **Official Docs**: https://nodered.org/docs/
- **Tutorial**: https://nodered.org/docs/tutorials/
- **Flow Library**: https://flows.nodered.org/
- **Dashboard Nodes**: https://flows.nodered.org/node/node-red-dashboard

---

## 🔐 Security Notes

### Production Deployment
1. Change default admin password in `settings.js`
2. Enable HTTPS
3. Use environment variables for secrets
4. Restrict network access
5. Keep Node-RED updated

### Generate New Password Hash
```javascript
// In Node-RED command palette
node-red admin hash-pw
```

---

## 📈 Next Steps

### Enhancements You Can Add:
1. **Email Alerts**: Install `node-red-node-email`
2. **SMS Notifications**: Use Twilio nodes
3. **Database Charts**: Query historical data
4. **Machine Learning**: Anomaly detection
5. **Multi-Patient**: Multiple patient streams
6. **Report Generation**: PDF exports
7. **Video Integration**: Patient camera feeds

### Recommended Nodes to Install:
```
node-red-contrib-telegrambot    # Telegram notifications
node-red-node-email             # Email alerts
node-red-contrib-moment         # Time formatting
node-red-contrib-chartjs        # Advanced charts
```

---

## 🎉 Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Visual Flow Editor | ✅ | http://localhost:1881 |
| Live Dashboard | ✅ | http://localhost:1881/ui |
| MQTT Integration | ✅ | All vitals monitored |
| Real-time Gauges | ✅ | 4 vital signs |
| Trend Charts | ✅ | 3 charts (5-min history) |
| Alert System | ✅ | Toast notifications |
| Range Validation | ✅ | All sensors |
| Debug Logging | ✅ | Sidebar panel |
| API Integration | ✅ | HTTP POST to Express |

---

## 📞 Support

For Node-RED specific issues:
- Check Debug sidebar (Ctrl+Space)
- View logs in terminal
- Check MQTT broker connectivity
- Verify flow deployment

**Status Indicators:**
- 🟢 Connected
- 🔴 Disconnected  
- 🟡 Connecting

---

**Last Updated**: December 22, 2025  
**Node-RED Version**: 3.1.0  
**Dashboard Version**: 3.6.0
