import React from "react";
import { connect } from "react-redux";
import {
  getSearchResults,
  getReassignmentData,
  applyReassignment,
} from "../actionView";
import TableView from "../tableComponent";
import moment from "moment";
import styled from "styled-components";
// @ts-ignore
import { BusinessSetup } from "custom-actions";
import AlertSuccess from "../../../components/alertSuccessComponent";
import { submit } from "redux-form";
import FooterComponent from "../../../components/footerComponent";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import GenernalForm from "../../../components/Form/generalForm";
import { CommentBox } from "../mangerView/managerViewUtils";
const FullName = styled.p`
  margin: auto;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  text-align: center;
  /* text-decoration-color: #f5dcdc; */
  font-family: "Montserrat-SemiBold";
  font-size: 16px;
  font-weight: 600;
  min-width: 950px;
  justify-content: space-between;
  display: flex;
  cursor: pointer;
`;
const Time = styled.p`
  margin: auto;
  max-width: 950px;
  /* border: solid 2px #ccc; */
  padding: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const LeaveRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  form {
    width: 39%;
  }
  button {
    height: 50%;
  }
`;
const AvailTime = styled.div`
  margin: auto;
`;
const TimeSpan = styled.span`
  border: 1px solid;
  /* margin: auto; */
  padding: 4px;
  color: white;
  background-color: #123145;
  border-radius: 6%;
  /* min-width: 20px; */
  width: 90px;
  height: 20px;
  margin-top: 10px;
  line-height: 9px;
  text-align: center;
`;
const Img = styled.img`
  width: 16px;
  height: 16px;
  transform: none solid;
  background-position: center;
  cursor: pointer;
  transform: rotate(270deg);
`;
const Img1 = styled.img`
  width: 16px;
  height: 16px;
  transform: none solid;
  background-position: center;
  cursor: pointer;
`;
class TicketViewContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      closeModel: false,
      cancelData: null,
      success: null,
      modelShow: true,
      error: null,
    };
  }
  componentDidMount() {
    this.props.getSearchResults(this.props.match.params.id, null);
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
          cancelData: null,
        });
        this.props.getSearchResults(this.props.match.params.id, null);
      } else {
        this.setState({
          error: this.props.ticketCancelRes["error"],
          cancelData: null,
        });
      }
    }
  }
  handleSubmit = () => {
    this.props.submitForm("cancel");
  };
  cancel = (value: any) => {
    this.setState({
      success: null,
      cancelData: value,
    });
    //this.props.cancel(this.props.match.params.id, value);
  };
  formSubmit = (value: any) => {
    const request = {
      cancelReason: value.comment,
      bookingNumber: this.state.cancelData.bookingNumber,
    };
    this.props.cancel(this.props.match.params.id, request);
  };
  closeSuccess = () => {
    this.setState({
      success: null,
    });
  };
  closeModel = (_row: any) => {
    this.setState({ closeModel: false, cancelData: null });
  };
  handleModelClose = () => {
    this.setState({ error: null, cancelData: null });
  };
  render() {
    return (
      <>
        <section className="create-listing">
          <div className="wrapper" id="mview">
            {this.state.success && (
              <AlertSuccess
                messages={this.state.success}
                close={this.closeSuccess}
              />
            )}
            <h3 className="stitle">Manager's View</h3>
            <>
              <div className="row">
                {this.props.bookedTicketList && (
                  <TableView
                    searchedList={{ bookingsList: this.props.bookedTicketList }}
                    cancel={this.cancel}
                    ticketbased={true}
                  />
                )}
              </div>
            </>
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
          {this.state.cancelData && !this.state.error && (
            <ModalComponent
              title={"Cancel Ticket"}
              showModel={this.state.modelShow}
              handleSubmit={this.handleSubmit}
              handleClose={this.handleModelClose}
              isErrorHandler={false}
            >
              {" "}
              <GenernalForm
                initialValue={{}}
                handleSubmit={this.formSubmit}
                handleOnChange={null}
                formname="cancel"
                formContent={CommentBox}
              />
            </ModalComponent>
          )}
        </section>
        <FooterComponent />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  bookedTicketList:
    state.businessDetails && state.businessDetails.bookedTicketList,
  ticketCancelRes:
    state.businessDetails && state.businessDetails.ticketCancelRes,
});
const mapDispatchToProps = (dispatch: any) => ({
  getSearchResults: (id: any) =>
    dispatch(getSearchResults(id, null, "GET_BOOKED_TICKET")),
  cancel: (id: any, data: any) =>
    dispatch(getSearchResults(id, data, "GET_BOOKED_TICKET_CANCEl_REQ")),
  submitForm: (formname: string) => dispatch(submit(formname)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketViewContainer);
