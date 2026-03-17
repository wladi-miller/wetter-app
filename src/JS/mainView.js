import { rootApp } from "../main.js";
import { loadWeatherView } from "./weatherView.js";
import { showLoading } from "./loading.js";
import { getWeatherForecast } from "./api.js";
import { getConditionImagePath } from "./detailView/conditions.js";

export async function loadMainView() {
  rootApp.classList.remove("background-weather");
  showLoading("Lade Übersicht...");
  await renderMainView();
}

async function renderMainView() {
  rootApp.innerHTML = `
  <div class="main-menu">
    ${getHeaderHTML()}
    ${await getCityListHTML()}
  </div>`;
  registerEventListeners();
}

function getHeaderHTML() {
  return `        
  <div class="main-menu__heading">
          Wetter <button class="main-menu__edit">Bearbeiten</button>
        </div>
        <div class="main-menu__search-bar">
          <input
            type="text"
            class="main-menu__search-input"
            placeholder="Nach Stadt suchen..."
          />
    </div>`;
}

async function getCityListHTML() {
  const favoriteCities = ["Dingolfing", "Moskau", "Peking"];

  const favoriteCitiesElements = [];

  for (let city of favoriteCities) {
    const weatherData = await getWeatherForecast(city, 1);

    const { location, current, forecast } = weatherData;
    const currentDay = forecast.forecastday[0];

    const image = getConditionImagePath(
      current.condition.code,
      current.is_day !== 1,
    );

    const cityHTML = `
      <div class="city-wrapper">
            <div
                class="city"
                data-city-name="${city}"
                style="
                --condition-image: url(${image});
                "
            >
                <div class="city__left-column">
                    <h2 class="city__name">${location.name}</h2>
                    <div class="city__country">${location.country}</div>
                    <div class="city__condition">${current.condition.text}</div>
                </div>
                <div class="city__right-column">
                    <div class="city__temperature">${current.temp_c}</div>
                    <div class="city__min-max-temperature">H:${currentDay.day.maxtemp_c} T:${currentDay.day.mintemp_c}</div>
                </div>
            </div>
        </div>
    `;
    favoriteCitiesElements.push(cityHTML);
  }

  const favoriteCitiesHTML = favoriteCitiesElements.join("");

  return `
    <div class="main-menu__city-list">
      ${favoriteCitiesHTML}
    </div>`;
}

function registerEventListeners() {
  const cities = document.querySelectorAll(".city");
  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityName = city.getAttribute("data-city-name");
      loadWeatherView(cityName);
    });
  });
}
