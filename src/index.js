import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody } from "./js/component";
import { getTimeBarComponent } from "./js/time-bar";
import { getTimerComponent } from "./js/timer";
import { provideTimerObservables } from "./js/time-service";

console.log("Hello World!");
const { stopTimerObservable, unitTimerObservables, remainingTimeObservable } =
  provideTimerObservables(140);

const timeBarComponent = getTimeBarComponent(140, remainingTimeObservable);
addToBody(timeBarComponent);

const timerComponent = getTimerComponent(unitTimerObservables);
addToBody(timerComponent);
