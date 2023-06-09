export const initialState = {
  operation: [],
  currentValue: "0",
  operator: null,
  previousValue: null,
};

export const handleNumber = (value, state) => {
  if (state.currentValue === "0") {
    return {
      operation: [...state.operation, value],
      currentValue: `${value}`,
    };
  }

  return {
    operation: [...state.operation, value],
    currentValue: `${state.currentValue}${value}`,
  };
};

export const handleOperator = () => {};

export const handleEqual = (state) => {
  const { operation, currentValue, operator, previousValue } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null,
  };
  let solution = 0;

  if (operator === "÷") {
    return {
      currentValue: previous / current,
      ...resetState,
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState,
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState,
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState,
    };
  }

  return state;
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      return {
        operation: [...state.operation, value],
        currentValue: "0",
        operator: value,
        previousValue: state.currentValue,
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    default:
      return state;
  }
};

export default calculator;
