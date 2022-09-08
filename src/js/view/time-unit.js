import timeUnitSrc from "../../html/time-unit-counter.html";
import { getComponent } from "../util/component";
import { first } from "rxjs";
import * as bootstrap from "bootstrap";
import { colors } from "../util/theme";

const { purple, orange, danger, success, primary, cyan, warning } = colors;
const timeUnitColors = [
  purple,
  primary,
  cyan,
  success,
  orange,
  warning,
  danger,
];

export const getTimeUnitComponent = ([
  unitLabel = "",
  timerObservable,
  timeUnitMaximum,
]) => {
  const timeUnitComponent = getComponent(timeUnitSrc);
  const numberLabelNode = timeUnitComponent.querySelector(".number");
  const unitLabelNode = timeUnitComponent.querySelector(".label .col");
  const timeUnitBar = timeUnitComponent.querySelector(".time-unit-bar .col");

  const getReducedTimeUnitColors = (colors = []) => {
    const numberOfColors = colors.length;
    const indexToRemove =
      numberOfColors % 2 === 0
        ? numberOfColors / 2 - 1
        : Math.floor(numberOfColors / 2);
    const reducedColors = colors.filter((_, index) => index !== indexToRemove);

    return reducedColors.length <= timeUnitMaximum
      ? reducedColors
      : getReducedTimeUnitColors(reducedColors);
  };

  const getBarColor = (time) => {
    if (timeUnitMaximum == timeUnitColors.length) {
      return timeUnitColors[timeUnitColors.length - (time || 1)];
    }

    if (timeUnitMaximum < timeUnitColors.length) {
      const useColors = getReducedTimeUnitColors(timeUnitColors);
      return useColors[useColors.length - (time || 1)];
    }

    const thresholds = timeUnitColors.map(
      (_, index) => (timeUnitColors.length - 1 - index) / timeUnitColors.length
    );

    const timePercent = time / timeUnitMaximum;
    const pickedIndex = thresholds.findIndex(
      (percent) => percent <= timePercent
    );

    return timeUnitColors[pickedIndex];
  };

  timerObservable.subscribe({
    next: (x) => {
      numberLabelNode.innerText = ("" + x).padStart(2, 0);

      const percent = (x / timeUnitMaximum) * 100;
      timeUnitBar.style.height = `${percent}%`;
      timeUnitBar.style.backgroundColor = getBarColor(x);
    },
    complete: () => {
      numberLabelNode.innerText = "00";
      timeUnitBar.style.height = "0";
    },
  });

  timerObservable
    .pipe(first())
    .subscribe(() => new bootstrap.Collapse(numberLabelNode));

  unitLabelNode.innerText = unitLabel;

  return timeUnitComponent;
};
