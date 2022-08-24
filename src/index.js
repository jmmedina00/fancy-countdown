import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody } from "./js/component";
import { getTimeBarComponent } from "./js/time-bar";
import { getTimerComponent } from "./js/timer";
import { provideTimers } from "./js/time-service";

console.log("Hello World!");
const { stopTimer, unitTimers, remainingTime } = provideTimers(140);

const timeBar = getTimeBarComponent(140, remainingTime);
addToBody(timeBar);

const timer = getTimerComponent(unitTimers);
addToBody(timer);
