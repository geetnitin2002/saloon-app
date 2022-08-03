import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ErrorUtils from "../Form/errorUtils";
import "react-datepicker/dist/react-datepicker.css";
import { ViewConsumer } from "../../modules/view/mangerView/managerViewContextApi";
const DatePickerStyle = styled(DatePicker)``;
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
  selected,
  dateFormat,
  placeholder,
  meta: { touched, error, warning },
  isClearable,
  onChange,
  disable,
  minDate,
  showTimeSelect,
  showTimeSelectOnly,
  timeFormat,
}: {
  input: any;
  label: any;
  required: any;
  type: string;
  selected: any;
  dateFormat: any;
  placeholder: any;
  meta: { touched: any; error: any; warning: any };
  isClearable: any;
  onChange: any;
  disable: any;
  minDate: any;
  showTimeSelect: any;
  showTimeSelectOnly: any;
  timeFormat: any;
}) => (
  <TextField
    name={input.name}
    htmlFor={input.name}
    label={label}
    error={error}
    touched={touched}
    warning={warning}
    required={required}
  >
    <DatePickerStyle
      {...input}
      className="form-control"
      name={input.name}
      id={input.name}
      selected={selected}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      isClearable={isClearable}
      onChange={input.onChange}
      disabled={disable}
      minDate={minDate}
      showTimeSelect={showTimeSelect}
      showTimeSelectOnly={showTimeSelectOnly}
      timeFormat={timeFormat}
      def
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
class InputDateField extends React.Component<any> {
  state = {
    startDate: "",
  };
  handleChange = (date: any) => {
    this.setState({
      startDate: date,
    });
  };
  // at 124 removed {isRequired(this.props) && "*"} for removing madatory field for date control
  render() {
    return (
      <ViewConsumer>
        {(value: any) => {
          return (
            <div
              className={
                this.props.FormClass ? this.props.FormClass : "form-col"
              }
              id={this.props.name}
            >
              <label htmlFor="">
                {this.props.label} 
              </label>
              <div
                className={
                  this.props.formHolder ? this.props.formHolder : "form-holder"
                }
              >
                <i className={"zmdi zmdi-calendar"} />
                <Field
                  {...this.props}
                  type={this.props.type}
                  name={this.props.name}
                  value={this.props.value}
                  placeholder={this.props.placeholder}
                  validate={this.props.validate}
                  component={Input}
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  disable={
                    value[this.props.name] && this.props.useContextData
                      ? value[this.props.name] && value[this.props.name].disable
                        ? value[this.props.name].disable
                        : this.props.disable
                      : this.props.disable
                  }
                  showTimeSelect={this.props.showTimeSelect}
                  showTimeSelectOnly={this.props.showTimeSelectOnly}
                />
              </div>
            </div>
          );
        }}
      </ViewConsumer>
    );
  }
}

export default InputDateField;
