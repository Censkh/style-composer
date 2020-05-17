// @ts-ignore
const document = (window as any).document;

export const isNative = () => {
// @ts-ignore
  return typeof (window && window.addEventListener) === "undefined";
};

export const setStyleSheet = (name: string, content: string) => {
  if (!isNative()) {
    const id = `stylesheet-${name}`;
    let style: any = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = `stylesheet-${name}`;
      style.setAttribute("data-name", name);
      document.head.appendChild(style);
    }
    style.innerHTML = content;
  }
};

export const nextFrame = (func: Function) => {
  setTimeout(func, 1000);
};