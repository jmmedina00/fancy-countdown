import {
  getTimeUnitMaximums,
  provideTimerObservables,
} from "../service/time-service";
import { getModalComponent } from "../view/modal";
import { getTimeBarComponent } from "../view/time-bar";
import { getTimerComponent } from "../view/timer";

export const getCountdownComponents = (time = 0) => {
  const { stopTimerObservable, unitTimerObservables, remainingTimeObservable } =
    provideTimerObservables(time);

  const timeBarComponent = getTimeBarComponent(time, remainingTimeObservable);
  const timerComponent = getTimerComponent(
    unitTimerObservables,
    getTimeUnitMaximums(time)
  );

  const timesUpModal = getModalComponent("Time's up!");
  stopTimerObservable.subscribe(() => timesUpModal.show());

  return [timeBarComponent, timerComponent];
};
