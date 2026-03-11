import { getHoursforecast, formatTemperature } from "./utils.js";

export function getForecast24hViewHtml(weatherData) {
  const { location, forecast } = weatherData;

  const now = new Date(location.localtime);
  const currentHour = now.getHours();
  const currentHourData = forecast.forecastday[0].hour[currentHour];

  const nextHours = getHoursforecast(weatherData);

  return `
    <div class="forecast-24h">
      <div class="forecast-24h__forecastday">
        Aktuell ${currentHourData.condition.text}.
        Wind ${currentHourData.wind_kph} km/h.
      </div>

      <div class="forecast-24h__hours">
        ${nextHours
          .map(
            (hourData) => `
              <div class="forecast-24h__hour">
                <div class="forecast-24h__time"> ${
                  new Date(hourData.time).getHours() === currentHour
                    ? "Jetzt"
                    : hourData.time.slice(-5)
                }</div>
                <div class="forecast-24h__icon">
                  <img src="${hourData.condition.icon}" alt="${hourData.condition.text}">
                </div>
                <div class="forecast-24h__temp">${formatTemperature(hourData.temp_c)}°C</div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>`;
}
