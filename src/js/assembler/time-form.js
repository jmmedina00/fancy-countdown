import { getTimePromptComponent } from "../view/time-prompt";
import { getStartButtonComponentAndObservable } from "../view/start-button";
import { filter, map } from "rxjs";

export const getTimeFormComponents = () => {
  const { component: startButtonComponent, observable: startButtonObservable } =
    getStartButtonComponentAndObservable();
  const { component: timePromptComponent, observable: inputTimeObservable } =
    getTimePromptComponent(startButtonObservable);

  inputTimeObservable
    .pipe(
      filter(({ valid }) => valid),
      map(({ values }) => values)
    )
    .subscribe(console.log);

  return [timePromptComponent, startButtonComponent];
};
