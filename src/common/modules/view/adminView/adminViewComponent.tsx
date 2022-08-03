import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AllBussinessList } from "../actionView";
import { Link } from "react-router-dom";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import List from "../../../components/List/list";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import { submit } from "redux-form";
import BUSINESS_APP from "./../../../../apiConfig";
import {
  serviceCategories,
  AddserviceCategories,
  deleteserviceCategories,
} from "../../../api/businessApi";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import MultiSelectField from "../../../components/Form/inputMultiSelect";
import InputDateField from "../../../components/Form/inputDate";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import FooterComponent from "../../../components/footerComponent";

const LoginWrapper = styled.div`
background-position-y: 0px;
padding-top: 10px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 71vh;
`;

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
const Button: any = styled.button`
  background: ${(props: any) => (props.primary ? "#123145" : "white")};
  color: ${(props: any) => (props.primary ? "white" : "#123145")};
  background: #123145;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #123145;
  border-radius: 3px;
  padding: 10px;
  float: -1px;
  width: 13%;
  height: 41px;
  margin-top: 11px;
  text-align: center;
  cursor: pointer;
  margin-left: 38px;
  /* margin-top: 26px*/
`;
const ButtonWraspper = styled.div`
  margin: 16px;
`;
class AdminView extends React.PureComponent<any, any> {
  
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };

  servicesLoad =() => {
    


  };
  render() {
    const loginStyle = {
      background: "white",
      minHeight: "0px",
      top: "150px",
      border: "0px",
    };
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
                {/* </a> */}
              </a></p>
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
        <LoginWrapper>
          <div className="wrapper" style={loginStyle}>
            <h3>Admin View</h3>
            <ButtonWraspper>
            <Link to={() => this.redirectLink("/service-category")}>
                <a
                  href={void 0}
                  onClick={this.servicesLoad}
                  className="abtn"
                  style={{
                    width: "170px",
                    borderRadius: "4px",
                  }}
                >
                  Service Categories
                </a></Link>
              </ButtonWraspper> 

              <ButtonWraspper>
              <Link to={() => this.redirectLink("/approved-business-list")}>
                <a
                  href={void 0}
                  onClick={this.servicesLoad}
                  className="abtn"
                  style={{
                    width: "170px",
                    borderRadius: "4px",
                  }}
                >
                  Approved Businesses
                </a></Link>
              </ButtonWraspper> 


              <ButtonWraspper>
              <Link to={() => this.redirectLink("/disabled-business-list")}>
                <a
                  href={void 0}
                  onClick={this.servicesLoad}
                  className="abtn"
                  style={{
                    width: "170px",
                    borderRadius: "4px",
                  }}
                >
                  Disabled Businesses
                </a></Link>
              </ButtonWraspper> 

              <ButtonWraspper>
                
              <Link to={() => this.redirectLink("/reset-password")}>
                <a
                  href={void 0}
                  onClick={this.servicesLoad}
                  className="abtn"
                  style={{
                    width: "170px",
                    borderRadius: "4px",
                  }}
                >
                  Reset Password
                </a></Link>
              </ButtonWraspper> 
              <ButtonWraspper>
                
              <Link to={() => this.redirectLink("/reports")}>
                <a
                  href={void 0}
                  onClick={this.servicesLoad}
                  className="abtn"
                  style={{
                    width: "170px",
                    borderRadius: "4px",
                  }}
                >
                  Reports
                </a></Link>
              </ButtonWraspper> 
          </div>
        </LoginWrapper> 
        <FooterComponent />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.allBusinessResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  AllBusinessList: () => dispatch(AllBussinessList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
