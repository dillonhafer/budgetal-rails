import { MORTGAGE_CALCULATOR_UPDATED } from '../constants/ActionTypes';

export function updateState(state) {
  return {
    type: MORTGAGE_CALCULATOR_UPDATED,
    state,
  };
}
