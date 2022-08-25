import timeUnitSrc from "../html/time-unit-counter.html";
import { getComponent } from "./component";
import { first } from "rxjs";
import * as bootstrap from "bootstrap";
import { colors } from "./theme";

export const getTimeUnitComponent = ([
  unitLabel = "",
  timerObservable,
  timeUnitMaximum,
]) => {
  const timeUnitComponent = getComponent(timeUnitSrc);
  const numberLabelNode = timeUnitComponent.querySelector(".number");
  const unitLabelNode = timeUnitComponent.querySelector(".label .col");
  const timeUnitBar = timeUnitComponent.querySelector(".time-unit-bar .col");

  const getBarColor = (time) => {
    // Three color ranges, remove warning, then success if maximum lower than 3
    // Refactor to accept an array, remove colors from the center as max gets lower
    if (timeUnitMaximum == 1) {
      return colors.danger;
    }

    if (timeUnitMaximum == 2) {
      return time <= 1 ? colors.danger : colors.success;
    }

    const timePercent = time / timeUnitMaximum;
    return timePercent <= 1 / 3
      ? colors.danger
      : timePercent <= 2 / 3
      ? colors.warning
      : colors.success;
  };

  timerObservable.subscribe({
    next: (x) => {
      numberLabelNode.innerHTML = ("" + x).padStart(2, 0);

      const percent = (x / timeUnitMaximum) * 100;
      timeUnitBar.style.height = `${percent}%`;
      timeUnitBar.style.backgroundColor = getBarColor(x);
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
