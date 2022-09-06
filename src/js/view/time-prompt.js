import { map } from "rxjs";
import timePromptSrc from "../../html/time-form.html";
import { getComponent } from "../util/component";
import { getTimeInputComponent } from "./time-input";

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

      const valid =
        !valueEntries.every(
          ([_, value]) => Number.isNaN(value) || value <= 0
        ) &&
        valueEntries.every(
          ([_, value], index) =>
            value >= 0 && value <= Object.entries(units)[index][1]
        );

      return { valid, values: Object.fromEntries(valueEntries) };
    })
  );

  for (const inputComponent of inputComponents) {
    timePromptContainer.appendChild(inputComponent);
  }

  return timePromptComponent;
};
