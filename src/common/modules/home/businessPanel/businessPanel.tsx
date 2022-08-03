import React from "react";
import styled from "styled-components";
import ServiceDetails from "../../businessModule/businessDetails/serviceDetails";
const StarInner = styled.span`
  width: 100px;
`;

export class BusinessPanel extends React.Component<any> {
  render() {
    const { data, showBooking, className, service, bookTickets } = this.props;
    return (
      <div
        className={className ? className : "col-md-6"}
        id={`${data.id}-${this.props.index}`}
      >
        <div className="list-view__item">
          <div className="listing hover-effect">
            <div className="d-sm-flex align-items-sm-center listing__wrapper">
              <div className="listing__thumbnail">
                <a href={data.imageUrl}>
                  <img src={data.image} alt="Hair Stylists" />
                </a>
              </div>
              <div className="d-flex justify-content-between align-items-center listing__detail">
                <div className="listing__detail-left">
                  <p className="t-small">
                    <span className="c-dove-gray">{data.distance}</span>
                  </p>
                  <h3 className="listing__title">
                    <a href={data.titileUrl}>{data.businessName}</a>
                  </h3>
                  {/* <p className="listing__review c-dusty-gray">
                    <span className="stars-outer" data-rating="5">
                      <StarInner className="stars-inner" />
                    </span>
                    <span>({data.reviewsCount} Reviews)</span>
                  </p> */}
                  <p className="listing__location c-dusty-gray no-b-margin">
                    <i className="fa fa-map-marker" />
                    {data.address ? data.address : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showBooking && (
            <ServiceDetails
              services={service}
              bookTicket={(row: any) => bookTickets(row, data.businessId)}
              hideTitle={true}
              serviceListClass="list-item"
            />
          )}
        </div>
      </div>
    );
  }
}
export default BusinessPanel;
