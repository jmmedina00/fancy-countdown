import timePromptSrc from "../../html/time-form.html";
import timeInputSrc from "../../html/time-input.html";
import { getComponent } from "../util/component";

const getTimeInput = ([label = "", maximum = 0]) => {
  const timeInputComponent = getComponent(timeInputSrc);
  const timeInputNode = timeInputComponent.querySelector(".time-input");
  const timeLabel = timeInputComponent.querySelector(".time-label");

  timeInputNode.max = maximum;
  timeLabel.innerText = label;

  return timeInputComponent;
};

export const getTimePromptComponent = () => {
  const units = {
    hours: 23,
    minutes: 59,
    seconds: 59,
  };

  const timePromptComponent = getComponent(timePromptSrc);
  const timePromptContainer = timePromptComponent.querySelector(".time-prompt");

  for (const unit of Object.entries(units)) {
    const inputComponent = getTimeInput(unit);
    timePromptContainer.appendChild(inputComponent);
  }

  return timePromptComponent;
};
