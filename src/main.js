import "./main.scss";
import { getWeatherForecast } from "./JS/api.js";

const app = document.querySelector("#app");

const city = "München";

async function loadWeatherForecast() {
  app.innerHTML = "<p>Lade Wetterdaten...</p>";

  try {
    const data = await getWeatherForecast(city, 3);
    // Icon URL richtig zusammensetzen
    const iconUrl =
      "https:" + data.current.condition.icon.replace("64x64", "128x128");

    document.querySelector("#app").innerHTML = `
      <div class="display-weather">
        <h2 class="display-weather__location">${data.location.name}</h2>
        <h1 class="display-weather__current-temp">${data.current.temp_c} °C</h1>
        <p class="display-weather__condition">${data.current.condition.text}</p>
        <div class="display-weather__details-temperature">
        <p>H${data.forecast.forecastday[0].day.maxtemp_c} °C</p>
        <p>T${data.forecast.forecastday[0].day.mintemp_c} °C</p>
        </div>
    </div>`;
  } catch (err) {
    app.innerHTML = `<p>Fehler: ${err}</p>`;
  }
}

loadWeatherForecast(city, 3);
