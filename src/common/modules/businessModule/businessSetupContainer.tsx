import React from "react";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import AddRegistrationContainer from "./registration/addRegistrationContainer";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/footerComponent";
import BUSINESS_APP from "../../../apiConfig";

class BusinessSetupContainer extends React.Component<any, any> {
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  render() {
    return (
      <>
        <header id="masthead" className="site-header site-header--fluid">
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
            <div className="d-lg-flex align-items-lg-center">
              <div className="site-header__logo">
              <h1 className="screen-reader-text">The Salon</h1>
              <p className="page-banner__title_p1">
              {/* <a href={this.props.imageUrl}> */}
                <a  href={BUSINESS_APP.BUSINESS_APP}>
                    <img
                      src={SalonLogo}
                      alt="Salon"
                      style={{ width: "63%", height: "75%", marginBottom: "-20px" }} />
                </a>
              </p>
              <a  href={BUSINESS_APP.BUSINESS_APP}>
              <p className="logoname">lettuce</p>
              <p className="logoname1">book</p>
              </a>
            </div>
                <br>
                </br>
          </div>
            <div className="d-lg-flex align-items-lg-center">
            <div className="user-action" style={{ right: "4px" }}>
              
            <a href={`${BUSINESS_APP.BUSINESS_APP}`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <span style={{ marginLeft: "5px" }}>Home</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}About`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <span style={{ marginLeft: "5px" }}>About</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}login`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-user" />
                <span style={{ marginLeft: "5px" }}>Sign in</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}business-registration`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-building-o" />
                <span style={{ marginLeft: "5px" }}>Business sign up</span>
            </a>
              </div>
            </div>

            <div className="d-lg-none nav-mobile">
              {/* <a
                href="#"
                className="nav-toggle js-nav-toggle nav-toggle--white"
              >
                <span></span>
              </a> */}
            </div>
          </div>
        </header>
        <section className="create-listing">
          <div className="wrapper">
            <AddRegistrationContainer {...this.props} />
          </div>
        </section>
        <FooterComponent />
      </>
    );
  }
}
export default BusinessSetupContainer;
