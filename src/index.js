import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody, getComponent } from "./js/util/component";
import testSrc from "./html/test.html";
import { getCountdownComponents } from "./js/assembler/countdown";

const decideComponents = () => {
  const params = new URL(document.documentURI).searchParams;

  if (!params.has("time") || Number.isNaN(+params.get("time"))) {
    return [getComponent(testSrc)];
  }

  const time = +params.get("time");
  return getCountdownComponents(time);
};

const components = decideComponents();

for (const component of components) {
  addToBody(component);
}
