import { getTimeUnitComponent } from "./time-unit";

export const getTimerComponent = () => {
  const units = ["Minutes", "Seconds"];
  const unitComponents = units.map((unit) => getTimeUnitComponent(unit));

  const timerWrapper = document.createElement("div");
  timerWrapper.classList.add("container-sm");
  timerWrapper.classList.add("flex-grow-1");
  timerWrapper.classList.add("d-flex");

  const timerComponent = document.createElement("div");
  timerComponent.classList.add("row");
  timerComponent.classList.add("flex-grow-1");
  timerComponent.classList.add("align-self-center");

  for (const component of unitComponents) {
    timerComponent.appendChild(component);
  }

  timerWrapper.appendChild(timerComponent);

  return timerWrapper;
};
