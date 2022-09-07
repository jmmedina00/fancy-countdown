import { distinctUntilChanged } from "rxjs";
import loadBarSrc from "../../html/loadbar.html";
import { getComponent } from "../util/component";

const getNewLoadBar = () => getComponent(loadBarSrc);

export const getResettableLoadBarComponent = (resetObservable) => {
  const component = document.createElement("div");
  component.classList.add("container-sm");

  resetObservable
    .pipe(distinctUntilChanged())
    .subscribe(() => component.replaceChildren(getNewLoadBar()));

  return component;
};
