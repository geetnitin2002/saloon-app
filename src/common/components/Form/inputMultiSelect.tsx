import React, { useContext } from "react";
import { Field } from "redux-form";
import styled from "styled-components";
import Select from "react-select";
import ErrorUtils from "../Form/errorUtils";
import { ViewConsumer } from "../../modules/view/mangerView/managerViewContextApi";
const MultiSelctStyle = styled(Select)``;
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
const handleServiceChange = (value: any) => {};
export const Input = ({
  input,
  label,
  required,
  meta: { touched, error, warning },
  options,
  placeholder,
  defaultValue,
  handleServiceChange,
  disable,
}: {
  input: any;
  label: any;
  required: any;
  type: string;
  meta: { touched: any; error: any; warning: any };
  options: any;
  placeholder: any;
  defaultValue: any;
  handleServiceChange: any;
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
  >
    <MultiSelctStyle
      isMulti
      {...input}
      Searchable={true}
      getOptionLabel={(option: any) => option.label}
      getOptionValue={(option: any) => option.value}
      options={options}
      placeholder={placeholder}
      minLength={5}
      isClearable={false}
      pageSize={5}
      defaultValue={defaultValue}
      value={input.value}
      onChange={(value: any) => input.onChange(value)}
      onBlur={(value: any) => input.onBlur(input.value)}
      isDisabled={disable}
    />
  </TextField>
);
/*const isRequired = (props: any) => {
  return (
    props.validate &&
    props.validate.filter((row: any) => row == ErrorUtils.Required).length > 0
  );
};*/
            //at125    { {isRequired(this.props) && "*"} }
class MultiSelectField extends React.PureComponent<any> {
  // contextType = ViewContext;
  state = {
    selectValue: [],
  };
  change = (value: any) => {
    this.setState({ selectValue: value });
  };
  componentDidUpdate(prevPros: any) {
    if (
      this.props.defaultValue &&
      this.props.defaultValue !== prevPros.defaultValue
    ) {
      //  this.setState({ selectValue: this.props.defaultValue });
    }
  }
  render() {
    //   const dataOptions: any = this.contextType;
    // const options = dataOptions[this.props.name]
    //   ? dataOptions[this.props.name]
    //   : this.props.options;
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
              <Field
                {...this.props}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                validate={this.props.validate}
                component={Input}
                disable={
                  value[this.props.name] && this.props.useContextData
                    ? value[this.props.name] && value[this.props.name].disable
                      ? value[this.props.name].disable
                      : this.props.disable
                    : this.props.disable
                }
                handleServiceChange={this.change}
                options={
                  value[this.props.name] && this.props.useContextData
                    ? value[this.props.name] && value[this.props.name].options
                      ? value[this.props.name].options
                      : this.props.options
                    : this.props.options
                }
              />
            </div>
          );
        }}
      </ViewConsumer>
    );
  }
}
export default MultiSelectField;
