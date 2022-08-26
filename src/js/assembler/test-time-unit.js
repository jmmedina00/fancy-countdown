import { getTestRangeComponentAndObservable } from "../view/test-range";

export const getTestTimeUnitComponents = () => {
  const { component } = getTestRangeComponentAndObservable();

  return [component];
};
