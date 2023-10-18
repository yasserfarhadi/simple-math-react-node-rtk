import { Router } from 'express';
import {
  createOperator,
  deleteOperator,
  editOperator,
  getOperators,
  copyOperator,
} from '../controllers/operators.js';

const router = Router();

router.get('/', getOperators);

router.post('/create', createOperator);

router.delete('/delete/:id', deleteOperator);

router.put('/edit', editOperator);

router.post('/copy', copyOperator);

export default router;
