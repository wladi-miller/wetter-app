import { rootApp } from "../main.js";

export function renderMainView() {
  rootApp.innerHTML = `
  <div class="main-menu">
    ${getHeaderHTML()}
    ${getCityListHTML()}
  </div>`;
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

function getCityListHTML() {
  const favoriteCities = ["Dingolfing", "München", "Berlin", "Hamburg", "Köln"];

  const favoriteCitiesElements = [];

  for (let city of favoriteCities) {
    const cityHTML = `
      <div class="city-wrapper">
            <div
                class="city"
                style="
                --condition-image: url(/wetter-app/conditionImages/day/partly_cloudy_day.jpg);
                "
            >
                <div class="city__left-column">
                    <h2 class="city__name">${city}</h2>
                    <div class="city__country">Germany</div>
                    <div class="city__condition">Sonnig</div>
                </div>
                <div class="city__right-column">
                    <div class="city__temperature">20</div>
                    <div class="city__min-max-temperature">H:20 T:0</div>
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
