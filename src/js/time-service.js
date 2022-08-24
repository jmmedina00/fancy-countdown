import { duration } from "moment";
import { interval, takeUntil, timer, map } from "rxjs";

export const provideTimerObservables = (time = 1) => {
  const stopTime = (time + 1) * 1000;
  const stopTimerObservable = timer(stopTime);
  const constrainedInterval = interval(1000).pipe(
    takeUntil(stopTimerObservable)
  );
  const remainingTimeObservable = constrainedInterval.pipe(
    map((ellapsedTime) => (time - ellapsedTime) * 1000)
  ); // moment defaults to ms

  const unitTimerObservables = {
    seconds: remainingTimeObservable.pipe(map((t) => duration(t).seconds())),
    minutes: remainingTimeObservable.pipe(map((t) => duration(t).minutes())),
  };

  if (duration(time).asMinutes() > 60) {
    unitTimerObservables = {
      ...unitTimerObservables,
      hours: remainingTimeObservable.pipe(map((t) => duration(t).hours())),
    };
  }

  return { stopTimerObservable, remainingTimeObservable, unitTimerObservables };
};
