import React, {Component} from "react";
import loginModule from "../loginUtils";
import LoginForm from "../../businessModule/registration/registrationForm";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { userLogin } from "../action/userAction";
import { Link } from "react-router-dom";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import GenernalForm from "../../../components/Form/generalForm";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
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
const ButtonLink = styled.a`
  cursor: pointer;
  position: relative;
  right: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  margin: 11px;
  color: #123145 !important;
`;
const LoaderBox = styled.div`
  top: 12px;
  left: 165px;
  margin: auto;
`;
class LoginContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  this.state = {
    error: null,
    loader: false,
    modelShow: true,
    userRole: [],
    userDetails: {},
  };
}
  componentDidMount() {
    localStorage.clear();
  }
  handleSubmit = (value: any) => {
    this.setState({ loader: true, error: null });
    this.props.userLogin(value);
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  handleSubmitForm = () => {
    this.props.submitForm("login");
  };
  onKeyPress = (event: any) => {
    alert(event);
    console.log(event);
    if (event.charCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      this.handleSubmitForm();
    }
  }
  componentDidUpdate = (prevProps: any) => {
    const response: any = this.props.loginResponse;
    // this.props.history.push("/about");
    if (response && response !== prevProps.loginResponse) {
      this.setState({ loader: false });
      if (response && (response.responseType === "errors" || response.error)) {
        this.setState({ error: response["errors"] || response.error });
        // const path = {
        //   pathname: "/manager-view/" + 198,
        //   state: { userId: 100213 },
        // };
        // this.props.history.push(path);
      } else {
        this.setState(
          {
            userRole: response.data && response.data.roles,
            userDetails: response.data,
          },
          () => {
            if (response.data && response.data.roles.length == 1) {
              this.handleOnChange({ role: response.data.roles[0] });
            }
            if (response.data && response.data.roles.length > 1) {
              this.handleOnChange({ role: response.data.roles[1] });
            }
          }
        );
        localStorage.setItem("userDetail", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data["auth-token"]);
      }
    }
  };
  getOptions = () => {
    let data = [{ label: "Choose", value: "" }];
    for (let i = 0; i < this.state.userRole.length; i++) {
      data.push({
        label: this.state.userRole[i],
        value: this.state.userRole[i],
      });
    }
    return data;
  };
  handleOnChange = (data: any) => {
    const detail: any = this.state.userDetails;
    if (data.role === "MANAGER" && detail.ifTicketBasedBusiness === "Y") {
      const path = {
        pathname: "/ticket-view/" + detail.businessId,
        state: { userId: detail.userId },
      };
      this.props.history.push(path);
    } else if (data.role === "MANAGER") {
      const path = {
        pathname: "/manager-view/" + detail.businessId,
        state: { userId: detail.userId },
      };
      this.props.history.push(path);
    } else if (data.role === "EMPLOYEE") {
      const path = {
        pathname: "/staff-view/" + detail.businessId,
        state: { userId: detail.userId },
      };
      this.props.history.push(path);
    } else if (data.role === "OWNER") {
      const path = {
        pathname: "/business-details",
        state: { businessId: detail.businessId },
      };
      this.props.history.push(path);
    } else if (data.role === "REVIEWER") {
      this.props.history.push("/reviewer");
    } else if (data.role === "ADMIN") {
      this.props.history.push("/admin");
    }
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
    const Roleform: any = loginModule.RoleForm;
    if (this.state.userRole && this.state.userRole.length > 0) {
      Roleform[0].field[0].props["options"] = this.getOptions();
    }
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
            {/* <a href={`${BUSINESS_APP.BUSINESS_SEARCH}login`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-user" />
                <span style={{ marginLeft: "5px" }}>Sign in</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}business-registration`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-building-o" />
                <span style={{ marginLeft: "5px" }}>Business sign up</span>
            </a> */}
              </div>
          </div>

          <div className="d-lg-none nav-mobile">    

          </div>
        </div>
      </header>
        <LoginWrapper>
          <LoginWrapper1>
            {this.state.userRole.length === 0 && (
              <div className="wrapper1" style={loginStyle}>
                <LoginForm
                  initialValue={{}}
                  handleSubmit={this.handleSubmit}
                  formname="login"
                  sectionTitle="Login"
                  formContent={loginModule.Login}
                  buttonComponent={<Button primary={true} onClick={this.handleSubmitForm} type="submit">
                  Login
                </Button>}
                  />
                {/* <Button primary={true} onClick={this.handleSubmitForm} type="submit">
                  Login
                </Button> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to="/sign-up">
                    <ButtonLink> Final Staff Sign Up </ButtonLink>
                  </Link>
                  <Link to="changePassword">
                    <ButtonLink> Change Password </ButtonLink>
                  </Link>
                  <Link to="/reset-password">
                    <ButtonLink> Reset Password </ButtonLink>
                  </Link>
                </div>

                {this.state.loader && <LoaderBox className="loader" />}
              </div>
            )}
            {this.state.userRole.length > 0 && (
              <div className="wizard clearfix" style={loginStyle}>
                <GenernalForm
                  initialValue={{}}
                  handleSubmit={this.handleSubmit}
                  handleOnChange={this.handleOnChange}
                  formname="role"
                  formContent={Roleform} />
              </div>
            )}
            {this.state.error && (
              <ModalComponent
                title={"Error Details"}
                showModel={this.state.modelShow}
                handleSubmit={null}
                handleClose={this.handleModelClose}
                isErrorHandler={true}
              >
                <Errorhandler error={this.state.error} />
              </ModalComponent>
            )}
          </LoginWrapper1>
        </LoginWrapper></>
        <FooterComponent /></>
    );
  }
}
const mapStateToProps = (state: any) => ({
  loginResponse: state.user && state.user.loginResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  userLogin: (data: Object) => dispatch(userLogin(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
