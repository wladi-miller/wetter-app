import { render } from "sass";
/* import { loadMainView } from "./JS/mainView.js"; */
import { renderMainView } from "./JS/mainView.js";
import "./main.scss";

export const rootApp = document.querySelector("#app");

// loadMainView();
renderMainView();
