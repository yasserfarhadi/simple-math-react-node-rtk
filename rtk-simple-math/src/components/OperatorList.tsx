import React from 'react';
import Operator from './Operator';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { operation } from '../utils';
import { setCurrentOperator } from '../redux/features/operator-slice';
import Styles from './OperatorList.module.scss';

const OperatorList = () => {
  const dispatch = useAppDispatch();
  const currentOperatorHandler = React.useCallback(
    (index: number | null) => dispatch(setCurrentOperator(index)),
    [dispatch]
  );

  const operatorList = useAppSelector((state) => state.operators.entries);
  const currentOperator = useAppSelector(
    (state) => state.operators.currentIndex
  );
  return (
    <div className={Styles.list}>
      {((list: React.ReactNode[]) => {
        let summary = 0;
        operatorList.forEach((operator, index) => {
          list.push(
            <Operator
              id={operator.id}
              summary={summary}
              primaryValue={operator.primaryInput}
              secondaryValue={operator.secondaryInput}
              type={operator.type}
              key={operator.id}
              setCurrentOperator={currentOperatorHandler}
              currentOperator={currentOperator === index}
              index={index}
            />
          );
          summary += operation[operator.type](
            +operator.primaryInput,
            +operator.secondaryInput
          );
        });
        return list;
      })([])}
    </div>
  );
};

export default OperatorList;
