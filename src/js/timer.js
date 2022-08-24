import timerSrc from "../html/timer-wrapper.html";
import { getComponent } from "./component";
import { getTimeUnitComponent } from "./time-unit";

export const getTimerComponent = (unitTimers) => {
  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  const entries = Object.entries(unitTimers);

  // const units = ["Minutes", "Seconds"];
  const unitComponents = entries.map((entry) => getTimeUnitComponent(entry));

  for (const component of unitComponents) {
    timerContainer.appendChild(component);
  }

  return wrappedTimerComponent;
};
