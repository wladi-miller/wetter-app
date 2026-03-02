import "../main.scss";
import "../styles/detailView.scss";
import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { formatTemperature } from "./utils.js";

export async function loadDetailView(city) {
  loadSpinner(city);
  const weatherData = await getWeatherForecast(city);
  if (weatherData) {
    renderDetailView(weatherData);
  } else {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
  }
}

function loadSpinner(city) {
  rootApp.innerHTML = `
    <div class="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <p>Lädt Wetterdaten für ${city}...</p>
    </div>`;
}

function renderDetailView(weatherData) {
  const { location, current, forecast } = weatherData;

  rootApp.innerHTML = gethHaderHtmL(
    location.name,
    formatTemperature(current.temp_c),
    current.condition.text,
    formatTemperature(forecast.forecastday[0].day.maxtemp_c),
    formatTemperature(forecast.forecastday[0].day.mintemp_c),
  );
}

function gethHaderHtmL(location, currentTemp, condition, maxTemp, minTemp) {
  return `
    <div class="display-weather">
      <h2 class="display-weather__location">${location}</h2>
      <h1 class="display-weather__current-temp">${currentTemp}</h1>
      <p class="display-weather__condition">${condition}</p>
      <div class="display-weather__details-temperature">
        <span>H:${maxTemp}</span>
        <span>T:${minTemp}</span>
      </div>
    </div>`;
}
