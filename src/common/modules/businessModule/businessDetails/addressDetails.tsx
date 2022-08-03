import React from "react";

const BusinessAddressInfo = (props: any) => {
  const { addressInfo } = props;
  return (
    <div className="col-lg-4">
      <div className="listing-widget bg-white hover-effect">
        <h3 className="listing-widget__title">Business Address</h3>
        <ul className="min-list listing-contact-list">
          <li className="d-flex align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <span className="c-primary">
              {addressInfo.address ? addressInfo.address : "-"}
            </span>
          </li>

          <li className="d-flex align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-phone listing-contact__icon"></i>
            <a href="tel:+442077391628">
              {addressInfo.contact ? addressInfo.contact : "-"}
            </a>
          </li>

          <li className="d-flex align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-envelope listing-contact__icon"></i>
            <a href="#">{addressInfo.email ? addressInfo.email : "-"}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default BusinessAddressInfo;
