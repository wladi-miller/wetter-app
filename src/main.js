import { loadWeatherView } from "./JS/weatherView.js";
import "./main.scss";

export const rootApp = document.querySelector("#app");

loadWeatherView("Dingolfing");
