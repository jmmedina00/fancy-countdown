import { getTimePromptComponent } from "../view/time-prompt";
import { getStartButtonComponentAndObservable } from "../view/start-button";

export const getTimeFormComponents = () => {
  const { component: startButtonComponent, observable: startButtonObservable } =
    getStartButtonComponentAndObservable();
  const timePromptComponent = getTimePromptComponent();

  startButtonObservable.subscribe(() => console.log(new Date()));

  return [timePromptComponent, startButtonComponent];
};
