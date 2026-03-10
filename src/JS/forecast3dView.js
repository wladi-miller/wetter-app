import { dayLabel, formatTemperature } from "./utils.js";

export function getForecast3dViewHtml(weatherData) {
  const { location, forecast } = weatherData;
  return `
    <div class="forecast-3d">
        ${forecast.forecastday
          .map(
            (day) => `
            <div class="forecast-3d__day">
                <h3 class="forecast-3d__day-label">${dayLabel(day.date, location.localtime)}</h3>
                <div class="forecast-3d__icon">
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                </div>
                <div class="forecast-3d__temp">
                    <span>H:${formatTemperature(day.day.maxtemp_c)}°C</span>
                    <span>T:${formatTemperature(day.day.mintemp_c)}°C</span>
                </div>
            </div>
        `,
          )
          .join("")}
    </div>`;
}
