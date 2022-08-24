import timeUnitSrc from "../html/time-unit-counter.html";
import { getComponent } from "./component";

export const getTimeUnitComponent = ([unitLabel = "", timer]) => {
  const timeUnitComponent = getComponent(timeUnitSrc);
  const numberLabelNode = timeUnitComponent.querySelector(".number");
  const unitLabelNode = timeUnitComponent.querySelector(".label .col");

  timer.subscribe({
    next: (x) => {
      numberLabelNode.innerHTML = ("" + x).padStart(2, 0);
    },
    complete: () => {
      numberLabelNode.innerHTML = "00";
    },
  });
  unitLabelNode.innerHTML = unitLabel;

  return timeUnitComponent;
};
