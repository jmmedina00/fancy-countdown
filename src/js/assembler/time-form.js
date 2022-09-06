import { getTimePromptComponent } from "../view/time-prompt";
import { getStartButtonComponentAndObservable } from "../view/start-button";

export const getTimeFormComponents = () => {
  const { component: startButtonComponent, observable: startButtonObservable } =
    getStartButtonComponentAndObservable();
  const timePromptComponent = getTimePromptComponent(startButtonObservable);

  return [timePromptComponent, startButtonComponent];
};
