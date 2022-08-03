import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AllBussinessList } from "../actionView";
import { Link } from "react-router-dom";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
const SIDENAV = styled.div`
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #123145;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 2px;
  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: white;
    display: block;
    transition: 0.3s;
  }
  a:hover {
    color: #f1f1f1;
  }
`;
class ContactView extends React.PureComponent<any, any> {
  state = {};
  componentDidMount() {}
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };

  redirectLinkTo = (url: any) => {
    return {
      pathname: url,
    };
  };

  render() {
    return (
      <header id="masthead" className="site-header site-header--fluid">
        <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
          <div className="d-lg-flex align-items-lg-center">
            <div className="site-header__logo">
              <a href={this.props.imageUrl}>
                <h1 className="screen-reader-text">The Salon</h1>
                <Link to={() => this.redirectLink("/business-registration")}>
                <img
                  src={SalonLogo}
                  alt="Salon"
                  style={{ width: "63%", height: "75%" }}
                />
                </Link>
              </a>
            </div>
          </div>
          <div className="d-lg-flex align-items-lg-center">
            <ul className="min-list main-navigation">
              <li>
                <Link to={() => this.redirectLinkTo("/business-registration")}>Home</Link>
              </li>
              <li>
                <Link to={() => this.redirectLink("/about")}>About</Link>
              </li>
              <li>
                <Link to={() => this.redirectLink("/Services")}>Services</Link>
              </li>
              <li>
                <Link to={() => this.redirectLink("/Contact")}>Contact</Link>
              </li>
            </ul>
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
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.allBusinessResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  AllBusinessList: () => dispatch(AllBussinessList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
