export const getDomStyle = (dom: HTMLElement, attr: string): string => {
  const currentStyle = getComputedStyle(dom);
  return currentStyle[attr];
};

export const styleUnit2Number = (value: string | number = 0): number => {
  if (typeof value === 'number') {
    return value;
  }

  const strValue = value;
  const isNumber = /[0-9]+/;
  if (!isNumber.test(strValue[0])) {
    const [first = 0] = strValue.match(isNumber) || [];
    return Number(first);
  }

  if (value.includes('%')) {
    return parseFloat(value) / 100;
  }

  return parseFloat(value);
};

export default {
  getDomStyle,
  styleUnit2Number,
};
