import React from 'react';
import ActionButton from './ActionButton';
import { useAppDispatch } from '../redux/hooks';
import { createNewOperator } from '../redux/features/operator-slice';
import Styles from './Sidebar.module.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  function clickHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    type: Operator['type']
  ) {
    event.stopPropagation();
    dispatch(createNewOperator(type));
  }

  return (
    <div className={Styles.sidebar}>
      <ActionButton
        text="Sum"
        clickHandler={(event) => clickHandler(event, 'SUM')}
      />
      <ActionButton
        text="Minus"
        clickHandler={(event) => clickHandler(event, 'MINUS')}
      />
      <ActionButton
        text="Divide"
        clickHandler={(event) => clickHandler(event, 'DIVIDE')}
      />
      <ActionButton
        text="Multiple"
        clickHandler={(event) => clickHandler(event, 'MULTIPLE')}
      />
    </div>
  );
};

export default React.memo(Sidebar);
