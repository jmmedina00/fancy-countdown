import { getTestRangeComponentAndObservable } from "../view/test-range";

export const getTestTimeUnitComponents = () => {
  const { component, observable: rangeObservable } =
    getTestRangeComponentAndObservable();

  rangeObservable.subscribe((x) => console.log(x));

  return [component];
};
