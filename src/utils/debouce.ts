/* eslint-disable */
const debounce = (callback: any, wait: number) => {
  let timeoutId: number | undefined;
  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default debounce;
