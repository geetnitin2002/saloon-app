import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";
import ErrorUtils from "../Form/errorUtils";

const InputStyle = styled.input``;

const TextAreaStyle = {
  'height': '100px'
}

const Error = styled.div`
  color: #ff0000;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  min-height: 14px;
`;
const TextField = (props: any) => {
  const { hideValidation, touched, error, name } = props;
  const checkValidation = (
    hideValidation: boolean,
    touched: string,
    error: any,
    name: string
  ) => {
    if (hideValidation) {
      return " ";
    }
    return touched && error ? <Error id={`${name}Err`}>{error}</Error> : null;
  };
  return (
    <>
      {props.children}
      {checkValidation(hideValidation, touched, error, name)}
    </>
  );
};
export const Input = ({
  input,
  label,
  required,
  type,
  meta: { touched, error, warning },
  disable,
}: {
  input: any;
  label: any;
  required: any;
  type: string;
  meta: { touched: any; error: any; warning: any };
  disable: any;
}) => (
  <TextField
    name={input.name}
    htmlFor={input.name}
    label={label}
    error={error}
    touched={touched}
    warning={warning}
    required={required}
    type={type}
  >
    <InputStyle
      {...input}
      className={type !== "checkbox" ? "form-control" : ""}
      name={input.name}
      id={input.name}
      type={type}
      disabled={disable}
    />
  </TextField>
);
//Hidden in order to remove mandatory from Date Picker
/*const isRequired = (props: any) => {
  return (
    props.validate &&
    props.validate.filter((row: any) => row == ErrorUtils.Required).length > 0
  );
};*/
        {/* {isRequired(props) && "*"} */}
const InputField = (props: any) => {
  return (
    <div
      className={props.FormClass ? props.FormClass : "form-col"}
      style={props.style}
      id={props.name}
    >
      <label htmlFor="">
        {props.label} 
      </label>
      <div className={props.formHolder ? props.formHolder : "form-holder"}>
        {props.iClass && (
          <i className={props.iClass ? props.iClass : "zmdi zmdi-email"} />
        )}
        {
        props.type === "textarea" &&
          <Field
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          validate={props.validate}
          disable={props.disable}
          //rows={props.value}
          component={"textarea"}
          class={props.type !== "checkbox" ? "form-control" : ""}
          style={TextAreaStyle}
        />}
        {props.type !== "textarea" &&
        <Field
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          validate={props.validate}
          disable={props.disable}
          //rows={props.value}
          component={Input}
        />
        }
      </div>
    </div>
  );
};

export default InputField;
