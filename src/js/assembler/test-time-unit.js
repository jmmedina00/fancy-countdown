import { getResettableLoadBarComponent } from "../view/resettable-loadbar";
import { getTestRangeComponentAndObservable } from "../view/test-range";
import { getTestTimeDisplayComponent } from "../view/test-time-display";

export const getTestTimeUnitComponents = () => {
  const { component: rangeComponent, observable: rangeObservable } =
    getTestRangeComponentAndObservable();

  const loadBarComponent = getResettableLoadBarComponent(rangeObservable);

  const mockedTimerComponent = getTestTimeDisplayComponent(rangeObservable);

  return [rangeComponent, loadBarComponent, mockedTimerComponent];
};
