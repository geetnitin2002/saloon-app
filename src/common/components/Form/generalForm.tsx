import React from "react";
import Form from "./form";
import FormBuilder from "./formBuilder";
import DynamicFormBuilder from "./dynamicFormBuilder";
import { FieldArray } from "redux-form";
interface IRegistrationForm {
  handleSubmit: (value: any) => void;
  initialValue: object;
  formContent: any[];
  formname: string;
  dynamicForm?: boolean;
  formValue?: any;
  handleOnChange?: any;
  buttonComponent?: any;
}
const GenernalForm = (props: IRegistrationForm) => {
  // console.log(props.formValue);
  const {
    handleSubmit,
    initialValue,
    formContent,
    formname,
    dynamicForm,
    handleOnChange,
    buttonComponent,
  } = props;
  return (
    <>
      <Form
        form={formname}
        initialValues={initialValue}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        onChange={handleOnChange && handleOnChange}
      >
        {!!dynamicForm ? (
          <FieldArray
            name="members"
            component={DynamicFormBuilder}
            formFild={formContent}
            addButtonText={"Add"}
            removeButtonText={"Remove"}
          />
        ) : (
          <FormBuilder formFild={formContent} initialValue={initialValue} />
        )}
        {buttonComponent ? buttonComponent : <></>}
      </Form>
    </>
  );
};
export default GenernalForm;
