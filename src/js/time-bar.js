import timeBarSrc from "../html/time-bar.html";
import { getComponent } from "./component";
import { map } from "rxjs";

export const getTimeBarComponent = (baseTime, remainingTime) => {
  const component = getComponent(timeBarSrc);

  remainingTime.pipe(map((t) => t / 1000)).subscribe({
    next: (t) => {
      const percent = ((t / baseTime) * 100).toFixed(2);
      component.style.width = `${percent}%`;
    },
    complete: () => {
      component.style.width = "0";
    },
  });

  return component;
};
