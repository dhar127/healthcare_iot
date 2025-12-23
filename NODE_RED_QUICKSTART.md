# 🎯 Node-RED Quick Start - Healthcare IoT

## ✅ Node-RED is Running!

**Current Status**: Node-RED is LIVE and connected to MQTT broker

### 🌐 Access Your Dashboards

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| **Node-RED Flow Editor** | http://localhost:1881 | Create/edit visual flows |
| **Node-RED Dashboard** | http://localhost:1881/ui | View live health data |
| **Main Patient Monitor** | http://localhost:3000 | Interactive patient dashboard |
| **Analytics Dashboard** | http://localhost:3000/analytics.html | Advanced analytics |
| **3D Visualization** | http://localhost:3000/visualization.html | 3D particle view |
| **Network Monitor** | http://localhost:3000/network.html | Network topology |

### 🔑 Login Credentials
- **Username**: `admin`
- **Password**: `admin`

---

## 🚀 What's Running

```
✅ Node-RED Server (Port 1881)
✅ MQTT Broker Connected
✅ Dashboard Active (/ui)
✅ 4 Vital Signs Monitored:
   - Heart Rate
   - Temperature
   - SpO2 (Blood Oxygen)
   - Blood Pressure
```

---

## 📊 Node-RED Features

### Visual Flows
- Heart Rate monitoring with critical/warning alerts
- Temperature range checking
- SpO2 low oxygen detection
- Blood Pressure validation
- Real-time data processing
- MQTT message routing
- Alert toast notifications

### Live Dashboard Components
1. **4 Gauges**: Real-time vital signs with color-coded ranges
2. **3 Trend Charts**: 5-minute rolling history
3. **Toast Alerts**: Pop-up notifications for abnormal readings
4. **Status Indicators**: Green (Normal), Yellow (Warning), Red (Critical)

---

## 🎨 Dashboard Preview

```
┌─────────────────────────────────────────┐
│     HEALTHCARE IOT MONITOR              │
├─────────────────────────────────────────┤
│  VITAL SIGNS                            │
│  ┌──────────┐  ┌──────────┐            │
│  │   HEART  │  │   TEMP   │            │
│  │   RATE   │  │  37.2°C  │            │
│  │  75 bpm  │  │          │            │
│  │    🟢    │  │    🟢    │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │   SPO2   │  │    BP    │            │
│  │    98%   │  │  120/80  │            │
│  │    🟢    │  │   mmHg   │            │
│  └──────────┘  └──────────┘            │
├─────────────────────────────────────────┤
│  TRENDS (5-MINUTE HISTORY)              │
│  Heart Rate ────────────────────────────│
│  Temperature ───────────────────────────│
│  SpO2 ──────────────────────────────────│
└─────────────────────────────────────────┘
```

---

## 🔧 Complete System Ports

| Service | Port | Status |
|---------|------|--------|
| Node-RED | 1881 | ✅ Running |
| Express Server | 3000 | ✅ Running |
| MQTT Broker | 1883 | ✅ Connected |
| MongoDB | 27017 | ✅ Ready |

---

## 📝 Next Steps

### 1. View Flow Editor
```
Open: http://localhost:1881
Login with: admin / admin
```

### 2. View Live Dashboard
```
Open: http://localhost:1881/ui
No login required - instant access!
```

### 3. Explore the Flows
- See how MQTT messages are processed
- Watch data flow through nodes in real-time
- View debug messages in the sidebar
- Modify alert thresholds in function nodes

### 4. Customize Alerts
Edit function nodes to change thresholds:
- Heart Rate: Currently 60-100 bpm
- Temperature: Currently 36.5-37.5°C
- SpO2: Currently >95%
- Blood Pressure: Currently 90-140 / 60-90 mmHg

---

## 🎓 Node-RED Basics

### Key Concepts

**Nodes**: Building blocks that process data
- 🔵 MQTT In: Receives sensor data
- 🟡 Function: Custom JavaScript logic
- 🟢 Debug: Shows messages
- 🟣 Dashboard: UI components

**Wires**: Connect nodes to create data flow

**Deploy**: Saves and activates your changes

### Common Operations

1. **Add Node**: Drag from left palette to canvas
2. **Connect Nodes**: Drag from output dot to input dot
3. **Edit Node**: Double-click to open properties
4. **Deploy Changes**: Click red "Deploy" button top-right
5. **View Output**: Open Debug sidebar (bug icon)

---

## 🛠️ Testing Your Setup

### Check Data Flow
1. Open Node-RED: http://localhost:1881
2. Click **Debug** tab (bug icon on right)
3. Watch messages appear in real-time
4. Look for:
   - ✅ Heart Rate updates
   - ✅ Temperature readings
   - ✅ SpO2 values
   - ✅ Blood Pressure data

### View Dashboard
1. Open: http://localhost:1881/ui
2. Watch gauges update every 3 seconds
3. See charts build over time
4. Alerts appear when values are abnormal

---

## 🎯 Alert System

### Current Thresholds

| Vital Sign | Normal Range | Alert Level |
|------------|--------------|-------------|
| Heart Rate | 60-100 bpm | Critical if <60 or >100 |
| Temperature | 36.5-37.5°C | Warning if outside range |
| SpO2 | ≥95% | Critical if <95% |
| BP Systolic | 90-140 mmHg | Warning if outside range |
| BP Diastolic | 60-90 mmHg | Warning if outside range |

### Alert Colors
- 🔴 **Red**: Critical - Immediate attention needed
- 🟡 **Yellow**: Warning - Monitor closely
- 🟢 **Green**: Normal - All good

---

## 📱 Mobile Access

Access Node-RED dashboard from your phone:
1. Find your computer's IP: `ipconfig` in PowerShell
2. Look for "IPv4 Address" (e.g., 192.168.1.100)
3. On mobile browser: `http://YOUR_IP:1881/ui`

---

## 🔍 Troubleshooting

### Dashboard Shows "No Data"
- ✅ Check sensor simulator is running
- ✅ Wait 5-10 seconds for data
- ✅ Refresh browser page

### MQTT Not Connected
- Red indicator on MQTT nodes
- Check MQTT broker is running
- Verify port 1883 is not blocked

### Flows Not Updating
- Click "Deploy" button after changes
- Check for error messages
- View Debug sidebar for issues

---

## 📚 Learning Resources

- **Node-RED Docs**: https://nodered.org/docs/
- **Dashboard Guide**: https://flows.nodered.org/node/node-red-dashboard
- **MQTT Tutorial**: https://nodered.org/docs/getting-started/mqtt
- **Function Node**: https://nodered.org/docs/user-guide/writing-functions

---

## 🎉 Success Checklist

- ✅ Node-RED installed
- ✅ Server running on port 1881
- ✅ MQTT broker connected
- ✅ Dashboard accessible at /ui
- ✅ Flows loaded from flows.json
- ✅ 4 vital signs monitored
- ✅ Real-time gauges working
- ✅ Trend charts displaying
- ✅ Alert system active
- ✅ Debug logging enabled

---

## 💡 Pro Tips

1. **Keyboard Shortcuts**:
   - `Ctrl+Space`: Toggle debug sidebar
   - `Ctrl+F`: Find nodes
   - `Ctrl+A`: Select all nodes

2. **Best Practices**:
   - Always Deploy after changes
   - Use Debug nodes while developing
   - Name your nodes descriptively
   - Add comments to complex flows

3. **Performance**:
   - Dashboard updates every 3 seconds
   - Charts keep 5 minutes of history
   - Debug sidebar auto-limits messages

---

**🎊 Node-RED is ready! Start exploring your visual IoT dashboard!**

**Need help?** Check [NODE_RED_GUIDE.md](NODE_RED_GUIDE.md) for detailed documentation.
