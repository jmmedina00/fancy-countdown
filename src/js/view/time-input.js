import timeInputSrc from "../../html/time-input.html";
import { fromEvent } from "rxjs";
import { getComponent } from "../util/component";

export const getTimeInputComponent = ([label = "", maximum = 0]) => {
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
