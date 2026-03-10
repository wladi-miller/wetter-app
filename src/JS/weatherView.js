import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { showLoading } from "./loading.js";
import { getDetailViewHtml } from "./detailView.js";
import { getForecast24hViewHtml } from "./forecast24hView.js";
import { getForecast3dViewHtml } from "./forecast3dView.js";

export async function loadWeatherView(city) {
  showLoading(city);

  const weatherData = await getWeatherForecast(city);

  if (!weatherData) {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
    return;
  }

  rootApp.innerHTML = `${getDetailViewHtml(weatherData)}
                       ${getForecast24hViewHtml(weatherData)}
                       ${getForecast3dViewHtml(weatherData)}`;
}
