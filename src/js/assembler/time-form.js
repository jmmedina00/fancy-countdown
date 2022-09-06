import { getTimePromptComponent } from "../view/time-prompt";
import startButtonSrc from "../../html/start-button.html";
import { getComponent } from "../util/component";

export const getTimeFormComponents = () => {
  const startButtonComponent = getComponent(startButtonSrc);
  const timePromptComponent = getTimePromptComponent();

  return [timePromptComponent, startButtonComponent];
};
