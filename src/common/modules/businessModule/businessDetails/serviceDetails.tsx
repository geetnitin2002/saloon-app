import React from "react";

const ServiceDetails = (props: any) => {
  return (
    <div
      id="menu"
      className="listing-section bg-white hover-effect"
      data-matching-link="#menu-link"
    >
      {!props.hideTitle && (
        <div className="listing-section__header">
          <h3 className="listing-section__title">Service Menu</h3>
        </div>
      )}
      <ul className={`min-list listing-menu ${props.serviceListClass}`}>
        {props.services.map((row: any, index: any) => (
          <li className="listing-menu__item" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="listing-menu__item-left">
                <h4 className="listing-menu__item-name">{row.name}</h4>
                <span
                  style={{
                    color: "gray"
                  }}
                >
                  ({row.price})
                </span>
              </div>

              <div className="listing-menu__item-right">
                <button className="button button--square button--search">
                  <a href={void 0} onClick={() => props.bookTicket(row)}>
                    BOOK
                  </a>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDetails;
