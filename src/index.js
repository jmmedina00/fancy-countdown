import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody } from "./js/util/component";
import { getTimeBarComponent } from "./js/view/time-bar";
import { getTimerComponent } from "./js/view/timer";
import {
  getTimeUnitMaximums,
  provideTimerObservables,
} from "./js/service/time-service";

console.log("Hello World!");
const { stopTimerObservable, unitTimerObservables, remainingTimeObservable } =
  provideTimerObservables(140);

const timeBarComponent = getTimeBarComponent(140, remainingTimeObservable);
addToBody(timeBarComponent);

const timerComponent = getTimerComponent(
  unitTimerObservables,
  getTimeUnitMaximums(140)
);
addToBody(timerComponent);
