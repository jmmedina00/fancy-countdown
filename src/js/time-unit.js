import timeUnitSrc from "../html/time-unit-counter.html";
import { getComponent } from "./component";
import { first } from "rxjs";
import * as bootstrap from "bootstrap";

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

  timer.pipe(first()).subscribe(() => new bootstrap.Collapse(numberLabelNode));

  unitLabelNode.innerHTML = unitLabel;

  return timeUnitComponent;
};
