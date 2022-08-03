import React from "react";
import Form from "../../../components/Form/form";
import FormBuilder from "../../../components/Form/formBuilder";
import DynamicFormBuilder from "../../../components/Form/dynamicFormBuilder";
import { FieldArray } from "redux-form";
import styled from "styled-components";
interface IRegistrationForm {
  handleSubmit: (value: any) => void;
  initialValue: object;
  formContent: any[];
  formname: string;
  sectionTitle: string;
  dynamicForm?: boolean;
  otherInfo?: any;
  deleteHandler?: any;
  handleChange?: (value: any) => void;
  buttonComponent?: any;
}
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
  margin-left: 15px;
`;
const RegistrationForm = (props: IRegistrationForm) => {
  const {
    handleSubmit,
    initialValue,
    formContent,
    formname,
    sectionTitle,
    dynamicForm,
    handleChange,
    buttonComponent,
  } = props;
  return (
    <>
      <h4></h4>
      <section>
        <h3>{sectionTitle}</h3>
        {props.otherInfo && (
          <div className="row">
            {props.otherInfo.map((row: any) => (
              <div
                className="items"
                style={{
                  width: "35%",
                  marginLeft: "10px",
                  padding: "8px",
                  marginRight: "36px",
                  marginBottom: "2px",
                }}
              >
                {row}
                <A href={void 0} onClick={() => props.deleteHandler(row)}>
                  <i className="zmdi zmdi-delete"></i>
                </A>
              </div>
            ))}
          </div>
        )}
        <Form
          form={formname}
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          onChange={(values, dispatch, props, prevValues) => {
            //debugger; 
            if (props.form === 'step4') { //} && values.startTimeMon !== "00:00" && values.endTimeMon !== "00:00") {
              // let newValues : Partial<{startTimeMon : string, endTimeMon : string}> = values;
              let newValues : any = values;
              // let previousValues : Partial<{startTimeMon : string, endTimeMon : string}> = prevValues;
              let previousValues : any = prevValues;
              if (previousValues.hasOwnProperty('startTimeMon') && ((previousValues.startTimeMon !== newValues.startTimeMon || previousValues.endTimeMon !== newValues.endTimeMon) && newValues.startTimeMon !== "00:00" && newValues.endTimeMon !== "00:00")) {
                dispatch(props.change('startTimeTues', newValues.startTimeMon));
                dispatch(props.change('startTimeWed', newValues.startTimeMon));
                dispatch(props.change('startTimeThurs', newValues.startTimeMon));
                dispatch(props.change('startTimeFri', newValues.startTimeMon));
                // dispatch(props.change('startTimeSat', newValues.startTimeMon));
                dispatch(props.change('endTimeTues', newValues.endTimeMon));
                dispatch(props.change('endTimeWed', newValues.endTimeMon));
                dispatch(props.change('endTimeThurs', newValues.endTimeMon));
                dispatch(props.change('endTimeFri', newValues.endTimeMon));
                // dispatch(props.change('endTimeSat', newValues.endTimeMon));
              }
              if ((previousValues.startTimeMon !== "00:00" && previousValues.endTimeMon !== "00:00") && (newValues.startTimeMon === "00:00" || newValues.endTimeMon === "00:00")) {
                dispatch(props.change('startTimeMon', "00:00"));
                dispatch(props.change('endTimeMon', "00:00"));
              }
              if ((previousValues.startTimeTues !== "00:00" && previousValues.endTimeTues !== "00:00") && (newValues.startTimeTues === "00:00" || newValues.endTimeTues === "00:00")) {
                dispatch(props.change('startTimeTues', "00:00"));
                dispatch(props.change('endTimeTues', "00:00"));
              }
              if ((previousValues.startTimeWed !== "00:00" && previousValues.endTimeWed !== "00:00") && (newValues.startTimeWed === "00:00" || newValues.endTimeWed === "00:00")) {
                dispatch(props.change('startTimeWed', "00:00"));
                dispatch(props.change('endTimeWed', "00:00"));
              }
              if ((previousValues.startTimeThurs !== "00:00" && previousValues.endTimeThurs !== "00:00") && (newValues.startTimeThurs === "00:00" || newValues.endTimeThurs === "00:00")) {
                dispatch(props.change('startTimeThurs', "00:00"));
                dispatch(props.change('endTimeThurs', "00:00"));
              }
              if ((previousValues.startTimeFri !== "00:00" && previousValues.endTimeFri !== "00:00") && (newValues.startTimeFri === "00:00" || newValues.endTimeFri === "00:00")) {
                dispatch(props.change('startTimeFri', "00:00"));
                dispatch(props.change('endTimeFri', "00:00"));
              }
              if ((previousValues.startTimeSat !== "00:00" && previousValues.endTimeSat !== "00:00") && (newValues.startTimeSat === "00:00" || newValues.endTimeSat === "00:00")) {
                dispatch(props.change('startTimeSat', "00:00"));
                dispatch(props.change('endTimeSat', "00:00"));
              }
              if ((previousValues.startTimeSun !== "00:00" && previousValues.endTimeSun !== "00:00") && (newValues.startTimeSun === "00:00" || newValues.endTimeSun === "00:00")) {
                dispatch(props.change('startTimeSun', "00:00"));
                dispatch(props.change('endTimeSun', "00:00"));
              }
            }
          }}
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
            <FormBuilder formFild={formContent} />
          )}
          {buttonComponent ? buttonComponent : <></>}
        </Form>
      </section>
    </>
  );
};
export default RegistrationForm;
