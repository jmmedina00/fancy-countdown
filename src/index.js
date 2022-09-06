import "./style.scss";
import * as bootstrap from "bootstrap";
import { addToBody, getComponent } from "./js/util/component";
import timeFormSrc from "./html/time-form.html";
import { getCountdownComponents } from "./js/assembler/countdown";
import { getTestTimeUnitComponents } from "./js/assembler/test-time-unit";
import { getTimePromptComponent } from "./js/view/time-prompt";
import { getTimeFormComponents } from "./js/assembler/time-form";

const decideComponents = () => {
  const params = new URL(document.documentURI).searchParams;

  if (params.has("test")) {
    return getTestTimeUnitComponents();
  }

  if (!params.has("time") || Number.isNaN(+params.get("time"))) {
    return getTimeFormComponents();
  }

  const time = +params.get("time");
  return getCountdownComponents(time);
};

const components = decideComponents();

for (const component of components) {
  addToBody(component);
}
