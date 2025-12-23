#🏥 Healthcare IoT Monitoring System

## 🌟 Advanced Visual Dashboard Interface

A comprehensive real-time healthcare IoT monitoring system with stunning visual interfaces and advanced data visualization capabilities.

---

## 📱 Available Dashboards

### 1. 🏥 **Patient Monitoring Dashboard** (`/index.html`)
**Main Features:**
- Real-time vital signs monitoring (Heart Rate, Temperature, SpO2, Blood Pressure)
- Interactive trend charts with historical data
- Animated status badges with color-coded alerts
- Smart notification system with sliding animations
- Multi-metric comparison charts
- Responsive card-based layout
- Live data updates every 3 seconds

**Visual Elements:**
- ❤️ Heart Rate Monitor with trend indicators
- 🌡️ Temperature Tracker
- 💧 Blood Oxygen (SpO2) Display
- 💉 Blood Pressure Monitor
- 📊 Dynamic Line Charts
- 🔔 Real-time Alert Notifications

---

### 2. 🌐 **Network Management System** (`/network.html`)
**Main Features:**
- Network topology visualization using D3.js
- Real-time device monitoring
- Bandwidth usage tracking
- Latency distribution analysis
- Active alerts management
- Interactive network graph with drag-and-drop nodes

**Visual Elements:**
- 🗺️ Interactive Network Topology Map
- 📊 Bandwidth Usage Bar Charts
- ⚡ Latency Distribution Doughnut Chart
- 💻 Connected Devices Table
- 🚨 Active Alerts Feed
- 📈 Real-time Metrics Dashboard

**Network Metrics:**
- Total Devices Count
- Online/Offline Status
- Total Bandwidth (kbps)
- Average Latency (ms)
- Packet Loss Percentage
- Device Health Status

---

### 3. 📈 **Advanced Analytics Dashboard** (`/analytics.html`)
**Main Features:**
- Comprehensive system statistics
- Real-time gauge charts for vital signs
- 24-hour trend analysis
- Alert distribution analytics
- Performance metrics visualization
- Weekly activity heatmap
- Device health radar chart
- Historical data comparison
- Live activity feed

**Visual Elements:**
- 🎯 **Real-Time Gauge Charts:**
  - Heart Rate Gauge (0-200 bpm)
  - Temperature Gauge (35-42°C)
  - Blood Oxygen Gauge (0-100%)

- 📊 **Analytics Charts:**
  - 24-Hour Vital Trends (Line Chart)
  - Alert Distribution (Pie Chart)
  - Device Health Radar
  - Historical Comparison (Bar Chart)

- 📅 **Interactive Components:**
  - Weekly Activity Heatmap
  - Performance Progress Bars
  - Live Activity Feed
  - Statistical Summary Cards

**Key Statistics:**
- Total Readings Count
- System Uptime Percentage
- Daily Alerts Count
- Average Response Time
- Data Processing Speed
- Network Latency
- Database Load
- CPU Usage

---

### 4. 🌌 **3D Data Visualization** (`/visualization.html`)
**Main Features:**
- Immersive 3D particle background using Three.js
- Animated particle network connections
- Real-time waveform charts
- Glassmorphism UI design
- Pulsating metric cards
- Data stream animations
- Futuristic neon aesthetic

**Visual Elements:**
- ⭐ **3D Background Animation:**
  - 1000+ animated particles
  - Dynamic rotation effects
  - Gradient color schemes

- 💫 **Interactive Metric Cards:**
  - Heart Rate with streaming data
  - Temperature with min/max values
  - Blood Oxygen saturation trends
  - Blood Pressure systolic/diastolic

- 🌊 **Real-Time Waveforms:**
  - ECG-style heart rate display
  - SpO2 saturation waves
  - Smooth animation transitions

- 🔗 **Particle Network:**
  - 100 interconnected particles
  - Dynamic connection lines
  - Color-coded nodes (#00f5ff, #ff00ff)
  - Distance-based opacity

**Status Indicators:**
- 🟢 OPTIMAL (Green)
- 🟡 WARNING (Yellow)
- 🔴 CRITICAL (Red)

---

## 🎨 Design Features

### Visual Themes:
1. **Patient Dashboard**: Purple gradient with animated background grid
2. **Network Monitor**: Dark blue gradient with glassmorphism
3. **Analytics**: Navy blue with neon accents
4. **3D Visualization**: Black with cyan/magenta neon theme

### UI/UX Enhancements:
- ✨ Smooth animations and transitions
- 🎭 Backdrop blur effects (glassmorphism)
- 🌈 Gradient color schemes
- 💫 Particle animations
- 📱 Fully responsive design
- 🖱️ Hover effects and interactions
- 🔄 Auto-refresh data updates
- 📊 Multiple chart types (Line, Bar, Pie, Doughnut, Radar, Gauge)

---

## 🚀 Technology Stack

**Frontend:**
- HTML5 / CSS3
- JavaScript (ES6+)
- Chart.js 3.9.1 - 2D Charts
- D3.js v7 - Network Topology
- Three.js r128 - 3D Graphics
- Socket.io - Real-time Communication

**Backend:**
- Node.js
- Express.js
- Socket.io Server
- MongoDB (Data Storage)
- MQTT (IoT Communication)

---

## 📦 Installation & Setup

### Prerequisites:
```bash
Node.js (v14+)
MongoDB (running on localhost:27017)
```

### Installation:
```bash
# Install server dependencies
cd server
npm install

# Install simulator dependencies
cd ../simulator
npm install
```

### Running the Application:

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Server:**
```bash
cd server
node server.js
```
Server will run on: `http://localhost:3000`

**Terminal 3 - Start Sensor Simulator:**
```bash
cd simulator
node sensor_simulator.js
```

---

## 🌐 Access Points

| Dashboard | URL | Description |
|-----------|-----|-------------|
| 🏥 Patient Monitor | `http://localhost:3000/` | Main patient vitals dashboard |
| 🌐 Network Monitor | `http://localhost:3000/network.html` | Network management interface |
| 📈 Analytics | `http://localhost:3000/analytics.html` | Advanced analytics dashboard |
| 🌌 3D Visualization | `http://localhost:3000/visualization.html` | Immersive 3D data view |

---

## 📊 Data Flow

```
IoT Sensors → MQTT Broker → Node.js Server → MongoDB
                                ↓
                          Socket.io Server
                                ↓
                        Web Dashboard (Real-time Updates)
```

---

## 🔔 Alert System

**Alert Thresholds:**
- **Heart Rate:**
  - Critical: < 60 or > 120 bpm
  - Warning: 60-70 or 100-120 bpm
  - Normal: 70-100 bpm

- **Temperature:**
  - Critical: < 36°C or > 38°C
  - Warning: 36-36.5°C or 37.5-38°C
  - Normal: 36.5-37.5°C

- **Blood Oxygen (SpO2):**
  - Critical: < 90%
  - Warning: 90-95%
  - Normal: > 95%

- **Blood Pressure:**
  - Critical: Systolic < 80 or > 160 mmHg
  - Warning: Systolic < 90 or > 140 mmHg
  - Normal: 90-140 mmHg

---

## 📈 Chart Types Used

1. **Line Charts** - Vital signs trends over time
2. **Bar Charts** - Bandwidth usage, historical comparisons
3. **Pie Charts** - Alert distribution
4. **Doughnut Charts** - Latency distribution, gauge displays
5. **Radar Charts** - Device health metrics
6. **Gauge Charts** - Real-time vital signs
7. **Area Charts** - Filled trend visualizations
8. **Heatmaps** - Weekly activity patterns

---

## 🎯 Key Features Summary

✅ Real-time data monitoring with < 3s latency
✅ Interactive and responsive UI design
✅ Multiple visualization dashboards
✅ 3D graphics and particle animations
✅ Network topology mapping
✅ Smart alert notification system
✅ Historical data analysis
✅ Performance metrics tracking
✅ Device health monitoring
✅ Activity feed and logging
✅ Glassmorphism and modern UI trends
✅ Cross-browser compatible
✅ Mobile-responsive design

---

## 🔧 Configuration

### Server Configuration (`server/server.js`):
- Port: 3000
- MongoDB: localhost:27017/healthcare
- MQTT Broker: mqtt://localhost:1883

### Data Update Intervals:
- Patient Vitals: 3 seconds
- Network Metrics: 10 seconds
- Charts Refresh: Real-time
- Gauges Update: 3 seconds

---

## 📝 API Endpoints

**Network Management APIs:**
```javascript
GET  /api/network/metrics      // Get network statistics
GET  /api/network/devices       // Get all devices
GET  /api/network/topology      // Get network topology
GET  /api/network/alerts        // Get active alerts
POST /api/network/alerts/:id/resolve  // Resolve alert
```

---

## 🎨 Color Palette

**Primary Colors:**
- Cyan: `#00f5ff` / `rgb(0, 245, 255)`
- Magenta: `#ff00ff` / `rgb(255, 0, 255)`
- Purple: `#667eea` / `rgb(102, 126, 234)`
- Red: `#e74c3c` / `rgb(231, 76, 60)`
- Green: `#2ecc71` / `rgb(46, 204, 113)`
- Orange: `#f39c12` / `rgb(243, 156, 18)`

**Status Colors:**
- Success: `#2ecc71`
- Warning: `#f39c12`
- Danger: `#e74c3c`
- Info: `#3498db`

---

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (Limited support)

---

## 🔒 Security Considerations

- HTTPS recommended for production
- Implement authentication/authorization
- Secure WebSocket connections
- Input validation on all endpoints
- Rate limiting for API calls
- Data encryption at rest and in transit

---

## 🚀 Performance Optimization

- Lazy loading for chart libraries
- Debounced data updates
- Efficient DOM manipulation
- Optimized particle rendering
- Canvas-based animations
- Compressed assets
- CDN for external libraries

---

## 📚 Libraries & Dependencies

**Frontend:**
```json
{
  "Chart.js": "3.9.1",
  "D3.js": "7.0.0",
  "Three.js": "r128",
  "Socket.io-client": "latest"
}
```

**Backend:**
```json
{
  "express": "^4.18.0",
  "socket.io": "^4.5.0",
  "mqtt": "^4.3.0",
  "mongoose": "^6.8.0"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer

Created with ❤️ for Healthcare IoT Innovation

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check documentation
- Review example code

---

## 🔮 Future Enhancements

- [ ] Machine Learning predictions
- [ ] Voice alerts and commands
- [ ] Mobile app integration
- [ ] Multi-patient support
- [ ] Export to PDF/Excel
- [ ] Email/SMS notifications
- [ ] Historical data export
- [ ] Custom alert rules
- [ ] Role-based access control
- [ ] Integration with EHR systems

---

**Last Updated:** December 22, 2025

**Version:** 2.0.0

---

 
 

