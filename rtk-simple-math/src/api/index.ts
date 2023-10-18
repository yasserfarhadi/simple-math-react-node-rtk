import axios from 'axios';
import type {
  GetAllOperators,
  CreateOperator,
  DeleteOperator,
  EditOperator,
} from './models/OperatorsModel';

const HTTPRequest = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function getAllOperators() {
  const response = await HTTPRequest.get<GetAllOperators>('/operators');
  return response.data;
}

export async function createOperatorBlock(operator: Pick<Operator, 'type'>) {
  const response = await HTTPRequest.post<Operator, CreateOperator>(
    '/operators/create',
    operator
  );
  return response;
}

export async function deleteSingleOperator(id: Operator['id']) {
  const response = await HTTPRequest.delete<DeleteOperator>(
    '/operators/delete/' + id
  );
  return response;
}

export async function editOperator(operator: Omit<Operator, 'type'>) {
  const response = await HTTPRequest.put<Omit<Operator, 'type'>, EditOperator>(
    '/operators/edit',
    operator
  );
  return response;
}

export async function copyOperatorBlockById(id: string) {
  const response = await HTTPRequest.post<Pick<Operator, 'id'>, CreateOperator>(
    '/operators/copy',
    { id }
  );
  return response;
}
