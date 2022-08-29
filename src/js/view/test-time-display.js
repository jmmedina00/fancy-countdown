import { debounceTime, delay, fromEvent, map, merge, of } from "rxjs";
import timerSrc from "../../html/timer-wrapper.html";
import { getComponent } from "../util/component";
import { getTimeUnitComponent } from "./time-unit";

const getMockedTimeObservable = (maximum = 1) =>
  merge(of(1).pipe(delay(500)), fromEvent(document, "click")).pipe(
    map((_, index) => +maximum - (index % (+maximum + 1)))
  );

export const getTestTimeDisplayComponent = (timeUnitReplaceObservable) => {
  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  let timeUnitComponent = document.createElement("div");

  timeUnitReplaceObservable.pipe(debounceTime(1000)).subscribe((maximum) => {
    const newTimeUnitComponent = getTimeUnitComponent([
      "Test",
      getMockedTimeObservable(maximum),
      maximum,
    ]);

    timerContainer.replaceChild(newTimeUnitComponent, timeUnitComponent);
    timeUnitComponent = newTimeUnitComponent;
  });

  timerContainer.appendChild(timeUnitComponent);
  return wrappedTimerComponent;
};
