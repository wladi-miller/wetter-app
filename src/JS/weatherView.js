import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { showLoading } from "./loading.js";
import { getDetailViewHtml } from "./JS_Weather_View/detailView.js";
import { getForecast24hViewHtml } from "./JS_Weather_View/forecast24hView.js";
import { getForecast3dViewHtml } from "./JS_Weather_View/forecast3dView.js";
import { getFurtherInfoViewHtml } from "./JS_Weather_View/furtherInfoView.js";

export async function loadWeatherView(city) {
  showLoading(city);

  const weatherData = await getWeatherForecast(city);

  if (!weatherData) {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
    return;
  }

  rootApp.innerHTML = `${getDetailViewHtml(weatherData)}
                       ${getForecast24hViewHtml(weatherData)}
                       ${getForecast3dViewHtml(weatherData)}
                       ${getFurtherInfoViewHtml(weatherData)}`;
}
