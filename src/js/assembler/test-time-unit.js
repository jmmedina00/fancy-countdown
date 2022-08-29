import { merge, debounceTime, fromEvent, of, timer, delay, map } from "rxjs";
import { getComponent } from "../util/component";
import { getTestRangeComponentAndObservable } from "../view/test-range";
import timerSrc from "../../html/timer-wrapper.html";
import { getTimeUnitComponent } from "../view/time-unit";

const getMockedTimeObservable = (maximum = 1) =>
  merge(of(1).pipe(delay(500)), fromEvent(document, "click")).pipe(
    map((_, index) => maximum - (index % (maximum + 1)))
  );

export const getTestTimeUnitComponents = () => {
  const { component, observable: rangeObservable } =
    getTestRangeComponentAndObservable();

  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  let timeUnitComponent = document.createElement("div");

  rangeObservable.pipe(debounceTime(1000)).subscribe((maximum) => {
    const newTimeUnitComponent = getTimeUnitComponent([
      "Test",
      getMockedTimeObservable(maximum),
      maximum,
    ]);
    timerContainer.replaceChild(newTimeUnitComponent, timeUnitComponent);
    timeUnitComponent = newTimeUnitComponent;
  });

  timerContainer.appendChild(timeUnitComponent);

  return [component, wrappedTimerComponent];
};
