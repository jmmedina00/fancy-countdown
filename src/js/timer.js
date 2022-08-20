import { getTimeUnitComponent } from "./time-unit";

export const getTimerComponent = () => {
  const units = ["Minutes", "Seconds"];
  const unitComponents = units.map((unit) => getTimeUnitComponent(unit));

  const timerComponent = document.createElement("div");
  timerComponent.classList.add("row");

  for (const component of unitComponents) {
    timerComponent.appendChild(component);
  }

  return timerComponent;
};
