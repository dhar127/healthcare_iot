# 🚀 Quick Start Guide - Healthcare IoT System

## ⚡ Get Started in 3 Steps!

### Step 1: Install Dependencies
```bash
# Navigate to server folder
cd server
npm install

# Navigate to simulator folder
cd ../simulator
npm install
```

### Step 2: Start MongoDB
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

### Step 3: Launch Application
```bash
# Terminal 1 - Start the server
cd server
node server.js

# Terminal 2 - Start the sensor simulator
cd simulator
node sensor_simulator.js
```

## 🌐 Access the Dashboards

Open your browser and visit:

1. **Main Dashboard**: http://localhost:3000/
2. **Network Monitor**: http://localhost:3000/network.html
3. **Analytics**: http://localhost:3000/analytics.html
4. **3D Visualization**: http://localhost:3000/visualization.html

---

## 📱 What You'll See

### 🏥 Main Dashboard
- Real-time heart rate, temperature, SpO2, and blood pressure
- Live trend charts updating every 3 seconds
- Animated alert notifications
- Color-coded status indicators

### 🌐 Network Monitor
- Interactive network topology map
- Device connection status
- Bandwidth and latency metrics
- Alert management system

### 📈 Analytics Dashboard
- Comprehensive statistics cards
- Real-time gauge charts
- 24-hour trend analysis
- Weekly activity heatmap
- Performance metrics
- Live activity feed

### 🌌 3D Visualization
- Stunning 3D particle background
- Animated metric cards with glassmorphism
- Real-time waveform displays
- Particle network connections
- Futuristic neon design

---

## 🎨 Features Overview

✨ **4 Beautiful Dashboards** with different themes
📊 **8+ Chart Types** for data visualization
🎯 **Real-Time Updates** via WebSocket
🔔 **Smart Alerts** with thresholds
📱 **Fully Responsive** design
🌈 **Modern UI** with animations
⚡ **High Performance** rendering
🔄 **Auto-Refresh** data streams

---

## 🛠️ Troubleshooting

**Problem:** Can't connect to server
- **Solution:** Make sure server is running on port 3000
- Check: `http://localhost:3000` in browser

**Problem:** No data showing
- **Solution:** Start the sensor simulator
- Run: `node sensor_simulator.js` in simulator folder

**Problem:** MongoDB connection error
- **Solution:** Ensure MongoDB is running
- Check: MongoDB service status

---

## 📝 Quick Tips

1. **Best Browser**: Use Chrome or Firefox for optimal performance
2. **Screen Size**: Works on desktop, tablet, and mobile
3. **Data Updates**: Wait 3-5 seconds for first data to appear
4. **Navigation**: Use the top menu to switch between dashboards
5. **Alerts**: Critical alerts will show red notifications

---

## 🎯 Key Metrics Explained

| Metric | Normal Range | Warning | Critical |
|--------|-------------|---------|----------|
| Heart Rate | 70-100 bpm | 60-70, 100-120 | <60, >120 |
| Temperature | 36.5-37.5°C | 36-36.5, 37.5-38 | <36, >38 |
| SpO2 | >95% | 90-95% | <90% |
| Blood Pressure | 90-140 mmHg | 80-90, 140-160 | <80, >160 |

---

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Review NETWORK_MANAGEMENT.md for network features
- Inspect browser console for error messages

---

## 🎉 Enjoy Your Healthcare IoT Dashboard!

Your system is now ready to monitor patient vitals in real-time with stunning visualizations! 🏥✨
