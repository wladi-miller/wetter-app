import { rootApp } from "../main.js";
import { loadWeatherView } from "./weatherView.js";
import { showLoading } from "./loading.js";
import { cityIDSought, getWeatherForecast } from "./api.js";
import { getConditionImagePath } from "./detailView/conditions.js";
import {
  getFavoriteCities,
  removeFavoriteCity,
  sanitizeSearchQuery,
  escapeHtml,
  normalizeCityId,
  formatTemperature,
} from "./utils.js";

let searchDebounceTimeoutId;
const SEARCH_DEBOUNCE_DELAY = 500;
const CITY_SELECTION_DELAY = 500;

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

function renderSearchResults(searchResults, onCitySelect) {
  const safeResults = searchResults
    .map((result) => ({
      id: normalizeCityId(result.id),
      name: escapeHtml(result.name),
      country: escapeHtml(result.country),
    }))
    .filter((result) => result.id);

  const searchResultsElements = safeResults.map(
    (result) => `
      <div class="search-result" data-city-id="${result.id}" data-city-name="${result.name}" tabindex="0">
        <h3 class="search-result__name">${result.name}</h3>
        <p class="search-result__country">${result.country}</p>
      </div>
    `,
  );

  const searchResultsDiv = document.querySelector(".main-menu__search-results");
  searchResultsDiv.innerHTML = searchResultsElements.join("");
  searchResultsDiv.style.display = safeResults.length > 0 ? "flex" : "none";

  const resultElements = searchResultsDiv.querySelectorAll(".search-result");
  resultElements.forEach((el) => {
    el.addEventListener("click", () => {
      const cityId = normalizeCityId(el.getAttribute("data-city-id"));
      if (cityId) onCitySelect(cityId);
    });
  });
}

async function getCityListHTML() {
  const favoriteCities = getFavoriteCities();

  const favoriteCitiesElements = [];

  for (let cityId of favoriteCities) {
    const safeCityId = normalizeCityId(cityId);
    if (!safeCityId) continue;
    const weatherData = await getWeatherForecast("id:" + safeCityId, 1);
    console.log(weatherData);
    if (!weatherData) continue;

    const { location, current, forecast } = weatherData;
    console.log(location, current, forecast);
    const currentDay = forecast.forecastday[0];

    const image = getConditionImagePath(
      current.condition.code,
      current.is_day !== 1,
    );

    const safeName = escapeHtml(location.name);
    const safeCountry = escapeHtml(location.country);
    const safeCondition = escapeHtml(current.condition.text);

    const cityHTML = `
  <div class="city-wrapper" data-city-id="${safeCityId}">
    <div class="city" data-city-id="${safeCityId}" ${image ? `style="--condition-image: url(${image})"` : ""}>
      <div class="city__left-column">
        <h2 class="city__name">${safeName}</h2>
        <div class="city__country">${safeCountry}</div>
        <div class="city__condition">${safeCondition}</div>
      </div>
      <div class="city__right-column">
        <div class="city__temperature">${formatTemperature(current.temp_c)}°</div>
        <div class="city__min-max-temperature">H:${formatTemperature(currentDay.day.maxtemp_c)}° T:${formatTemperature(currentDay.day.mintemp_c)}°</div>
      </div>
    </div>
    <button class="city-wrapper__delete" data-delete-city="${safeCityId}" aria-label="Stadt löschen">
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
  let latestSearchRequestId = 0;
  let citySelectionTimeoutId;

  function openCityWithDelay(cityId) {
    clearTimeout(citySelectionTimeoutId);
    citySelectionTimeoutId = window.setTimeout(() => {
      loadWeatherView("id:" + cityId);
    }, CITY_SELECTION_DELAY);
  }

  cities.forEach((city) => {
    city.addEventListener("click", () => {
      const cityId = city.getAttribute("data-city-id");
      if (cityId) {
        openCityWithDelay(cityId);
      }
    });
  });

  const searchInput = document.querySelector(".main-menu__search-input");

  async function searchCities(query) {
    const normalizedQuery = sanitizeSearchQuery(query);

    if (normalizedQuery.length <= 1) {
      latestSearchRequestId += 1;
      renderSearchResults([], openCityWithDelay);
      return [];
    }

    const requestId = ++latestSearchRequestId;
    const searchResult = await cityIDSought(normalizedQuery);

    if (
      requestId !== latestSearchRequestId ||
      searchInput.value.trim() !== normalizedQuery
    ) {
      return [];
    }

    renderSearchResults(searchResult, openCityWithDelay);
    return searchResult;
  }

  searchInput.addEventListener("input", (event) => {
    const safeValue = sanitizeSearchQuery(event.target.value);
    event.target.value = safeValue;

    clearTimeout(searchDebounceTimeoutId);
    searchDebounceTimeoutId = window.setTimeout(() => {
      searchCities(safeValue);
    }, SEARCH_DEBOUNCE_DELAY);
  });

  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();

      if (!query) {
        return;
      }

      const searchResult = await searchCities(query);
      if (searchResult.length > 0) {
        openCityWithDelay(searchResult[0].id);
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
