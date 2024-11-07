(async () => {
  const airurl = "https://api.thingspeak.com/channels/2731561/feeds.json?results=1";
  const response = await fetch(airurl);
  const data = await response.json();
  const temperature = parseFloat(data.feeds[0].field1);
  const humidity = parseFloat(data.feeds[0].field2);

  // Check if temperature and humidity are valid
  document.getElementById("temperature").innerText = !isNaN(temperature) ? `${temperature}°C` : "No data";
  document.getElementById("humidity").innerText = !isNaN(humidity) ? `${humidity}%` : "No data";

  const bottomElement = document.querySelector(".bottom");

  // Conditional alerts for high temperature and humidity
  if (temperature > 30) {
      const tempAlert = document.createElement("div");
      tempAlert.innerText = "High temperature alert! Consider cooling measures.";
      bottomElement.appendChild(tempAlert);
  }
  if (humidity > 70) {
      const humidAlert = document.createElement("div");
      humidAlert.innerText = "High humidity alert! Consider dehumidification measures.";
      bottomElement.appendChild(humidAlert);
  }
})();
