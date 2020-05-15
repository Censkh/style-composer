export const isNative = () => {
// @ts-ignore
  return typeof (window && window.addEventListener) === "undefined";
};

export const createStyleSheet = (name: string, content: string) => {
  if (!isNative()) {
    // @ts-ignore
    const document = (window as any).document;
    const style = document.createElement("style");
    style.setAttribute("data-name", name);
    style.innerHTML = content;
    document.head.appendChild(style);
  }
};

export const nextFrame = (func: Function) => {
  setTimeout(func, 1000);
};