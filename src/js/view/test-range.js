import testRangeSrc from "../../html/test-range.html";
import { getComponent } from "../util/component";

export const getTestRangeComponentAndObservable = () => {
  return { component: getComponent(testRangeSrc), observable: null };
};
