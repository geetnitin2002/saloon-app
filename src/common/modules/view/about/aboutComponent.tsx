import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AllBussinessList } from "../actionView";
import { Link } from "react-router-dom";
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
const Hdiv = styled.div`
  margin: 4px;
  padding: 4px;
  font-size: medium;
  text-decoration-style: wavy;
  font-size: 1.1rem;
  width: fit-content;
`;
const Adiv = styled.div`
  marign: 4px;
  display: flex;
  margin: auto;
  justify-content: space-evenly;
`;
class AboutView extends React.PureComponent<any, any> {
  state = {};
  componentDidMount() {}
  redirectLink = (url: any) => {
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
                <Link to={() => this.redirectLink("/business-registration")}>Home</Link>
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
      // <Hdiv>
      //   <p>Thanku for booking at HairCuts</p>
      //   <br />
      //   <p>address</p>
      //   <p>addressLine1, addressLine2, City</p>
      //   <br />
      //   <div>
      //     <p>Booking Details:</p>
      //     <p>Boys hait Cut with Mangeet</p>
      //     <p>Date: 11/05/2020</p>
      //     <p>Duration: 30</p>
      //     <p>TotalPrice: 150</p>
      //     <p>ContactNumber: 9876543211</p>
      //   </div>
      //   <br />
      //   <Adiv>
      //     <a href="" target="_blank">
      //       Cancel
      //     </a>
      //     <a href="" target="_blank">
      //       Gooogle
      //     </a>
      //     <a href="" target="_blank">
      //       Apple
      //     </a>
      //   </Adiv>
      // </Hdiv>
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutView);
