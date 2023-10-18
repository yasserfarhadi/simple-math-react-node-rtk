import React from 'react';
import Input from './Input';
import ActionButton from './ActionButton';
import { useAppSelector } from '../redux/hooks';
import { operation } from '../utils';
import Styles from './Footer.module.scss';

const Footer = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [index, setIndex] = React.useState<number>(NaN);
  const operator = useAppSelector((state) => {
    if (index < state.operators.entries.length) {
      return state.operators.entries[index];
    }
  });
  const output =
    operator &&
    operation[operator.type](+operator.primaryInput, +operator.secondaryInput);

  function fetchHandler() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      setIndex(+value);
    }
  }

  return (
    <div className={Styles.footer}>
      <div className={Styles.form}>
        <Input id="search" label="Search" ref={inputRef} />
        <ActionButton
          text="Fetch"
          clickHandler={fetchHandler}
          classNames={Styles.btn}
        />
      </div>
      <div className={Styles.detail}>
        {!isNaN(index) && operator && (
          <div className={Styles.result}>
            <p>
              Index: <span className={Styles.index}>{index}</span>
            </p>
            <p>
              Inputs:{' '}
              <span
                className={Styles.inputs}
              >{`${operator.primaryInput}, ${operator.secondaryInput}`}</span>
            </p>
            <p>
              Operator output: <span className={Styles.output}>{output}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Footer);
