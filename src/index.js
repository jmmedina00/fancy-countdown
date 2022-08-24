import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody } from "./js/component";
import { timeBarComponent } from "./js/time-bar";
import { getTimerComponent } from "./js/timer";
import { provideTimers } from "./js/time-service";

console.log("Hello World!");
const { stopTimer, unitTimers } = provideTimers(140);

const timeBar = timeBarComponent.cloneNode(true);
addToBody(timeBar);

const timer = getTimerComponent(unitTimers);
addToBody(timer);

setTimeout(() => {
  timeBar.style.width = "30%";
}, 2000);
