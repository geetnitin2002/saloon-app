import React from "react";
import Crossicon from "TARGET_BUILD/images/uploads/cross.png";
import moment from "moment";
import styled from "styled-components";
import AlertSuccess from "../../../components/alertSuccessComponent";
import { UserProvider } from "../../businessModule/registration/addServices/contextApi";
import GenernalForm from "../../../components/Form/generalForm";
import { reassignmentForm, reassignmentForm1 } from "./managerViewUtils";
import { ViewProvider } from "./managerViewContextApi";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
interface IReassignment {
  reassignmentRes: any;
  submitForm: any;
  reassignment: any;
  closeModel: any;
  applyReassigmentRes: any;
}
const LoginWrapper = styled.div`
  background-position-y: 0px;
  padding-top: 10px;
  background-image: url(${HeaderLogo});
  background-repeat: repeat;
  min-height: 71vh;
`;
const LoaderBox = styled.div`
  top: 12px;
  left: 165px;
  margin: auto;
`;
const Button = styled.button`
  position: fixed;
  display: flex;
  /* flex-direction: row-reverse; */
  top: 15px;
  right: 232px;
  float: left;
  img {
    vertical-align: middle;
    background: no-repeat green;
    width: 10px;
  }
`;
class ReassignmentComponent extends React.Component<IReassignment, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loader: false,
      initialValue:
        this.props.applyReassigmentRes.length > 1
          ? {
              services: this.props.applyReassigmentRes[0].serviceName,
              services1:
                // this.props.applyReassigmentRes.length === 1 &&
                this.props.applyReassigmentRes[1].serviceName,
              staff: this.props.applyReassigmentRes[0].staffList[0].userId,
              staff1:
                this.props.applyReassigmentRes.length === 1 &&
                this.props.applyReassigmentRes[1].staffList[0].userId,
            }
          : {
              services: this.props.applyReassigmentRes[0].serviceName,
              staff: this.props.applyReassigmentRes[0].staffList[0].userId,
            },
      success: null,
    };
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.reassignmentRes &&
      this.props.reassignmentRes !== prevProps.reassignmentRes
    ) {
      this.setState({ loader: false });
      if (this.props.reassignmentRes.responseType === "success") {
        this.setState({
          success: this.props.reassignmentRes.success[0].message,
        });
        // this.props.closeModel(false);
      }
    }
  }

  handleSubmit = (value: any) => {
    const request: any = {
      service1: value.services,
      minSlotNumber1: this.props.applyReassigmentRes[0].minSlot,
      appointmentDate: null,
      userIdOfStaff1: value.staff,
      maxSlotNumber1: this.props.applyReassigmentRes[0].maxSlot,
      service2: null,
      userIdOfStaff2: null,
      minSlotNumber2: null,
      maxSlotNumber2: null,
    };
    if (this.props.applyReassigmentRes.length > 1) {
      request.minSlotNumber2 = this.props.applyReassigmentRes[1].minSlot;
      request.maxSlotNumber2 = this.props.applyReassigmentRes[1].maxSlot;
      request.userIdOfStaff2 = value.staff1;
      request.service2 = value.services1;
    }
    this.props.reassignment(request);
    this.setState({ loader: true });
  };
  bookTicket = () => {
    this.props.submitForm("reassignment");
  };
  closeTicket = (close: any) => {
    console.log("service1" + this.props.applyReassigmentRes[0].serviceName);
    console.log("service 2" + this.props.applyReassigmentRes[1].serviceName);
    this.setState({ success: null });
    this.props.closeModel(close);
  };
  getService = (res: any) => {
    if (res) {
    }
    return [];
  };
  getStaff = (res: any) => {
    let options = [];
    if (res.staffList) {
      for (let i = 0; i < res.staffList.length; i++) {
        options.push({
          label: res.staffList[i].name,
          value: res.staffList[i].userId,
        });
      }
    }
    return options;
  };
  render() {
    const loginStyle = {
      background: "white",
      minHeight: "0px",
      top: "150px",
      border: "0px",
    };
    const buttonStyle = {
      justifyContent: "center",
      alignItems: "center"
    }
    return (
      <section className="create-listing">
        {/* <Button
          className="dismiss-button"
          aria-label="Dismiss"
          onClick={this.closeTicket}
        >
          <img src={Crossicon} alt="Salon" />
        </Button> */}
        <div className="wrapper" id="mview" style={loginStyle}>
          {this.state.success && (
            <AlertSuccess
              messages={this.state.success}
              close={this.closeTicket}
            />
          )}
          <h3 className="stitle">Reassign Booking</h3>
          <ViewProvider
            value={{
              staff: this.getStaff(this.props.applyReassigmentRes[0]),
              staff1: this.getStaff(
                this.props.applyReassigmentRes.length > 1
                  ? this.props.applyReassigmentRes[1]
                  : []
              ),
            }}
          >
            <GenernalForm
              initialValue={this.state.initialValue}
              handleSubmit={this.handleSubmit}
              formname="reassignment"
              formContent={
                this.props.applyReassigmentRes.length > 1
                  ? [...reassignmentForm, ...reassignmentForm1]
                  : reassignmentForm
              }
            />
          </ViewProvider>
          <div className="form-row">
            <div className="form-col">
              {this.state.loader && <LoaderBox className="loader" />}
            </div>
            </div>
            <div className="form-col"></div>
            <div className="wkdd" style={buttonStyle}>
              <button
                type="button"
                className="button button--medium button--square button--search"
                onClick={this.closeTicket}
              >
                  Back
              </button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button
                type="button"
                className="button button--medium button--square button--search"
                onClick={this.bookTicket}
              >
                Reassign
              </button>
              </div>
          </div>
      </section>
    );
  }
}

export default ReassignmentComponent;
