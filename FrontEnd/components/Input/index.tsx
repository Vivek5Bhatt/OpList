import React, { FunctionComponent } from "react";
import Form from "react-bootstrap/Form";
import styles from "../../styles/input.module.scss";

interface InputCrad {
  id?: any;
  class: string;
  onChange?: (e: any) => any;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComp?: string;
  value?: any;
  disabled?: boolean;
  maxLen?: number;
  minLen?: number;
  testId?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
}

const InputComponent: FunctionComponent<InputCrad> = (props) => {
  return (
    <>
      <Form.Control
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : "text_input"}
        className={`${props.class} ${styles.cstm_field}`}
        onChange={props.onChange}
        placeholder={props.placeholder}
        autoComplete={props.autoComp}
        value={props.value}
        disabled={props.disabled}
        maxLength={props.maxLen}
        minLength={props.minLen}
        data-testid={props.testId}
        readOnly={props.readOnly ? props.readOnly : false}
        autoFocus={props.autoFocus ? props.autoFocus : false}
      />
    </>
  );
};

export default InputComponent;
