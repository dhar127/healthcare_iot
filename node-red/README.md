# Node-RED Healthcare IoT Flows

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Node-RED
```bash
npm start
```

### 3. Access Interfaces
- **Flow Editor**: http://localhost:1881
- **Dashboard**: http://localhost:1881/ui
- **Login**: admin / admin

## What's Included

### Flows (flows.json)
- Heart Rate monitoring with alerts
- Temperature monitoring with alerts
- SpO2 (Blood Oxygen) monitoring
- Blood Pressure monitoring
- Real-time dashboard with gauges and charts
- MQTT integration
- Alert toast notifications

### Dashboard Features
- **4 Live Gauges**: Heart Rate, Temperature, SpO2, Blood Pressure
- **3 Trend Charts**: 5-minute rolling history
- **Color-coded Alerts**: Critical (Red), Warning (Yellow), Normal (Green)
- **Toast Notifications**: Pop-up alerts for abnormal readings

## System Requirements

- Node.js 14.x or higher
- MQTT Broker running on localhost:1883
- Healthcare IoT sensor simulator running

## Ports Used

- **1880**: Node-RED UI and API
- **1883**: MQTT Broker
- **3000**: Main Express Server

## Flow Structure

```
Sensor → MQTT → Node-RED → Dashboard
                    ↓
                 Alerts
                    ↓
              MongoDB Storage
```

## Customization

Edit flows in the Node-RED editor:
1. Open http://localhost:1881
2. Modify nodes and connections
3. Click "Deploy" to save changes

## Troubleshooting

- **No data on dashboard**: Check MQTT broker and sensor simulator are running
- **Can't login**: Default credentials are admin/admin
- **Port conflict**: Change port in settings.js

For detailed documentation, see [NODE_RED_GUIDE.md](../NODE_RED_GUIDE.md)
