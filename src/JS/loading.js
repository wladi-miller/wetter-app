import { rootApp } from "../main.js";

export function showLoading(city, message = `Läde Wetterdaten für ${city}...`) {
  rootApp.innerHTML = getLoadSpinner(message);
}

function getLoadSpinner(message) {
  return `
    <div class="loading">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <p>${message}</p>
    </div>`;
}
