import {
  getTimeUnitMaximums,
  provideTimerObservables,
} from "../service/time-service";
import { getModalComponent } from "../view/modal";
import { getTimeBarComponent } from "../view/time-bar";
import { getTimerComponent } from "../view/timer";

const spamLinks = {
  Home: "/",
  "Go to Linkedin":
    "https://www.linkedin.com/in/juan-miguel-medina-prieto-88926715a/",
};

export const getCountdownComponents = (time = 0) => {
  const { stopTimerObservable, unitTimerObservables, remainingTimeObservable } =
    provideTimerObservables(time);

  const timeBarComponent = getTimeBarComponent(time, remainingTimeObservable);
  const timerComponent = getTimerComponent(
    unitTimerObservables,
    getTimeUnitMaximums(time)
  );

  const timesUpModal = getModalComponent("Time's up!", spamLinks);
  stopTimerObservable.subscribe(() => timesUpModal.show());

  return [timeBarComponent, timerComponent];
};
