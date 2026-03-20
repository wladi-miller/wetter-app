import { getWeatherForecast } from "./api.js";
import { rootApp } from "../main.js";
import { showLoading } from "./loading.js";
import { getConditionImagePath } from "./detailView/conditions.js";
import { getDetailViewHtml } from "./detailView/headerView.js";
import { getForecast24hViewHtml } from "./detailView/forecast24hView.js";
import { getForecast3dViewHtml } from "./detailView/forecast3dView.js";
import { getFurtherInfoViewHtml } from "./detailView/furtherInfoView.js";
import { addFavoriteCity, getFavoriteCities } from "./utils.js";

export async function loadWeatherView(cityQuery) {
  showLoading("Lade Wetter...");

  const weatherData = await getWeatherForecast(cityQuery);

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

  const cityId = cityQuery.startsWith("id:") ? cityQuery.slice(3) : cityQuery;
  registerActionListeners(cityId);
}

function registerActionListeners(cityId) {
  const backButton = rootApp.querySelector('[data-action="back"]');
  const favoriteButton = rootApp.querySelector('[data-action="favorite"]');

  if (favoriteButton) {
    const alreadyFavorite = getFavoriteCities().some(
      (favorite) => favorite === String(cityId),
    );
    favoriteButton.disabled = alreadyFavorite;
  }

  backButton?.addEventListener("click", async () => {
    const { loadMainView } = await import("./mainView.js");
    loadMainView();
  });

  favoriteButton?.addEventListener("click", () => {
    const added = addFavoriteCity(cityId);
    if (added) {
      favoriteButton.disabled = true;
    }
  });
}
