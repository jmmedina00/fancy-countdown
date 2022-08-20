import timeUnitSrc from "../html/time-unit-counter.html";
import { getComponent } from "./component";

export const getTimeUnitComponent = (unitLabel = "") => {
  const timeUnitComponent = getComponent(timeUnitSrc);
  const unitLabelNode = timeUnitComponent.querySelector(".label .col");
  unitLabelNode.innerHTML = unitLabel;

  return timeUnitComponent;
};
