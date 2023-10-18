import React from 'react';
import Styles from './Input.module.scss';

interface InputProps {
  id?: string;
  value?: number;
  label: string;
  name?: 'primaryInput' | 'secondaryInput';
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
}

const Input = (
  { id, value, label, name = 'primaryInput', changeHandler }: InputProps,
  ref: any
) => {
  return (
    <div className={Styles.formControl}>
      <label className={Styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={Styles.input}
        type="number"
        // min={value}
        value={value}
        onChange={changeHandler}
        name={name}
        ref={ref}
      />
    </div>
  );
};

export default React.memo(React.forwardRef(Input));
