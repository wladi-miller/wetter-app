import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { formatTemperature } from "./utils.js";
import { showLoading } from "./loading.js";

export async function loadDetailView(city) {
  showLoading(city);

  const weatherData = await getWeatherForecast(city);
  if (weatherData) {
    renderDetailView(weatherData);
  } else {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
  }
}

function renderDetailView(weatherData) {
  const { location, current, forecast } = weatherData;

  rootApp.innerHTML = gethHeaderHtmL(
    location.name,
    formatTemperature(current.temp_c),
    current.condition.text,
    formatTemperature(forecast.forecastday[0].day.maxtemp_c),
    formatTemperature(forecast.forecastday[0].day.mintemp_c),
  );
}

function gethHeaderHtmL(location, currentTemp, condition, maxTemp, minTemp) {
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
