import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ModalComponent from "../../../../components/modelComponent";
import List from "../../../../components/List/list";
import AddServiceStaffForm from "../../../../components/Form/generalForm";
import AddStaffUtil, { RegistrationFormStep3 } from "./addStaffUtils";
import { submit, formValueSelector } from "redux-form";
import {
  addBusinessStaff,
  deleteBusinessStaff,
  getBusinessStaff,
  approveBusiness,
} from "../../action/addBusinessAction";
import NoResultFound from "../../../../components/List/noResultFound";
import AlertSuccess from "../../../../components/alertSuccessComponent";
import Errorhandler from "../../../../components/errorHandlerComponent";
import lodash from "lodash";
import { staffWorkingHourSlotsRange } from "../../../../api/businessApi";
import searchForm, {
    CommentBox1,
  } from "./../../../../modules/view/mangerView/managerViewUtils";
  import GenernalForm from "./../../../../components/Form/generalForm";  
import { loadingMessageCSS } from "react-select/src/components/Menu";
const defaultValueHours = {
  startTimeMon: "08:00",
  startTimeTues: "08:00",
  startTimeWed: "08:00",
  startTimeThurs: "08:00",
  startTimeFri: "08:00",
  startTimeSat: "08:00",
  startTimeSun: "00:00",
  endTimeMon: "17:00",
  endTimeWed: "17:00",
  endTimeThurs: "17:00",
  endTimeFri: "17:00",
  endTimeSat: "17:00",
  endTimeSun: "00:00",
  endTimeTues: "17:00",
};

const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
`;
const LoaderBox = styled.div`
  top: 46px;
  left: 165px;
  margin: auto;
`;
const ButtonWraspper = styled.div`
  margin: 16px;
`;
class AddStaffContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: this.props.step,
      modelShow: false,
      modalShow: null,
      //error: null,
      listTemplates: {
      thead: ["Name", "Role"],
      tbody: ["firstname", "empRole"],
      actionItems: {
        edit: true,
        delete: true,
            },
          },
          userRole: {
            role: "OWNER",
          },
      loader: false,
      success: null,
      error: null,
      actionType: "add",
      editData: null,
      workingHoursForm: RegistrationFormStep3,
     };
  }
  /*state = {
    step: this.props.step,
    modelShow: false,
    listTemplates: {
      thead: ["Name", "Role"],
      tbody: ["firstname", "empRole"],
      actionItems: {
        edit: true,
        delete: true,
      },
    },
    userRole: {
      role: "OWNER",
    },
    loader: false,
    success: null,
    error: null,
    actionType: "add",
    editData: null,
    workingHoursForm: RegistrationFormStep3,
  };*/

  getStartDefaultTime = (info: any) => {
    return info && info.length > 0 ? info[0] : "00:00";
  };
  getEndDefaultTime = (info: any) => {
    return info && info.length > 0 ? info[info.length - 1] : "00:00";
  };
  componentDidMount() {
    staffWorkingHourSlotsRange(this.props.businessId).then((res: any) => {
      if (!res.error && !res.errors) {
        //console.log(res);
        // let rest: any = {};
        const form: any = this.state.workingHoursForm;
        for (let data in res.data) {
          let rest = [{ label: "Not Working", value: "00:00" }];
          let info: any = res.data[data] || [];
          for (let row of info) {
            rest.push({
              label: row,
              value: row,
            });
          }
          if (data === "mondaySlots") {
            defaultValueHours.startTimeMon = this.getStartDefaultTime(info);
            defaultValueHours.endTimeMon = this.getEndDefaultTime(info);
            form[0].field[0].props.options = rest;
            form[0].field[1].props.options = rest;
          } else if (data === "tuesdaySlots") {
            defaultValueHours.startTimeTues = this.getStartDefaultTime(info);
            defaultValueHours.endTimeTues = this.getEndDefaultTime(info);
            form[1].field[0].props.options = rest;
            form[1].field[1].props.options = rest;
          } else if (data === "wednesdaySlots") {
            defaultValueHours.startTimeWed = this.getStartDefaultTime(info);
            defaultValueHours.endTimeWed = this.getEndDefaultTime(info);
            form[2].field[0].props.options = rest;
            form[2].field[1].props.options = rest;
          } else if (data === "thursdaySlots") {
            defaultValueHours.startTimeThurs = this.getStartDefaultTime(info);
            defaultValueHours.endTimeThurs = this.getEndDefaultTime(info);
            form[3].field[0].props.options = rest;
            form[3].field[1].props.options = rest;
          } else if (data === "fridaySlots") {
            defaultValueHours.startTimeFri = this.getStartDefaultTime(info);
            defaultValueHours.endTimeFri = this.getEndDefaultTime(info);
            form[4].field[0].props.options = rest;
            form[4].field[1].props.options = rest;
          } else if (data === "saturdaySlots") {
            defaultValueHours.startTimeSat = this.getStartDefaultTime(info);
            defaultValueHours.endTimeSat = this.getEndDefaultTime(info);
            form[5].field[0].props.options = rest;
            form[5].field[1].props.options = rest;
          } else if (data === "sundaySlots") {
            defaultValueHours.startTimeSun = this.getStartDefaultTime(info);
            defaultValueHours.endTimeSun = this.getEndDefaultTime(info);
            form[6].field[0].props.options = rest;
            form[6].field[1].props.options = rest;
          }
        }
        this.setState({ workingHoursForm: form });
        //   this.setState({
        // //    workingHours: { ...this.state.workingHours, ...rest },
        //   });
        // console.log(this.state.workingHours);
      }
    });
    if (localStorage.getItem("userDetail")) {
      const userDetails: any = localStorage.getItem("userDetail");
      console.log(JSON.parse(userDetails));
      this.setState({ userRole: JSON.parse(userDetails) });
    }

    this.props.getBusinessStaff(this.props.businessId);
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.approveRes &&
      !this.props.approveRes.errors &&
      this.props.approveRes.responseType === "success" &&
      prevProps.approveRes !== this.props.approveRes
    ) {
      this.setState({
        success: this.props.approveRes["success"][0]["message"],
        userRole: null,
        loader: false,
      });
    }
    if (
      this.props.addBusinessResponse &&
      !this.props.addBusinessResponse.errors &&
      this.props.addBusinessResponse.responseType === "success" &&
      prevProps.addBusinessResponse !== this.props.addBusinessResponse
    ) {
      this.setState({
        success: this.props.addBusinessResponse["success"][0]["message"],
        loader: false,
      });
      this.handleClose();
      this.props.getBusinessStaff(this.props.businessId);
    }
    if (
      this.props.approveRes &&
      (this.props.approveRes.errors ||
        this.props.approveRes.responseType === "errors") &&
      prevProps.approveRes !== this.props.approveRes
    ) {
      this.setState({
        error: this.props.approveRes["errors"],
        loader: false,
      });
    }
    /*if (
      this.props.deleteStaffRes &&
      !this.props.deleteStaffRes.errors &&
      prevProps.deleteStaffRes !== this.props.deleteStaffRes
    ) */ {
      this.props.getBusinessStaff(this.props.businessId);
    }
  }
  editHandler = (row: any) => {
    this.setState({
      modelShow: true,
      actionType: "edit",
      editData: this.editConverter(row),
    });
  };
  editConverter = (row: any) => {
    return {
      startTimeMon: row.monStartTime,
      startTimeTues: row.tuesStartTime,
      startTimeWed: row.wedStartTime,
      startTimeThurs: row.thursStartTime,
      startTimeFri: row.friStartTime,
      startTimeSat: row.satStartTime,
      startTimeSun: row.sunStartTime,
      endTimeMon: row.monEndTime,
      endTimeWed: row.wedEndTime,
      endTimeThurs: row.thursEndTime,
      endTimeFri: row.friEndTime,
      endTimeSat: row.satEndTime,
      endTimeSun: row.sunEndTime,
      endTimeTues: row.tuesEndTime,
      staffRole: row.empRole,
      firstName: row.lastname.split(" ")[0],
      lastName: row.lastname.split(" ")[1],
      email: row.emailId,
      phone: row.phone,
      serviceSkills:
        row.services && this.getDefaultSkills(row.services.split(";")),
    };
  };
  deleteHandler = (row: any) => {
    this.props.deleteBusinessStaff(this.props.businessId, {
      staffUserId: row.userId,
      userRole: "OWNER",
    });
  };

    deleteStaffs = (value: any) => {
        this.setState({
          success: null,
          deleteStaffData: value,
          modalShow: true,
        });
        console.log(value)
        console.log(value.userId)
      };
      handleCancelSubmit = (row: any) => {
        this.handleModelClose();
        console.log(this.state.deleteStaffData.userId);
        this.props.deleteBusinessStaff(this.props.businessId, {
          staffUserId: this.state.deleteStaffData.userId,
          userRole: "OWNER",
        });
        this.setState({ error: null, deleteStaffData: null });
        this.setState({});
      };
      handleCancelModelClose = () => {
        this.setState({ error: null, deleteStaffData: null });
        //console.log();
      };
      formCancelSubmit = () => {
        this.handleModelClose();
      };


  handleModelShow = () => {
    this.setState({ modelShow: true, actionType: "add", editData: null });
  };
  handleClose = () => {
    this.setState({ modelShow: false, actionType: "add", editData: null });
  };
  handleSubmit = () => {
    this.setState({ error: null });
    this.props.submitForm("addStaff");
  };
  replaceValue = (value: any) => {
    return value.replace(":", "");
  };
  getDefaultSkills = (value: any) => {
    if (value) {
      const data: any = [];
      value.forEach((element: any) => {
        if (element) {
          data.push({ value: element, label: element });
        }
      });
      return data;
    } else {
      return null;
    }
  };
  getSkills = (value: any) => {
    if (value) {
      const data: any = [];
      value.forEach((element: any) => {
        data.push(element.label);
      });
      return data;
    } else {
      return null;
    }
  };
  handleFormSubmit = (value: any) => {
    // const data = lodash.cloneDeep(value);
    value.serviceSkills = this.getSkills(value.serviceSkills);
    let error = 0;
    if (
      this.replaceValue(value.endTimeMon) <
      this.replaceValue(value.startTimeMon)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Monday" });
      error++;
    } else if (
      this.replaceValue(value.endTimeTues) <
      this.replaceValue(value.startTimeTues)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Tuesday" });
      error++;
    } else if (
      this.replaceValue(value.endTimeWed) <
      this.replaceValue(value.startTimeWed)
    ) {
      this.setState({
        error: "Please Correct The Working Hours For Wednesday",
      });
      error++;
    } else if (
      this.replaceValue(value.endTimeThurs) <
      this.replaceValue(value.startTimeThurs)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Thursday" });
      error++;
    } else if (
      this.replaceValue(value.endTimeFri) <
      this.replaceValue(value.startTimeFri)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Friday" });
      error++;
    } else if (
      this.replaceValue(value.endTimeSat) <
      this.replaceValue(value.startTimeSat)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Saturday" });
      error++;
    } else if (
      this.replaceValue(value.endTimeSun) <
      this.replaceValue(value.startTimeSun)
    ) {
      this.setState({ error: "Please Correct The Working Hours For Sunday" });
      error++;
    }
    if (error === 0) {
      this.props.addBusinessStaff(this.props.businessId, {
        ...value,
        userRole: "OWNER",
      });
    }
  };
  handleChange = (values: any, dispatch: any, props: any, prevValues: any) => {
    //if (props.form === 'step4') { //} && values.startTimeMon !== "00:00" && values.endTimeMon !== "00:00") {
      // let newValues : Partial<{startTimeMon : string, endTimeMon : string}> = values;
      let newValues : any = values;
      // let previousValues : Partial<{startTimeMon : string, endTimeMon : string}> = prevValues;
      let previousValues : any = prevValues;
      if ((previousValues.startTimeMon !== newValues.startTimeMon || previousValues.endTimeMon !== newValues.endTimeMon) && newValues.startTimeMon !== "00:00" && newValues.endTimeMon !== "00:00") {
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
    //}
  }
  handleApprove = () => {
    this.setState({ loader: true });
    const request = {
      userRole: this.state.userRole && this.state.userRole.role,
    }
    this.props.approveBusiness(this.props.businessId, request);

    this.props.approveBusiness(this.props.businessId, request);
    setTimeout(() => {
      window.location.assign('/reviewer'); 
    }, 20000);

    // .then((res: any) => {
    //    if (!res.error && !res.errors) {
    //     this.redirectLink("/reviewer");
    //    } else {
    //      this.setState({ error: res.error || res.errors });
    //    }
    //  })
    //  .catch((error: any) => {
    //    this.setState({ error });
    //  });
    //this.redirectReviewer();
  };
  redirectReviewer = () => {
    window.location.assign('/reviewer'); 
  }
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  closeTicket = () => {
    this.setState({ success: null });

    // if (this.state.userRole && this.state.userRole.role === "REVIEWER")  {
    //   alert(this.state.userRole.role);
    //   window.location.assign('/reviewer'); 
    // }
    // else
    // this.setState({ success: null });

  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  isTicketBased = () => {
    const isTicket: any = this.props.serviceList.filter(
      (element: any) => element.ifTicketBasedService === "N"
    );
    return isTicket.length > 0;
  };
  getServiceListOptions = () => {
    const data: any = [];
    (this.props.serviceList || []) &&
      this.props.serviceList.forEach((element: any) => {
        data.push({ label: element.name, value: element.name });
      });
    return data;
  };
  render() {
    const staffForm: any = AddStaffUtil;
    staffForm[2].field[1].props.options = this.getServiceListOptions();
    let form: any = lodash.cloneDeep([
      ...staffForm,
      ...this.state.workingHoursForm,
    ]);
    // const { serviceSkills } = this.props;
    form[1].field[0].props.disable =
      this.state.actionType === "add" ? false : true;
    return (
      <>
        <h3 className="stitle">Setup Staff</h3>
        {this.state.success && (
          <AlertSuccess
            messages={this.state.success}
            close={this.closeTicket}
          />
        )}
        <List
          listTemplates={this.state.listTemplates}
          listData={this.props.staffList}
          editHandler={
            //this.props.status !== "APPROVED" ? this.editHandler : null
            this.props.status !== null ? this.editHandler : null
          }
          deleteHandler={
            //this.props.status !== "APPROVED" &&
            this.props.status !== null &&
            this.props.staffList &&
            this.props.staffList.length > 1
              //? this.deleteHandler
              ? this.deleteStaffs
              : null
          }
        />
        {/* <NoResultFound list={this.props.staffList} /> */}
        <div className="row">
          { //this.props.status !== "APPROVED" && (
            <ButtonWraspper>
              <a
                href={void 0}
                onClick={this.handleModelShow}
                className="abtn"
                style={{
                  width: "152px",
                  borderRadius: "4px",
                }}
              >
                Add Staff
              </a>
            </ButtonWraspper>
          }
          {this.state.userRole &&
            this.state.userRole.role === "REVIEWER" &&
            this.props.status &&
            this.props.status !== "APPROVED" &&
            this.props.edit && (
              <ButtonWraspper>
                <a
                  href={void 0}
                  onClick={this.handleApprove}
                  className="abtn"
                  style={{
                    width: "152px",
                    borderRadius: "4px",
                  }}
                >
                  Approve
                </a>
              </ButtonWraspper>
            )}
        </div>
        <Hr />


      {this.state.deleteStaffData && !this.state.error && (
        <ModalComponent
          title={"Delete Staff"}
          showModel={this.state.modalShow}
          handleSubmit={this.handleCancelSubmit}
          handleClose={this.handleCancelModelClose}
          isErrorHandler={false}
        >
          {" "}
          <GenernalForm
            initialValue={{}}
            handleSubmit={this.formCancelSubmit}
            handleOnChange={null}
            formname="cancel"
            formContent={CommentBox1}
          />
        </ModalComponent>
        )}


        {this.state.modelShow && (
          <ModalComponent
            title={"Staff Details"}
            showModel={this.state.modelShow}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
          >
            <AddServiceStaffForm
              initialValue={{
                ...defaultValueHours,
                ...this.state.editData,
              }}
              handleSubmit={this.handleFormSubmit}
              handleOnChange={this.handleChange}
              formname="addStaff"
              formContent={form}
            /> 

             {/* <AddServiceStaffForm
            initialValue={
              this.state.actionType === "add"
                ? {
                    ...defaultValueHours,
                    ...{ staffRole: "MANAGER" },
                  }
                : { ...defaultValueHours,
                    ...this.state.editData,
                  }
                   || {} 
            }
            handleSubmit={this.handleFormSubmit}
            handleOnChange={this.handleChange}
            formname="addStaff"
            formContent={form}
            />  */}
          </ModalComponent>
        )}
        {this.state.loader && <LoaderBox className="loader" />}
        {this.state.error && (
          <ModalComponent
            title={"Error Details"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.handleModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.state.error} />
          </ModalComponent>
        )}
      </>
    );
  }
}
// const selector = formValueSelector("addStaff");

const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  staffList: state.addBusiness && state.addBusiness.staffList,
  addBusinessResponse:
    state.addBusiness && state.addBusiness.addBusinessResponse,
  approveRes: state.businessDetails && state.businessDetails.approveResponse,
  deleteStaffRes: state.businessDetails && state.businessDetails.deleteStaffRes,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
  // serviceSkills: selector(state, "serviceSkills"),
});
const mapDispatchToprops = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  getBusinessStaff: (id: number) => dispatch(getBusinessStaff(id)),
  addBusinessStaff: (id: number, data: object) =>
    dispatch(addBusinessStaff(id, data)),
  deleteBusinessStaff: (id: number, data: object) =>
    dispatch(deleteBusinessStaff(id, data)),
  approveBusiness: (id: number, data: any) =>
    dispatch(approveBusiness(id, data)),
});
export default connect(mapStateToProps, mapDispatchToprops)(AddStaffContainer);