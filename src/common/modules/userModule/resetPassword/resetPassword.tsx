import React from "react";
import loginModule from "../loginUtils";
import ResetPasswordFlow from "../../businessModule/registration/registrationForm";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { withRouter } from "react-router-dom";
import lodash from "lodash";
import {
  verifyEmail,
  verifySecurityQuestion,
  resetPassword,
  resetData,
  allSecurityQuestion,
  userSecurityQuestion,
} from "../action/userAction";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import { ViewProvider } from "../../view/mangerView/managerViewContextApi";
import AlertSuccess from "../../../components/alertSuccessComponent";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import { Link } from "react-router-dom";
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import BUSINESS_APP from "./../../../../apiConfig";
import FooterComponent from "../../../components/footerComponent";

const LoginWrapper = styled.div`
background-position-y: 0px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 100vh;
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
class ResetPassword extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentStep: this.props.location.pathname === "/sign-up" ? null : 1,
      error: null,
      id: null,
      success: null,
    };
  }
  componentDidMount() {
    this.props.allSecurityQuestion();
  }
  componentDidUpdate(prevProps: any) {
    const { resetPasswordResponse } = this.props;
    if (
      resetPasswordResponse &&
      resetPasswordResponse !== prevProps.resetPasswordResponse &&
      !lodash.isEqual(resetPasswordResponse, prevProps.resetPasswordResponse)
    ) {
      if (resetPasswordResponse.error || resetPasswordResponse.errors) {
        this.setState({
          error: resetPasswordResponse.error || resetPasswordResponse.errors,
        });
      } else {
        if (this.props.resetPasswordResponse.step == 2) {
          this.setState({
            id: this.props.resetPasswordResponse.data,
            currentStep: this.props.resetPasswordResponse.step,
          });
        } else {
          this.setState({
            currentStep: this.props.resetPasswordResponse.step,
          });
        }
      }
    }
    if (
      this.props.passwordResetSuccess &&
      this.props.passwordResetSuccess !== prevProps.passwordResetSuccess
    ) {
      this.setState({
        success:
          this.props.passwordResetSuccess["success"] &&
          this.props.passwordResetSuccess["success"][0]["message"],
      });
    }
  }
  handleSubmit = (value: any) => {
    if (this.state.currentStep === 1) {
      this.props.verifyEmail(value, this.state.currentStep);
    } /*else if (this.state.currentStep === 2) {
      let quesIdAnsPair = [];
      if (
        this.props.userSecurityQuestionRes &&
        this.props.userSecurityQuestionRes.length === 1
      ) {
        quesIdAnsPair = [[value.securityQuestion1, value.answer1]];
      } else {
        quesIdAnsPair = [
          [value.securityQuestion1, value.answer1],
          [value.securityQuestion2, value.answer2],
          [value.securityQuestion3, value.answer3],
        ];
      }

      let req = { quesIdAnsPair };

      this.props.verifySecurityQuestion(
        req,
        this.state.currentStep,
        this.state.id
      );
    }*/ else {
      if (this.state.currentStep === 2) {
        this.props.resetPassword(value, this.state.currentStep);
        this.setState({ success: null });
        this.props.history.push("/login");
      }
    }
  };
  handleSubmitForm = () => {
    this.props.submitForm(this.getFormName(this.state.currentStep));
  };
  handleModelClose = () => {
    this.setState({ error: null });
    this.props.resetData();
  };
  getButtonText = (step: number) => {
    if (step === 1) {
      return "Verify Email";
    } /*else if (step === 2) {
      return "Verify Security Question";
    } */else if (step === 2) {
      return "Reset Password";
    }
  };
  getFormName = (step: number) => {
    if (step === 1) {
      return "VerifyEmail";
    }/* else if (step === 2) {
      return "verifySecurityQuestion";
    }*/ else if (step === 2){
      return "resetPassword";
    }
  };
 /* getAllSecurityQuestion = () => {
    let res = this.props.allSecurityQuestionRes || [];
    res.forEach((element: any) => {
      element.value = element.qid;
      element.label = element.questionText;
    });
    return res;
  };*/
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
    const { userSecurityQuestionRes } = this.props;
    //const security = this.getAllSecurityQuestion();
    const initialValueQ =
      userSecurityQuestionRes && userSecurityQuestionRes.length === 1
        ? { securityQuestion1: userSecurityQuestionRes[0].qid }
        : userSecurityQuestionRes && userSecurityQuestionRes.length > 1
        ? {
            securityQuestion1: userSecurityQuestionRes[0].qid,
            securityQuestion2: userSecurityQuestionRes[1].qid,
            securityQuestion3: userSecurityQuestionRes[2].qid,
          }
        : {};
    return (
      <><header id="masthead" className="site-header site-header--fluid">
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

          </div>
        </div>
      </header><LoginWrapper>
          <LoginWrapper1>
            <div
              className="wrapper1 "
              style={loginStyle}
            >
              {this.state.success && (
                <AlertSuccess
                  messages={this.state.success}
                  close={this.closeSuccess} />
              )}
              {this.state.currentStep === 1 && (
                <ResetPasswordFlow
                  initialValue={{}}
                  handleSubmit={this.handleSubmit}
                  formname="VerifyEmail"
                  sectionTitle="Verify Email"
                  formContent={loginModule.verifyEmail} />
              )}
              {this.state.currentStep === 2 && (
                <ResetPasswordFlow
                  initialValue={{}}
                  handleSubmit={this.handleSubmit}
                  formname="resetPassword"
                  sectionTitle="Reset Password"
                  formContent={loginModule.resetPassword1} />
              )}
              <Button primary={true} onKeyPress={this.handleSubmitForm} onClick={this.handleSubmitForm}>
                {this.getButtonText(this.state.currentStep)}
              </Button>
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
        </LoginWrapper>
        <FooterComponent /></>
    );
  }
}

const mapStateToProps = (state: any) => ({
  resetPasswordResponse: state.user && state.user.resetPasswordResponse,
  passwordResetSuccess: state.user && state.user.passwordResetSuccess,
  allSecurityQuestionRes: state.user && state.user.allSecurityQuestionResponse,
  userSecurityQuestionRes:
    state.user && state.user.userSecurityQuestionResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  verifyEmail: (data: Object, step: number) =>
    dispatch(verifyEmail(data, step)),
  verifySecurityQuestion: (data: Object, step: number, id: number) =>
    dispatch(verifySecurityQuestion(data, step, id)),
  resetPassword: (data: object, step: number) =>
    dispatch(resetPassword(data, step)),
  resetData: () => dispatch(resetData()),
  allSecurityQuestion: () => dispatch(allSecurityQuestion()),
  userSecurityQuestion: (id: any, data: any) =>
    dispatch(userSecurityQuestion(id, data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
);
