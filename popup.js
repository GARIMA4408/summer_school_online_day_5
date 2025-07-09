const apiKey = "9cf447bed3864f0087d82518250907"; 

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("getWeather");
  const resultDiv = document.getElementById("weatherResult");

  button.addEventListener("click", function () {
    if (!navigator.geolocation) {
      resultDiv.textContent = "Geolocation is not supported by your browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const city = data.location.name;
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;

            resultDiv.innerHTML = `<strong>${city}</strong><br>${temp}°C<br>${condition}`;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            resultDiv.textContent = "Failed to fetch weather data.";
          });
      },
      function error() {
        resultDiv.textContent = "Unable to retrieve your location.";
      }
    );
  });
});
