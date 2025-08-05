// ✅ Update Local Time
function updateTime() {
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = now.toLocaleTimeString([], options);
  document.getElementById("time").textContent = `Local Time: ${formattedTime}`;
}

setInterval(updateTime, 1000);
updateTime();

// ✅ Fetch Weather
function fetchWeather(lat, lon) {
  const apiKey = "68106bb579f4b3d40a947d50f2d163f5";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.main || !data.weather) {
        throw new Error("Missing data in response");
      }

      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].main;
      document.getElementById(
        "weather"
      ).textContent = `${condition}, ${temp}°C`;
    })
    .catch((error) => {
      console.error("Weather fetch error:", error.message);
      document.getElementById("weather").textContent =
        "Weather data unavailable.";
    });
}

// ✅ Get User Location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(lat, lon);
    },
    (error) => {
      console.error("Geolocation error:", error.message);
      document.getElementById("weather").textContent =
        "Location permission denied.";
    }
  );
} else {
  document.getElementById("weather").textContent = "Geolocation not supported.";
}
