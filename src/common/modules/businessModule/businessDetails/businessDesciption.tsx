import React from "react";

const BusinessDescription = (props: { description: string }) => {
  return (
    <div
      id="about"
      className="listing-section bg-white hover-effect"
      data-matching-link="#about-link"
    >
      <div className="listing-section__header">
        <h3 className="listing-section__title">Business Description</h3>
      </div>
      <div className="c-dove-gray">
        <p>{props.description ? props.description : "-"}</p>
      </div>
    </div>
  );
};
export default BusinessDescription;
