import { dayLabel, formatTemperature } from "./utils.js";

export function getForecast3dViewHtml(weatherData) {
  const { location, forecast } = weatherData;
  return `
    <div class="forecast">
    <div class="forecast__header">
        Vorhersage für die nächsten 3 Tage:
    </div>
    <div class="forecast__days">
        ${forecast.forecastday
          .map(
            (day) => `
            <div class="forecast-day">
            <div class="forecast-day__day">
                ${dayLabel(day.date, location.localtime)}</div>
                <div class="forecast-day__icon">
                    <img class="forecast-day__icon" src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                </div>
                <div class="forecast-day__temp">
                    <span>H:${formatTemperature(day.day.maxtemp_c)}°C</span>
                    <span>T:${formatTemperature(day.day.mintemp_c)}°C</span>
                </div>
                <div class="forecast-day__wind">
                    <span>Wind: ${day.day.maxwind_kph} km/h</span>
                </div>
            </div>
        `,
          )
          .join("")}
    </div>`;
}
