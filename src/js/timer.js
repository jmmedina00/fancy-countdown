import timerSrc from "../html/timer-wrapper.html";
import { getComponent } from "./component";
import { getTimeUnitComponent } from "./time-unit";

export const getTimerComponent = (
  unitTimerObservables = {},
  timeUnitMaximums = {}
) => {
  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  const entries = Object.entries(unitTimerObservables).reverse();
  const unitComponents = entries.map(([label, observable]) =>
    getTimeUnitComponent([label, observable, timeUnitMaximums[label]])
  );

  for (const component of unitComponents) {
    timerContainer.appendChild(component);
  }

  return wrappedTimerComponent;
};
