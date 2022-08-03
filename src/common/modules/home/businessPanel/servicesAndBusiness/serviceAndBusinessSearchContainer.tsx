import React from "react";
import { ServiceAndBusinessSearch } from "./serviceAndBusniessSearch";
import BusinessPanel from "../businessPanel";
import { connect } from "react-redux";
import {
  getSearchResults,
  SearchForLocationAndBusiness,
  getBusinessLocation
} from "../../action/businessDetailAction";
import TicketBooking from "../../../businessModule/ticketBooking/ticketBooking";
export class ServiceAndBusinessContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      defaultValue: this.props.location.state,
      serviceDetails: null,
      closeTicketModel: true,
      search: this.props.location.state.id
    };
  }
  componentDidMount() {
    this.props.getBusinessLocation();
    this.props.getSearchResults();
    const request = {
      serviceCategory:
        this.state.defaultValue.type === "service"
          ? this.state.defaultValue.id
          : null,
      location: null,
      businessName:
        this.state.defaultValue.type === "business"
          ? this.state.defaultValue.id
          : null
    };
    if (this.state.defaultValue.type) {
      this.props.location.state = "";
      let state = { ...this.props.history.location.state };
      delete state.id;
      delete state.type;
      delete state.value;
      this.props.history.replace({ ...this.props.history.location, state });
    }
    if (this.state.defaultValue.type) {
      this.props.SearchForLocationAndBusiness(request);
    }
  }
  searchClick = (value: any) => {
    this.setState({ search: value.selectedService.id });
    const request = {
      serviceCategory:
        value.selectedService.type === "service"
          ? value.selectedService.id
          : null,
      location: value.selectedLocations ? value.selectedLocations.value : null,
      businessName:
        value.selectedService.type === "business"
          ? value.selectedService.id
          : null
    };
    this.props.SearchForLocationAndBusiness(request);
  };
  bookTicktsDetails = (row: any, id: any) => {
    row.id = id;
    this.setState({ serviceDetails: row, closeTicketModel: false });
  };
  closeTicketBooking = (close: any) => {
    this.setState({ serviceDetails: null, closeTicketModel: close });
  };
  render() {
    const { searchList } = this.props;
    return (
      <>
        {!this.state.serviceDetails && (
          <section className="create-listing bg-wild-sand">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="create-listing__wrapper bg-wild-sand">
                    <ServiceAndBusinessSearch
                      serviceCategoriessAndBusinesses={
                        this.props.serviceCategoriessAndBusinesses
                      }
                      locationList={this.props.locationsList}
                      searchClick={this.searchClick}
                      defaultValue={this.state.defaultValue}
                      {...this.props}
                    />
                    {searchList && searchList.length > 0 && (
                      <h2 className="page-title t-center">
                        Showing results for{" "}
                        <span className="c-white">{this.state.search}</span>
                      </h2>
                    )}
                    <div className="row">
                      {searchList &&
                        searchList.map((row: any, index: any) => (
                          <BusinessPanel
                            className="col-md-12"
                            data={row}
                            index={index}
                            key={row.businessId}
                            showBooking={true}
                            service={row.services}
                            bookTickets={this.bookTicktsDetails}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {this.state.serviceDetails &&
          this.state.serviceDetails.ifTicket !== "N" &&
          !this.state.closeTicketModel && (
            <TicketBooking
              serviceDetails={this.state.serviceDetails}
              businessId={this.state.serviceDetails.id}
              closeTicketBooking={this.closeTicketBooking}
            />
          )}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({
  serviceCategoriessAndBusinesses:
    state.businessDetails &&
    state.businessDetails.serviceCategoriessAndBusinesses,
  locationsList: state.businessDetails && state.businessDetails.locationsList,
  searchList: state.businessDetails && state.businessDetails.searchList
});
const mapDispatchToProps = (dispatch: any) => ({
  getSearchResults: () => dispatch(getSearchResults()),
  SearchForLocationAndBusiness: (data: any) =>
    dispatch(SearchForLocationAndBusiness(data)),
  getBusinessLocation: () => dispatch(getBusinessLocation())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceAndBusinessContainer);
