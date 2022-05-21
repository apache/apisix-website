export const checkCssRule = (cssKey: string, cssValue: string): boolean => {
  if (!window?.CSS) {
    // jest jsdom haven't window.CSS api
    // please to see https://stackoverflow.com/questions/70734213/css-supports-is-not-defined-in-jest-test
    console.warn(`Your browser can't check css rule`);
    return false;
  }

  return CSS.supports(cssKey, cssValue);
};

// this function can't trigger function type narrowing
export const checkPrototype = (obj: any, type: string): boolean => {
  const isCurType = Object.prototype.toString.call(obj) === `[object ${type}]`;
  return isCurType;
};

export default {
  checkCssRule,
  checkPrototype,
};
