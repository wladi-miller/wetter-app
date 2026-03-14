import { dayLabel, formatTemperature } from "../utils.js";

function getForecastDayHtml(day, localtime) {
  return `
    <div class="forecast-day">
      <div class="forecast-day__day">
        ${dayLabel(day.date, localtime)}
      </div>

      <div class="forecast-day__icon-wrapper">
        <img
          class="forecast-day__icon"
          src="${day.day.condition.icon}"
          alt="${day.day.condition.text}"
        >
      </div>

      <div class="forecast-day__temp">
        <span>H:${formatTemperature(day.day.maxtemp_c)}°C</span>
        <span>T:${formatTemperature(day.day.mintemp_c)}°C</span>
      </div>

      <div class="forecast-day__wind">
        <span>Wind: ${day.day.maxwind_kph} km/h</span>
      </div>
    </div>
  `;
}

export function getForecast3dViewHtml(weatherData) {
  const { location, forecast } = weatherData;

  return `
    <div class="forecast">
      <div class="forecast__header">
        Vorhersage für die nächsten 3 Tage:
      </div>

      <div class="forecast__days">
        ${forecast.forecastday
          .map((day) => getForecastDayHtml(day, location.localtime))
          .join("")}
      </div>
    </div>
  `;
}
