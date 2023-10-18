import React from 'react';
import Input from './Input';
import { capitalize, operation } from '../utils';
import { useAppDispatch } from '../redux/hooks';
import { changeOperator } from '../redux/features/operator-slice';
import ActionButton from './ActionButton';
import Styles from './Operator.module.scss';

interface OperatorProps {
  id: string;
  summary: number;
  primaryValue: number;
  secondaryValue: number;
  type: Operator['type'];
  setCurrentOperator: (index: number | null) => void;
  currentOperator: boolean;
  index: number;
}

const Operator = ({
  id,
  summary,
  primaryValue,
  secondaryValue,
  type,
  setCurrentOperator,
  currentOperator,
  index,
}: OperatorProps) => {
  const dispatch = useAppDispatch();
  const [inputValues, setInputValues] = React.useState({
    primaryInput: primaryValue,
    secondaryInput: secondaryValue,
  });

  const isDirty =
    +inputValues.primaryInput !== +primaryValue ||
    +inputValues.secondaryInput !== +secondaryValue;

  const output = operation[type](
    +inputValues.primaryInput,
    +inputValues.secondaryInput
  );
  const primaryInputRef = React.useRef<HTMLInputElement>();
  const secondaryInputRef = React.useRef<HTMLInputElement>();

  // React.useEffect(() => {
  //   if (currentOperator && primaryInputRef.current) {
  //     primaryInputRef.current.focus();
  //   }
  // }, [currentOperator]);

  const changeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const name = event.target.name;
      setInputValues((prev) => {
        return { ...prev, [name]: event.target.value };
      });
    },
    []
  );

  function submitHandler() {
    dispatch(
      changeOperator({
        id,
        primaryInput: +inputValues.primaryInput,
        secondaryInput: +inputValues.secondaryInput,
      })
    );
  }

  function clickHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (currentOperator) return;
    setCurrentOperator(index);
    if (
      secondaryInputRef.current &&
      secondaryInputRef.current !== event.target
    ) {
      if (primaryInputRef.current) {
        primaryInputRef.current.focus();
      }
    }
  }

  function resetHandler() {
    setInputValues({
      primaryInput: primaryValue,
      secondaryInput: secondaryValue,
    });
  }

  return (
    <div
      onClick={clickHandler}
      className={`${Styles.operator} ${currentOperator ? Styles.active : ''}`}
    >
      <div className={Styles.mainContent}>
        <div className={Styles.leftSide}>
          <h3 className={Styles.title}>{capitalize(type)}</h3>
          <div className={Styles.inputs}>
            <Input
              changeHandler={changeHandler}
              label="First Number"
              id={'primary-' + id}
              value={inputValues.primaryInput}
              name="primaryInput"
              ref={primaryInputRef}
            />
            <Input
              changeHandler={changeHandler}
              label="Second Number"
              id={'secondary-' + id}
              value={inputValues.secondaryInput}
              name="secondaryInput"
              ref={secondaryInputRef}
            />
          </div>
          <div className={Styles.summaryWrapper}>
            Summary:<span className={Styles.summary}>{summary + output}</span>
          </div>
        </div>
        <div className={Styles.outputWrapper}>
          Output:<span className={Styles.output}>{output}</span>
        </div>
      </div>
      {isDirty && (
        <div className={Styles.changeCTA}>
          <div className={Styles.message}>Document modified.</div>
          <div className={Styles.cta}>
            <ActionButton
              text="Cancel"
              clickHandler={resetHandler}
              classNames={Styles.btn}
            />
            <ActionButton
              text="Submit"
              clickHandler={submitHandler}
              classNames={Styles.btn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Operator);
