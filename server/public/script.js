const socket = io();

socket.on('vitals', (data) => {
  document.getElementById('hr').innerText =
    data.heartRate + " bpm";

  document.getElementById('temp').innerText =
    data.temperature + " °C";

  if (data.heartRate > 100 || data.temperature > 37.5) {
    document.getElementById('warning').innerText =
      "⚠ ALERT: Abnormal Vital Signs Detected!";
  } else {
    document.getElementById('warning').innerText = "";
  }
});
