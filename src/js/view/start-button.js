import { fromEvent } from "rxjs";
import startButtonSrc from "../../html/start-button.html";
import { getComponent } from "../util/component";

export const getStartButtonComponentAndObservable = () => {
  const component = getComponent(startButtonSrc);
  const buttonNode = component.querySelector(".btn");

  const observable = fromEvent(buttonNode, "click");

  return { component, observable };
};
