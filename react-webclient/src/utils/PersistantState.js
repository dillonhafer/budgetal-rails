const ITEM = 'MORTGAGE_CALCULATOR_V1';
export const loadState = async => {
  try {
    const serializedState = localStorage.getItem(ITEM);
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(ITEM, serializedState);
  } catch (err) {
    // Ignore write errors for now
  }
};
