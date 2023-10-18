import React from 'react';
import Styles from './ActionButton.module.scss';

interface ButtonProps {
  text: String;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  classNames?: string;
}

const ActionButton = ({
  text,
  clickHandler,
  disabled,
  classNames,
}: ButtonProps) => {
  return (
    <button
      className={Styles.button + ` ${classNames ? classNames : ''}`}
      disabled={disabled}
      type="button"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default ActionButton;
