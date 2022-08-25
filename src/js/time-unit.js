import timeUnitSrc from "../html/time-unit-counter.html";
import { getComponent } from "./component";
import { first } from "rxjs";
import * as bootstrap from "bootstrap";

export const getTimeUnitComponent = ([
  unitLabel = "",
  timerObservable,
  timeUnitMaximum,
]) => {
  const timeUnitComponent = getComponent(timeUnitSrc);
  const numberLabelNode = timeUnitComponent.querySelector(".number");
  const unitLabelNode = timeUnitComponent.querySelector(".label .col");
  const timeUnitBar = timeUnitComponent.querySelector(".time-unit-bar .col");

  timerObservable.subscribe({
    next: (x) => {
      numberLabelNode.innerHTML = ("" + x).padStart(2, 0);

      const percent = (x / timeUnitMaximum) * 100;
      timeUnitBar.style.height = `${percent}%`;
    },
    complete: () => {
      numberLabelNode.innerHTML = "00";
      timeUnitBar.style.height = "0";
    },
  });

  timerObservable
    .pipe(first())
    .subscribe(() => new bootstrap.Collapse(numberLabelNode));

  unitLabelNode.innerHTML = unitLabel;

  return timeUnitComponent;
};
