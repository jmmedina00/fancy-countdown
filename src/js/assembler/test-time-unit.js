import { debounceTime } from "rxjs";
import { getTestRangeComponentAndObservable } from "../view/test-range";

export const getTestTimeUnitComponents = () => {
  const { component, observable: rangeObservable } =
    getTestRangeComponentAndObservable();

  rangeObservable.pipe(debounceTime(1000)).subscribe((x) => console.log(x));

  return [component];
};
