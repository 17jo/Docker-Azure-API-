export const napravi = (naziv, tata, className, innerHTML) => {
  let el = document.createElement(naziv);

  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  tata.appendChild(el);
  return el;
};

export const div = (tata, className, innerHTML) =>
  napravi("div", tata, className, innerHTML);
export const h1 = (tata, className, innerHTML) =>
  napravi("h1", tata, className, innerHTML);
export const p = (tata, className, innerHTML) =>
  napravi("p", tata, className, innerHTML);
export const input = (tata, className, innerHTML) =>
  napravi("input", tata, className, innerHTML);
export const radioButton = (tata, className, innerHTML, value) => {
  let el = input(tata);
  el.type = "radio";
  el.name = "radioButton";
  el.value = value;
  return el;
};

export const label = (tata, className, innerHTML) =>
  napravi("label", tata, className, innerHTML);
export const button = (tata, className, innerHTML) =>
  napravi("button", tata, className, innerHTML);

export const link = (tata, className, innerHTML) =>
  napravi("a", tata, className, innerHTML);
