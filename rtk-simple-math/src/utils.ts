type OperationType = {
  [key in Operator['type']]: (input1: number, input2: number) => number;
};

export const operation: OperationType = {
  SUM: (number1: number, number2: number) => number1 + number2,
  MINUS: (number1: number, number2: number) => number1 - number2,
  DIVIDE: (number1: number, number2: number) => number1 / number2,
  MULTIPLE: (number1: number, number2: number) => number1 * number2,
};

export const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};
