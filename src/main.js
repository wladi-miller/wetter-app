import "./main.scss";
import "./styles/detailView.scss";
import { getWeatherCurrent } from "./JS/api.js";
import { loadDetailView } from "./JS/detailView.js";

export const rootApp = document.querySelector("#app");

loadDetailView("Dingolfing");
