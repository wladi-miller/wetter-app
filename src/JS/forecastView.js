import { getHoursforecast, formatTemperature } from "./utils.js";

export function getForecastViewHtml(weatherData) {
  const { location, forecast } = weatherData;

  const now = new Date(location.localtime);
  const currentHour = now.getHours();
  const currentHourData = forecast.forecastday[0].hour[currentHour];

  const nextHours = getHoursforecast(weatherData);

  return `
    <div class="forecast-day">
      <div class="forecast-day__forecastday">
        Aktuell ${currentHourData.condition.text}.
        Wind ${currentHourData.wind_kph} km/h.
      </div>

      <div class="forecast-day__hours">
        ${nextHours
          .map(
            (hourData) => `
              <div class="forecast-day__hour">
                <div class="forecast-day__time"> ${
                  new Date(hourData.time).getHours() === currentHour
                    ? "Jetzt"
                    : hourData.time.slice(-5)
                }</div>
                <div class="forecast-day__icon">
                  <img src="${hourData.condition.icon}" alt="${hourData.condition.text}">
                </div>
                <div class="forecast-day__temp">${formatTemperature(hourData.temp_c)}°C</div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>`;
}
