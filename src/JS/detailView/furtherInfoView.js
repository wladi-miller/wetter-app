import { formatTime24 } from "../utils.js";

export function getFurtherInfoViewHtml(weatherData) {
  const { current, forecast } = weatherData;
  return `
    <div class="further-infos">
        <div class="further-info">
            <div class="further-info__title">Feuchtigkeit</div>
            <div class="further-info__value">${current.humidity}%</div>
        </div>
        <div class="further-info">
            <div class="further-info__title">Gefühlt</div>
            <div class="further-info__value">${current.feelslike_c}°C</div>
        </div>
        <div class="further-info">
            <div class="further-info__title">Sonnenaufgang</div>
            <div class="further-info__value">${formatTime24(forecast.forecastday[0].astro.sunrise)}</div>
        </div>
        <div class="further-info">
            <div class="further-info__title">Sonnenuntergang</div>
            <div class="further-info__value">${formatTime24(forecast.forecastday[0].astro.sunset)}</div>
        </div>
        <div class="further-info">
            <div class="further-info__title">Niederschlag</div>
            <div class="further-info__value">${current.precip_mm} mm</div>
        </div>
        <div class="further-info">
            <div class="further-info__title">UV-Index</div>
            <div class="further-info__value">${current.uv}</div>
        </div>
    </div>`;
}
