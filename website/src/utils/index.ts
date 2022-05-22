export const checkCssRule = (cssKey: string, cssValue: string): boolean => {
  if (!window?.CSS) {
    // jest jsdom haven't window.CSS api
    // please to see https://stackoverflow.com/questions/70734213/css-supports-is-not-defined-in-jest-test
    console.warn(`Your browser can't check css rule`);
    return false;
  }

  return CSS.supports(cssKey, cssValue);
};

export const getDomStyle = (dom: HTMLElement, attr: string): string => {
  const currentStyle = getComputedStyle(dom);
  return currentStyle[attr];
};

export default {
  getDomStyle,
  checkCssRule,
};
