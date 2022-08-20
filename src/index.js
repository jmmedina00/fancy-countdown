import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody } from "./js/component";
import { timeBarComponent } from "./js/time-bar";
import { getTimerComponent } from "./js/timer";

console.log("Hello World!");
const timeBar = timeBarComponent.cloneNode(true);
addToBody(timeBar);

const timer = getTimerComponent();
addToBody(timer);

setTimeout(() => {
  timeBar.style.width = "30%";
}, 2000);
