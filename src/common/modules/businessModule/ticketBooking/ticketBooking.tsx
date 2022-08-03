import React from "react";
import TicketBookingForm from "../registration/registrationForm";
import ticketBooking from "./ticketBookingUtils";
import { connect } from "react-redux";
import Crossicon from "TARGET_BUILD/images/uploads/cross.png";
import { submit, formValueSelector } from "redux-form";
import {
  bookTicket,
  ticketBookingReset,
  getTicketsAvailability,
} from "../action/addBusinessAction";
import moment from "moment";
import styled from "styled-components";
import AlertSuccess from "../../../components/alertSuccessComponent";
import { UserProvider } from "../registration/addServices/contextApi";
interface ITicketBooking {
  ticketBookingRes?: any;
  ticketBookingReset?: any;
  ticketBooking?: any;
  submitForm?: any;
  businessId?: any;
  serviceDetails: any;
  getTicketsAvailability?: any;
  closeTicketBooking?: any;
  ticketsAvailable?: any;
  ticketDate?: any;
  timeSlots?: any;
}
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
class TicketComponentBooking extends React.Component<ITicketBooking, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formValue: { serviceName: this.props.serviceDetails.name },
      loader: false,
      success: null,
    };
  }
  componentDidMount() {
    this.props.ticketBookingReset();
    this.props.getTicketsAvailability(
      this.props.businessId,
      this.props.serviceDetails.name
    );
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.ticketBookingRes &&
      this.props.ticketBookingRes !== prevProps.ticketBookingRes
    ) {
      this.setState({ loader: false });
      if (this.props.ticketBookingRes.responseType === "success") {
        this.setState({
          success: this.props.ticketBookingRes.success[0].message,
        });
      }
    }
  }

  handleSubmit = (value: any) => {
    const request = {
      serviceName: value.serviceName,
      bookerName: value.bookerName,
      bookerEmail: value.bookerEmail,
      countOfTicketsToBook: value.countOfTicketsToBook,
      eventDate: moment(value.eventDate).format("DD/MM/YYYY"),
      slotStartTime: value.slotStartTime,
    };
    this.props.ticketBooking(request, this.props.businessId);
    this.setState({ loader: true });
  };
  bookTicket = () => {
    this.props.submitForm("ticketBooking");
  };
  closeTicket = (close: any) => {
    // console.log(close);
    this.setState({ success: null });
    this.props.closeTicketBooking(close);
  };
  getCountOfTickets = () => {
    const { ticketDate, timeSlots, ticketsAvailable } = this.props;
    const options: any = [];
    const value =
      timeSlots &&
      ticketDate &&
      ticketsAvailable[moment(ticketDate).format("DD/MM/YYYY")].filter(
        (row: any) => row.timeslot === timeSlots
      );
    if (value && value[0]) {
      for (let i = 1; i <= value[0].ticketAllowed; i++) {
        options.push({ timeslot: i });
      }
    }
    return value && options;
  };
  getSlotTime = () => {
    const time =
      this.props.ticketsAvailable && this.props.ticketDate
        ? this.props.ticketsAvailable[
            moment(this.props.ticketDate).format("DD/MM/YYYY")
          ]
        : null;
    return time;
  };
  render() {
    return (
      <section className="create-listing">
        <Button
          className="dismiss-button"
          aria-label="Dismiss"
          onClick={this.closeTicket}
        >
          <img src={Crossicon} alt="Salon" />
        </Button>
        <div className="wrapper" id="mview">
          {this.state.success && (
            <AlertSuccess
              messages={this.state.success}
              close={this.closeTicket}
            />
          )}
          <UserProvider
            value={{
              slotStartTime: this.getSlotTime(),
              countOfTicketsToBook: this.getCountOfTickets(),
            }}
          >
            <TicketBookingForm
              initialValue={this.state.formValue}
              handleSubmit={this.handleSubmit}
              formname="ticketBooking"
              sectionTitle="TICKET BOOKING"
              formContent={ticketBooking}
            />
          </UserProvider>

          <div className="form-row">
            <div className="form-col">
              {this.state.loader && <LoaderBox className="loader" />}
            </div>
            <div className="form-col">
              <label>
                <br />
              </label>
              <div className="form-holder">
                {!this.state.success && (
                  <button
                    type="submit"
                    className="button button--medium button--square button--search"
                    onClick={this.bookTicket}
                  >
                    BOOK
                  </button>
                )}
              </div>
            </div>
            <div className="form-col"></div>
          </div>
        </div>
      </section>
    );
  }
}

const selector = formValueSelector("ticketBooking");

const mapStateToProps = (state: any) => ({
  ticketBookingRes:
    state.businessDetails && state.businessDetails.ticketBookingRes,
  ticketsAvailable:
    state.businessDetails && state.businessDetails.ticketsAvailable,
  ticketDate: selector(state, "eventDate"),
  timeSlots: selector(state, "slotStartTime"),
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  ticketBooking: (value: any, id: any) => dispatch(bookTicket(value, id)),
  ticketBookingReset: () => dispatch(ticketBookingReset()),
  getTicketsAvailability: (id: any, name: any) =>
    dispatch(getTicketsAvailability(id, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketComponentBooking);
