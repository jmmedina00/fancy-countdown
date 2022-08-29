import { merge, debounceTime, fromEvent, of, timer, delay, map } from "rxjs";
import { getComponent } from "../util/component";
import { getTestRangeComponentAndObservable } from "../view/test-range";
import timerSrc from "../../html/timer-wrapper.html";
import { getTimeUnitComponent } from "../view/time-unit";

export const getTestTimeUnitComponents = () => {
  const { component, observable: rangeObservable } =
    getTestRangeComponentAndObservable();

  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  rangeObservable.pipe(debounceTime(1000)).subscribe((x) => console.log(x));

  const mockedTimeObservable = merge(
    of(1).pipe(delay(500)),
    fromEvent(document, "click")
  ).pipe(map((_, index) => 5 - (index % 6)));

  const timeUnitComponent = getTimeUnitComponent([
    "Test",
    mockedTimeObservable, //Placeholder observable
    5,
  ]);

  timerContainer.appendChild(timeUnitComponent);

  return [component, wrappedTimerComponent];
};
