const debounce = (callback: (value: any) => any, wait: number) => {
  let timeoutId: number | undefined;
  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default debounce;
