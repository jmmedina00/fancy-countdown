import {
  debounceTime,
  delay,
  fromEvent,
  map,
  merge,
  of,
  takeUntil,
} from "rxjs";
import timerSrc from "../../html/timer-wrapper.html";
import { getComponent } from "../util/component";
import { getTimeUnitComponent } from "./time-unit";

export const getTestTimeDisplayComponent = (timeUnitReplaceObservable) => {
  const wrappedTimerComponent = getComponent(timerSrc);
  const timerContainer =
    wrappedTimerComponent.querySelector(".align-self-center");

  const debouncedReplaceObservable = timeUnitReplaceObservable.pipe(
    debounceTime(1000)
  );

  const getMockedTimeObservable = (maximum = 1) =>
    merge(of(1).pipe(delay(500)), fromEvent(document, "click")).pipe(
      map((_, index) => +maximum - (index % (+maximum + 1))),
      takeUntil(debouncedReplaceObservable)
    );

  debouncedReplaceObservable.subscribe((maximum) => {
    const timeUnitComponent = getTimeUnitComponent([
      "Test",
      getMockedTimeObservable(maximum),
      maximum,
    ]);

    timerContainer.replaceChildren(timeUnitComponent);
  });

  return wrappedTimerComponent;
};
