import { rootApp } from "../main.js";
import { loadWeatherView } from "./weatherView.js";
import { showLoading } from "./loading.js";
import { cityIDSought, getWeatherForecast } from "./api.js";
import { getConditionImagePath } from "./detailView/conditions.js";
import { getFavoriteCities, removeFavoriteCity } from "./utils.js";

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
          <div class="main-menu__search-results"></div>
    </div>`;
}

function renderSearchResults(searchResults) {
  const searchResultsElements = searchResults.map(
    (result) =>
      `
        <div class="search-result" data-city-id="${result.id}" data-city-name="${result.name}" tabindex="0">
            <h3 class="search-result__name">${result.name}</h3>
            <p class="search-result__country">${result.country}</p>
        </div>
    `,
  );

  const searchResultsHtml = searchResultsElements.join("");

  const searchResultsDiv = document.querySelector(".main-menu__search-results");
  searchResultsDiv.innerHTML = searchResultsHtml;

  if (searchResults.length > 0) {
    searchResultsDiv.style.display = "flex";
  } else {
    searchResultsDiv.style.display = "none";
  }

  const resultElements = searchResultsDiv.querySelectorAll(".search-result");
  resultElements.forEach((el) => {
    el.addEventListener("click", () => {
      const cityId = el.getAttribute("data-city-id");
      if (cityId) {
        loadWeatherView("id:" + cityId);
      }
    });
  });
}

async function getCityListHTML() {
  const favoriteCities = getFavoriteCities();

  const favoriteCitiesElements = [];

  for (let cityId of favoriteCities) {
    const weatherData = await getWeatherForecast("id:" + cityId, 1);
    if (!weatherData) continue;

    const { location, current, forecast } = weatherData;
    const currentDay = forecast.forecastday[0];

    const image = getConditionImagePath(
      current.condition.code,
      current.is_day !== 1,
    );

    const cityHTML = `
  <div class="city-wrapper" data-city-id="${cityId}">
    <div
      class="city"
      data-city-id="${cityId}"
      ${image ? `style="--condition-image: url(${image})"` : ""}
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
    <button class="city-wrapper__delete" data-delete-city="${cityId}" aria-label="Stadt löschen">
      <img src="${import.meta.env.BASE_URL}delete.svg" alt="Löschen" />
    </button>
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
      const cityId = city.getAttribute("data-city-id");
      if (cityId) {
        loadWeatherView("id:" + cityId);
      }
    });
  });

  const searchBar = document.querySelector(".main-menu__search-input");
  searchBar.addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length > 1) {
      const searchResult = await cityIDSought(query);
      console.log(searchResult);
      renderSearchResults(searchResult);
    } else {
      renderSearchResults([]);
    }
  });

  const searchInput = document.querySelector(".main-menu__search-input");
  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        const searchResult = await cityIDSought(query);
        if (searchResult && searchResult.length > 0) {
          loadWeatherView("id:" + searchResult[0].id);
        }
      }
    }
  });

  const mainMenu = document.querySelector(".main-menu");
  const editButton = document.querySelector(".main-menu__edit");

  editButton?.addEventListener("click", () => {
    const isEditMode = editButton.textContent.trim() === "Bearbeiten";
    editButton.textContent = isEditMode ? "Fertig" : "Bearbeiten";
    mainMenu?.classList.toggle("main-menu--edit-mode", isEditMode);
  });

  const deleteButtons = document.querySelectorAll(".city-wrapper__delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const cityId = button.getAttribute("data-delete-city");
      const removed = removeFavoriteCity(cityId);

      if (removed) {
        button.closest(".city-wrapper")?.remove();
      }
    });
  });
}
