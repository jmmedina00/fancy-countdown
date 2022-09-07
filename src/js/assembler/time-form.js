import { getTimePromptComponent } from "../view/time-prompt";
import { getStartButtonComponentAndObservable } from "../view/start-button";
import { filter, map } from "rxjs";
import { getDurationInSeconds } from "../service/time-service";
import { redirectToTimer } from "../service/redirect-service";
import { getModalComponent } from "../view/modal";

const validationErrorMessage =
  "Please introduce a valid time. Total time must not equal to 0";

export const getTimeFormComponents = () => {
  const { component: startButtonComponent, observable: startButtonObservable } =
    getStartButtonComponentAndObservable();
  const { component: timePromptComponent, observable: inputTimeObservable } =
    getTimePromptComponent(startButtonObservable);

  const validationErrorModal = getModalComponent(validationErrorMessage);

  inputTimeObservable
    .pipe(
      filter(({ valid }) => valid),
      map(({ values }) => values)
    )
    .subscribe((time) => {
      const seconds = getDurationInSeconds(time);
      redirectToTimer(seconds);
    });

  inputTimeObservable.pipe(filter(({ valid }) => !valid)).subscribe(() => {
    validationErrorModal.show();
  });

  return [timePromptComponent, startButtonComponent];
};
