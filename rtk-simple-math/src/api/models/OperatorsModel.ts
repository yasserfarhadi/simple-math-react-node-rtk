export interface GetAllOperators {
  data: Operator[];
}

export interface CreateOperator {
  message: string;
  data: {
    data: Operator;
  };
}

export interface DeleteOperator {
  message: string;
  data: RequireOnly<Operator, 'id'>;
}

export interface EditOperator {
  message: string;
  data: {
    data: Operator;
  };
}
