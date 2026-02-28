import "../main.scss";
import "../styles/detailView.scss";
import { getWeatherCurrent } from "./api.js";
import { rootApp } from "../main.js";

export async function loadDetailView(city) {
  const weatherData = await getWeatherCurrent(city);
  if (weatherData) {
    renderDetailView(weatherData);
  } else {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
  }
}

function renderDetailView(weatherData) {
  rootApp.innerHTML = gethHaderHtmL(weatherData);
}

function gethHaderHtmL(weatherData) {
  return `
    <div class="display-weather">
      <h2 class="display-weather__location">${weatherData.location.name}</h2>
      <h1 class="display-weather__current-temp">${weatherData.current.temp_c} °C</h1>
      <p class="display-weather__condition">${weatherData.current.condition.text}</p>
      <div class="display-weather__details-temperature">
        <span>H:${weatherData.forecast.forecastday[0].day.maxtemp_c} °C</span>
        <span>T:${weatherData.forecast.forecastday[0].day.mintemp_c} °C</span>
      </div>
    </div>`;
}
