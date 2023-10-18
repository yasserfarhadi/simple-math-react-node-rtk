import React from 'react';
import ActionButton from './ActionButton';
import { useAppDispatch } from '../redux/hooks';
import {
  copyOperator,
  deleteOperatorById,
} from '../redux/features/operator-slice';

import Styles from './Header.module.scss';

interface HeaderProps {
  disabled: boolean;
}

const Header = ({ disabled }: HeaderProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.header}>
      <ActionButton
        disabled={disabled}
        text="Delete"
        clickHandler={(event) => {
          event.stopPropagation();
          dispatch(deleteOperatorById());
        }}
      />
      <ActionButton
        disabled={disabled}
        text="Copy"
        clickHandler={(event) => {
          event.stopPropagation();
          dispatch(copyOperator());
        }}
      />
    </div>
  );
};

export default React.memo(Header);
