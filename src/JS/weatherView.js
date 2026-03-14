import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { showLoading } from "./loading.js";
import { getConditionImagePath } from "./detailView/conditions.js";
import { getDetailViewHtml } from "./detailView/headerView.js";
import { getForecast24hViewHtml } from "./detailView/forecast24hView.js";
import { getForecast3dViewHtml } from "./detailView/forecast3dView.js";
import { getFurtherInfoViewHtml } from "./detailView/furtherInfoView.js";

export async function loadWeatherView(city) {
  showLoading(city);

  const weatherData = await getWeatherForecast(city);

  if (!weatherData) {
    rootApp.innerHTML = `<p>Fehler: Keine Wetterdaten verfügbar</p>`;
    return;
  }
  const code = weatherData.current.condition.code;
  const isNight = weatherData.current.is_day !== 1;

  const image = getConditionImagePath(code, isNight);

  if (image) {
    rootApp.style = `--detail-condition-image: url(${image})`;
    rootApp.classList.add("background-weather");
  }
  rootApp.innerHTML = `${getDetailViewHtml(weatherData)}
                       ${getForecast24hViewHtml(weatherData)}
                       ${getForecast3dViewHtml(weatherData)}
                       ${getFurtherInfoViewHtml(weatherData)}`;
}
