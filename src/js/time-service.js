import { duration } from "moment";
import { interval, takeUntil, timer, map } from "rxjs";

export const provideTimers = (time = 1) => {
  const stopTime = (time + 1) * 1000;
  const stopTimer = timer(stopTime);
  const constrainedInterval = interval(1000).pipe(takeUntil(stopTimer));
  const remainingTime = constrainedInterval.pipe(
    map((ellapsedTime) => (time - ellapsedTime) * 1000)
  ); // moment defaults to ms

  const unitTimers = {
    seconds: remainingTime.pipe(map((t) => duration(t).seconds())),
    minutes: remainingTime.pipe(map((t) => duration(t).minutes())),
  };

  if (duration(time).asMinutes() > 60) {
    unitTimers = {
      ...unitTimers,
      hours: remainingTime.pipe(map((t) => duration(t).hours())),
    };
  }

  return { stopTimer, remainingTime, unitTimers };
};
