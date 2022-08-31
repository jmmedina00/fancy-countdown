import { fromEvent } from "rxjs";
import loadBarSrc from "../../html/loadbar.html";
import { getComponent } from "../util/component";

const getNewLoadBar = () => getComponent(loadBarSrc);

export const getResettableLoadBarComponent = () => {
  const component = document.createElement("div");
  component.classList.add("container-sm");

  let loadBar = getNewLoadBar();
  component.appendChild(loadBar);

  fromEvent(document, "click").subscribe(() => {
    const newLoadBar = getNewLoadBar();
    component.replaceChild(newLoadBar, loadBar);
    loadBar = newLoadBar;
  });

  return component;
};
