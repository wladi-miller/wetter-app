import { loadWeatherView } from "./weatherView.js";
import "./main.scss";

export const rootApp = document.querySelector("#app");

loadWeatherView("Moskau");
