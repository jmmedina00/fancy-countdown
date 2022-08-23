import timerSrc from "../html/timer-wrapper.html";
import { getComponent } from "./component";
import { getTimeUnitComponent } from "./time-unit";

export const getTimerComponent = () => {
  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  const units = ["Minutes", "Seconds"];
  const unitComponents = units.map((unit) => getTimeUnitComponent(unit));

  for (const component of unitComponents) {
    timerContainer.appendChild(component);
  }

  return wrappedTimerComponent;
};
