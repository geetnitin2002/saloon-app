import React from "react";
import loginModule from "../loginUtils";
import SingnUpFlow from "../../businessModule/registration/registrationForm";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { withRouter } from "react-router-dom";
import lodash from "lodash";
import {
  addSecurityQuestion,
  signUp,
  resetData,
  allSecurityQuestion,
} from "../action/userAction";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import { ViewProvider } from "../../view/mangerView/managerViewContextApi";
import AlertSuccess from "../../../components/alertSuccessComponent";
import { changePassword } from "../../../api/userApi";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import { Link } from "react-router-dom";
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import BUSINESS_APP from "./../../../../apiConfig";
import FooterComponent from "../../../components/footerComponent";

const LoginWrapper = styled.div`
background-position-y: 0px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 120vh;
`;
const LoginWrapper1 = styled.div`
width: auto!important;
margin: auto;
padding: 100px 0px 0px 0px;
`;
interface Ibuttonprimary {
  readonly primary: boolean;
}

const Button = styled.button`
  background: ${(props: Ibuttonprimary) =>
    props.primary ? "#123145" : "white"};
  color: ${(props: Ibuttonprimary) => (props.primary ? "white" : "#123145")};
  background: #123145;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #123145;
  border-radius: 3px;
  padding: 10px;
  float: -1px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;
class ChangePassword extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      success: null,
      email: null,
    };
  }
  handleSubmit = (value: any) => {
    if (value.newPassword !== value.confirmPassword) {
      this.setState({error: "Passwords didn't match"});
    }
    else{
    changePassword(value).then((res: any) => {
      if (res.errors || res.error) {
        this.setState({
          error: res.error || res.errors,
        });
      } else {
        this.setState({
          success: res["success"] && res["success"][0]["message"],
        });
      }
    });
  }
  };
  handleSubmitForm = () => {
    this.props.submitForm("changePassword");
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  getButtonText = (step: number) => {
    if (step === 1) {
      return "Sign Up";
    } else if (step === 2) {
      return "Add Security Question";
    }
  };
  getFormName = (step: number) => {
    if (step === 1) {
      return "signUp";
    } else if (step === 2) {
      return "addSecurityQuestion";
    }
  };
  getAllSecurityQuestion = () => {
    let res = this.props.allSecurityQuestionRes || [];
    res.forEach((element: any) => {
      element.value = element.qid;
      element.label = element.questionText;
    });
    return res;
  };
  closeSuccess = () => {
    this.setState({ success: null });
    this.props.history.push("/login");
  };
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  render() {
    const loginStyle = {
      backgroundColor: "white",
      minHeight: "0px",
      top: "100px",
      border: "0px",
    };
    const security = this.getAllSecurityQuestion();
    return (
    <><><header id="masthead" className="site-header site-header--fluid">
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
        </div>
      </header>
        <LoginWrapper>
          <>
            <LoginWrapper1>
              <div className="wrapper1" style={loginStyle}>
                {this.state.success && (
                  <AlertSuccess
                    messages={this.state.success}
                    close={this.closeSuccess} />
                )}
                {!this.state.success && (
                  <>
                    <SingnUpFlow
                      initialValue={{}}
                      handleSubmit={this.handleSubmit}
                      formname="changePassword"
                      sectionTitle="Change Password"
                      formContent={loginModule.changePassword} />
                    <Button primary={true} onClick={this.handleSubmitForm}>
                      Change Password
                    </Button>
                  </>
                )}
              </div>
              {this.state.error && (
                <ModalComponent
                  title={"Error Details"}
                  showModel={true}
                  handleSubmit={null}
                  handleClose={this.handleModelClose}
                  isErrorHandler={true}
                >
                  <Errorhandler error={this.state.error} />
                </ModalComponent>
              )}
            </LoginWrapper1>
          </>
        </LoginWrapper></>
        <FooterComponent /></>
    );
  }
}
const mapStateToProps = (state: any) => ({
  singnUpResponse: state.user && state.user.singnUpResponse,
  addSecurityQuestionRes: state.user && state.user.addSecurityQuestionRes,
  allSecurityQuestionRes: state.user && state.user.allSecurityQuestionResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
