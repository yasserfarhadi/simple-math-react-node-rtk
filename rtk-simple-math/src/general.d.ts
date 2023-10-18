type Operator = {
  id: string;
  type: 'SUM' | 'MINUS' | 'DIVIDE' | 'MULTIPLE';
  primaryInput: number;
  secondaryInput: number;
};

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;
