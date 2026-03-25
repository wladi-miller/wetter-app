import { formatTemperature } from "../utils.js";

export function getDetailViewHtml(weatherData) {
  const { location, current, forecast } = weatherData;
  const baseUrl = import.meta.env.BASE_URL;

  return `
    <div class="action-bar">
      <button class="action-bar__btn" data-action="back" aria-label="Zurück">
        <img src="${baseUrl}back.svg" alt="Zurück" />
      </button>
      <button class="action-bar__btn" data-action="favorite" aria-label="Favorit hinzufügen">
        <img src="${baseUrl}favorite.svg" alt="Favorit" />
      </button>
    </div>

    <div class="display-weather">
      <h2 class="display-weather__location">${location.name}</h2>
      <h1 class="display-weather__current-temp">${formatTemperature(current.temp_c)}°</h1>
      <p class="display-weather__condition">${current.condition.text}</p>
      <div class="display-weather__details-temperature">
        <span>H:${formatTemperature(forecast.forecastday[0].day.maxtemp_c)}</span>
        <span>T:${formatTemperature(forecast.forecastday[0].day.mintemp_c)}</span>
      </div>
    </div>`;
}
