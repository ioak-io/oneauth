/* eslint-disable import/prefer-default-export */
export const findStepSize = (
  datasets: any[],
  type: string,
  stacked: boolean | undefined
) => {
  let valueList: number[] = [];
  let valueListNegative: number[] = [];
  if (stacked) {
    datasets.forEach((item: { data: any[] }) => {
      const localValueList =
        type === 'category' ? item.data : item.data.map((i) => i.y);
      if (valueList.length > localValueList.length) {
        valueList = valueList.map(
          (val, index) =>
            val +
            (localValueList[index] && localValueList[index] > 0
              ? localValueList[index]
              : 0)
        );
        valueListNegative = valueListNegative.map(
          (val, index) =>
            val +
            (localValueList[index] && localValueList[index] < 0
              ? localValueList[index]
              : 0)
        );
      } else {
        valueList = localValueList.map(
          (val, index) => (val && val > 0 ? val : 0) + (valueList[index] || 0)
        );
        valueListNegative = localValueList.map(
          (val, index) =>
            (val && val < 0 ? val : 0) + (valueListNegative[index] || 0)
        );
      }
    });
  } else {
    datasets.forEach((item) => {
      valueList = [
        ...valueList,
        ...(type === 'category'
          ? item.data
          : item.data.map((i: { y: any }) => i.y)),
      ];
    });
  }
  let minValue = Math.min(...valueList, ...valueListNegative);
  const maxValue = Math.max(...valueList, ...valueListNegative);
  if (minValue > 0) {
    minValue = 0;
  }
  return Math.ceil((maxValue - minValue) / 4);
};
