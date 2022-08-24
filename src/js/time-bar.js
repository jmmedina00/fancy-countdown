import timeBarSrc from "../html/time-bar.html";
import { getComponent } from "./component";
import { map } from "rxjs";
import { colors } from "./theme";

export const getTimeBarComponent = (baseTime, remainingTimeObservable) => {
  const component = getComponent(timeBarSrc);

  remainingTimeObservable.pipe(map((t) => t / 1000)).subscribe({
    next: (t) => {
      const percent = ((t / baseTime) * 100).toFixed(2);
      component.style.width = `${percent}%`;
      component.style.backgroundColor =
        percent < 25
          ? colors.danger
          : percent < 50
          ? colors.warning
          : colors.primary;
    },
    complete: () => {
      component.style.width = "0";
    },
  });

  return component;
};
