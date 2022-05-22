export const getDomStyle = (dom: HTMLElement, attr: string): string => {
  const currentStyle = getComputedStyle(dom);
  return currentStyle[attr];
};

export default {
  getDomStyle,
};
