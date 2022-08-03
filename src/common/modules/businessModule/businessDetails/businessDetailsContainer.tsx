import React from "react";
import BusinessAddressInfo from "./addressDetails";
import ServiceDetails from "./serviceDetails";
import BusinessDescription from "./businessDesciption";
import TicketBooking from "../ticketBooking/ticketBooking";
import { connect } from "react-redux";
import {
  getBusinessAddress,
  getBusiness,
  getBusinessServices,
  getBusinessExtraInfo,
} from "../action/addBusinessAction";
class BusniessDetailsContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceDetails: null,
      closeTicketModel: true,
    };
  }

  componentDidMount() {
    this.props.getAddressDetails(this.props.match.params.id);
    this.props.getBusinessDetails(this.props.match.params.id);
    this.props.getBusinessServices(this.props.match.params.id);
    this.props.getBusinessExtraInfo(this.props.match.params.id);
  }
  bookTicket = (row: any) => {
    this.setState({ serviceDetails: row, closeTicketModel: false });
  };
  closeTicketBooking = (close: any) => {
    this.setState({ serviceDetails: null, closeTicketModel: close });
  };
  getAddress = () => {
    const { addressDetails } = this.props;
    let address = "";
    if (addressDetails) {
      if (addressDetails.addressLine1) {
        address += addressDetails.addressLine1 + ",";
      }
      if (addressDetails.addressLine2) {
        address += addressDetails.addressLine2 + ",";
      }
      if (addressDetails.province) {
        address += addressDetails.province + ",";
      }
      if (addressDetails.cityLocation) {
        address += addressDetails.cityLocation + ",";
      }
      if (addressDetails.city) {
        address += addressDetails.city;
      }
    }
    return address;
  };
  render() {
    const { businessInfo, businessExtraInfo } = this.props;
    return (
      <>
        {!this.state.serviceDetails && (
          <section className="single-listing single-listing--layout-2">
            <div className="listing-main bg-wild-sand">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div
                      id="about"
                      className="listing-section bg-white hover-effect"
                      data-matching-link="#about-link"
                    >
                      <div className="listing-header__image">
                        <img src={"assets/images/placeholder1.jpg"} />
                      </div>

                      <div className="listing-header__content">
                        <div className="d-sm-flex align-items-sm-center">
                          <h2 className="listing-header__title">
                            {businessInfo && businessInfo.businessName}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <BusinessDescription
                      {...{
                        description:
                          businessExtraInfo && businessExtraInfo.writeup,
                      }}
                    />
                    <ServiceDetails
                      services={this.props.serviceList}
                      bookTicket={this.bookTicket}
                    />
                  </div>
                  <BusinessAddressInfo
                    addressInfo={{
                      address: this.getAddress(),
                      contact:
                        businessInfo &&
                        businessInfo.extraInfo &&
                        businessInfo.extraInfo.ownerPhone,
                      email: businessInfo && businessInfo.ownerEmailId,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        {this.state.serviceDetails && !this.state.closeTicketModel && (
          <TicketBooking
            serviceDetails={this.state.serviceDetails}
            businessId={this.props.match.params.id}
            closeTicketBooking={this.closeTicketBooking}
          />
        )}
      </>
    );
  }
}
export const mapStateToProps = (state: any) => ({
  addressDetails: state.businessDetails && state.businessDetails.addressDetail,
  businessInfo: state.businessDetails && state.businessDetails.businessInfo,
  businessExtraInfo:
    state.businessDetails && state.businessDetails.businessExtraInfo,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
});
export const mapDispatchToProps = (dispatch: any) => ({
  getAddressDetails: (id: any) => dispatch(getBusinessAddress(id)),
  getBusinessDetails: (id: any) => dispatch(getBusiness(id)),
  getBusinessServices: (id: any) => dispatch(getBusinessServices(id)),
  getBusinessExtraInfo: (id: any) => dispatch(getBusinessExtraInfo(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusniessDetailsContainer);
