import { fromEvent, merge, map } from "rxjs";
import testRangeSrc from "../../html/test-range.html";
import { getComponent } from "../util/component";

export const getTestRangeComponentAndObservable = () => {
  const component = getComponent(testRangeSrc);
  const range = component.querySelector("#maximumRange");
  const currentValueLabel = component.querySelector("#currentValue");

  const backLink = component.querySelector("a");
  backLink.href = document.referrer;

  const refreshValue = (value) => {
    currentValueLabel.innerText = value;
  };

  const observable = merge(
    fromEvent(window, "load"),
    fromEvent(range, "input")
  ).pipe(map(() => range.value));

  observable.subscribe(refreshValue);

  return { component, observable };
};
