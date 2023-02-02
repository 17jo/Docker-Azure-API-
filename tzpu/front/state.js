let state = {
  username: undefined,
  zadatak: undefined,
  tip: undefined,
};

export const setState = (newState) => {
  state = { ...state, ...newState };
  localStorage.setItem("state", JSON.stringify(state));
};

export const getState = () =>
  JSON.parse(localStorage.getItem("state")) || state;
