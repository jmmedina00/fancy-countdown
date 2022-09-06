import { fromEvent, map } from "rxjs";
import timePromptSrc from "../../html/time-form.html";
import timeInputSrc from "../../html/time-input.html";
import { getComponent } from "../util/component";

const getTimeInputComponent = ([label = "", maximum = 0]) => {
  const isCurrentValueValid = (value) =>
    !Number.isNaN(+value) ? +value >= 0 && +value <= maximum : false;

  const timeInputComponent = getComponent(timeInputSrc);
  const timeInputNode = timeInputComponent.querySelector(".time-input");
  const timeLabel = timeInputComponent.querySelector(".time-label");

  timeInputNode.max = maximum;
  timeLabel.innerText = label;

  fromEvent(timeInputNode, "input").subscribe(() =>
    isCurrentValueValid(timeInputNode.value)
      ? timeInputNode.classList.remove("is-invalid")
      : timeInputNode.classList.add("is-invalid")
  );

  return timeInputComponent;
};

export const getTimePromptComponent = (collectTriggerObservable) => {
  const units = {
    hours: 23,
    minutes: 59,
    seconds: 59,
  };

  const timePromptComponent = getComponent(timePromptSrc);
  const timePromptContainer = timePromptComponent.querySelector(".time-prompt");

  const inputComponents = Object.entries(units).map(getTimeInputComponent);
  const inputNodes = inputComponents.map((component) =>
    component.querySelector(".time-input")
  );

  const observable = collectTriggerObservable.pipe(
    map(() => {
      const valueEntries = Object.entries(units).map(([label], index) => [
        label,
        +inputNodes[index].value,
      ]);

      return { values: Object.fromEntries(valueEntries) };
    })
  );

  observable.subscribe(console.log);

  for (const inputComponent of inputComponents) {
    timePromptContainer.appendChild(inputComponent);
  }

  return timePromptComponent;
};
