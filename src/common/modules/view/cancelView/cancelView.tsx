import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Link } from "react-router-dom";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import GenernalForm from "../../../components/Form/generalForm";
import { CommentBox } from "../mangerView/managerViewUtils";
import { getSearchResults } from "../actionView";
// @ts-ignore
import { BusinessSetup } from "custom-actions";
import AlertSuccess from "../../../components/alertSuccessComponent";
const LoginWrapper = styled.div`
  width: 675px;
  margin: auto;
  padding: 7px;
`;
interface Ibuttonprimary {
  readonly primary: boolean;
}

const Button = styled.button`
  background: ${(props: Ibuttonprimary) =>
    props.primary ? "#123145" : "white"};
  color: ${(props: Ibuttonprimary) => (props.primary ? "white" : "#123145")};
  background: #123145;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #123145;
  border-radius: 3px;
  padding: 10px;
  float: -1px;
  width: 40%;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  margin: auto;
`;
const ButtonLink = styled.a`
  cursor: pointer;
  position: relative;
  right: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  margin: 11px;
  color: #123145 !important;
`;
const LoaderBox = styled.div`
  top: 12px;
  left: 165px;
  margin: auto;
`;
class CancelView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      success: null,
      loader: false,
      modelShow: true,
      paramsDetails: {},
    };
  }

  componentDidMount() {
    const searchValue: any = new URLSearchParams(this.props.location.search);
    const paramsDetails: any = {
      bkNbr: searchValue.get("bkNbr"),
      appointment: searchValue.get("appointment"),
      type: searchValue.get("type"),
      customer: searchValue.get("customer"),
      service: searchValue.get("service"),
    };
    this.setState({ paramsDetails });
    console.log(paramsDetails);
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.ticketCancelRes &&
      prevProps.ticketCancelRes !== this.props.ticketCancelRes
    ) {
      if (this.props.ticketCancelRes["success"]) {
        this.setState({
          success:
            this.props.ticketCancelRes &&
            this.props.ticketCancelRes["success"] &&
            this.props.ticketCancelRes["success"][0]["message"],
          loader: false,
        });
        this.props.getSearchResults(this.props.match.params.id, null);
      } else {
        this.setState({
          error: this.props.ticketCancelRes["error"],
          loader: false,
        });
      }
    }
    if (
      this.props.managerCancelRes &&
      prevProps.managerCancelRes !== this.props.managerCancelRes
    ) {
      if (
        this.props.managerCancelRes &&
        this.props.managerCancelRes["success"]
      ) {
        this.setState({
          success:
            this.props.managerCancelRes &&
            this.props.managerCancelRes["success"] &&
            this.props.managerCancelRes["success"][0]["message"],
          loader: false,
        });
      } else {
        this.setState({
          error: this.props.managerCancelRes["error"],
          loader: false,
        });
      }
    }
  }
  formSubmit = (value: any) => {
    this.setState({ loader: true, error: null });
    const request = {
      cancelReason: value.comment,
      bookingNumber: this.state.paramsDetails.bkNbr,
    };
    if (this.state.paramsDetails.type === "regular") {
      this.props.cancel(this.props.match.params.id, request);
    } else {
      this.props.cancelTicket(this.props.match.params.id, request);
    }
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  closeSuccess = () => {
    this.setState({ success: null });
  };
  handleSubmitForm = () => {
    this.props.submitForm("cancel-booking");
  };
  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "150px",
    };
    return (
      <LoginWrapper>
        <div className="wizard clearfix" style={loginStyle}>
          <h5 style={{ marginBottom: "24px" }}>Cancel Booking</h5>
          {this.state.success && (
            <AlertSuccess
              messages={this.state.success}
              close={this.closeSuccess}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: "7px",
                color: "#123145",
              }}
            >
              <span style={{ marginBottom: "6px" }}>
                Customer: {this.state.paramsDetails.customer}
              </span>
              <span style={{ marginBottom: "6px" }}>
                Service: {this.state.paramsDetails.service}
              </span>
              <span style={{ marginBottom: "6px" }}>
                Booking Number: {this.state.paramsDetails.bkNbr}
              </span>
              <span>
                Appointment Date: {this.state.paramsDetails.appointment}
              </span>
            </div>
            <GenernalForm
              initialValue={{}}
              handleSubmit={this.formSubmit}
              handleOnChange={null}
              formname="cancel-booking"
              formContent={CommentBox}
            />
            <Button primary={true} onClick={this.handleSubmitForm}>
              Cancel
            </Button>
          </div>

          {this.state.loader && <LoaderBox className="loader" />}
        </div>
        {this.state.error && (
          <ModalComponent
            title={"Error Details"}
            showModel={this.state.modelShow}
            handleSubmit={null}
            handleClose={this.handleModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.state.error} />
          </ModalComponent>
        )}
      </LoginWrapper>
    );
  }
}
const mapStateToProps = (state: any) => ({
  ticketCancelRes:
    state.businessDetails && state.businessDetails.ticketCancelRes,
  managerCancelRes:
    state.businessDetails && state.businessDetails.managerCancelRes,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  cancel: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.MANAGER_USER_BOOKING_CANCEl_REQ)
    ),
  cancelTicket: (id: any, data: any) =>
    dispatch(getSearchResults(id, data, "GET_BOOKED_TICKET_CANCEl_REQ")),
});
export default connect(mapStateToProps, mapDispatchToProps)(CancelView);
