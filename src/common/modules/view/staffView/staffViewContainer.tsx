import React from "react";
import { connect } from "react-redux";
import { getSearchResults } from "../actionView";
import TableView from "../tableComponent";
import GenernalForm from "../../../components/Form/generalForm";
import searchForm from "./staffViewUtils";
// @ts-ignore
import { BusinessSetup } from "custom-actions";
import moment from "moment";
import FooterComponent from "../../../components/footerComponent";
import AlertSuccess from "../../../components/alertSuccessComponent";
import { staffName } from "../../../api/businessApi";
import styled from "styled-components";
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import BUSINESS_APP from "./../../../../apiConfig";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import { Link } from "react-router-dom";
import { getFormValues } from "redux-form";
import { any } from "prop-types";

const LoginWrapper = styled.div`
  background-position-y: 0px;
  padding-top: 10px;
  background-image: url(${HeaderLogo});
  background-repeat: repeat;
  min-height: 71vh;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
  font-family: "Montserrat-SemiBold";
  color: #123145;
  /* text-transform: uppercase; */
  text-align: center;
  font-weight: 600;
  letter-spacing: 3px;
`;
class StaffViewContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: null,
      staffName: null,
      //defaultValue: new Date().toLocaleDateString(),
      //defaultValue: moment(new Date()).format("DD/MM/YYYY"),
      defaultValue: moment(new Date().toLocaleDateString()).format("DD/MM/YYYY"),
    };
  }

  componentDidMount() {
    const request = {
      startDateStr: moment(new Date()).format("DD/MM/YYYY"),
      endDateStr: moment(new Date()).format("DD/MM/YYYY"),
      userIdOfStaff: this.props.location.state.userId,
    };
    this.props.getSearchResults(this.props.match.params.id, request); //need to add business id
    staffName(this.props.location.state.userId).then((res: any) => {
      if (res.data) {
        this.setState({ staffName: res.data.firstname });
      }
    });
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.staffNoshowRes &&
      !this.props.staffNoshowRes.error &&
      prevProps.staffNoshowRes !== this.props.staffNoshowRes
    ) {
      this.setState({
        success:
          this.props.staffNoshowRes.success[0]["message"] ||
          "saved Successfully",
      });
      const request = {
        startDateStr: moment(new Date()).format("DD/MM/YYYY"),
        endDateStr: moment(new Date()).format("DD/MM/YYYY"),
        userIdOfStaff: this.props.location.state.userId,
      };
      this.props.getSearchResults(this.props.match.params.id, request); //need to add business id
    }
  }
  handleSubmit = () => {};
  changeFormValue = (value: any) => {
    //this.setState({ defaultValue: moment(value.date).format("DD/MM/YYYY") });
    console.log(this.state.defaultValue);
    console.log(value.date);
    var initialFromDate = "", initialEndDate = "";
    if (value.date == this.state.defaultValue){
      initialFromDate = new Date().toLocaleDateString();
      console.log(initialFromDate);
    }
    else{
      initialFromDate = value.date;
      console.log(initialFromDate);
    }
    if (value.date1 == this.state.defaultValue){
      initialEndDate = new Date().toLocaleDateString();
      console.log(initialEndDate);
    }
    else{
      initialEndDate = value.date1;
      console.log(initialFromDate);
    }
    const request = {
      startDateStr: moment(initialFromDate).format("DD/MM/YYYY"),
      endDateStr: moment(initialEndDate).format("DD/MM/YYYY"),
      userIdOfStaff: this.props.location.state.userId,
    };
    this.props.getSearchResults(this.props.match.params.id, request); //need to add business id
  };
  noShow = (value: any) => {
    // this.setState({ success: null,});
    // this.setState({ error: null,});
    this.props.noShow(this.props.match.params.id, value);
    console.log("no show date:" + this.props.daterangeFormValue.date);
    console.log("no show end date:" + this.props.daterangeFormValue.date1);
  };
  closeSuccess = () => {
     this.setState({ success: null, });
     //window.location.reload();
     const request1 = {
       startDateStr: moment(this.props.daterangeFormValue.date).format("DD/MM/YYYY"),
       endDateStr: this.props.daterangeFormValue.date1,
       userIdOfStaff: this.props.location.state.userId,
     }
     this.props.getSearchResults(this.props.match.params.id, request1);
    
    // console.log(this.props.daterangeFormValue.date);
  };
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  render() {
    const nameStyle = {
      background: "white",
      justifyContent: "center",
      alignItems: "center",
      border: "0px",
      top: "10px",
    }
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
    </header>
    <LoginWrapper>
        <section className="create-listing">
          <div className="wrapper" id="mview" style={nameStyle}>
            {this.state.success && (
              <AlertSuccess
                messages={this.state.success}
                close={this.closeSuccess} />
            )}
            <h3 className="stitle">Check Bookings</h3>
            
            <P>{this.state.staffName}</P>
            <div className="row wkdd" style={nameStyle}>
              <GenernalForm
                initialValue={{ date: this.state.defaultValue, date1: this.state.defaultValue }}
                handleSubmit={this.handleSubmit}
                formname="searchForm"
                formContent={searchForm}
                handleOnChange={this.changeFormValue} />
                </div>
              <div className="col-md-4"></div>
            
            <div className="row">
              {this.props.staffSearchedList && (
                <TableView
                  searchedList={this.props.staffSearchedList
                    ? { bookingsList: this.props.staffSearchedList }
                    : null}
                  noShow={this.noShow}
                  reAssign={null}
                  cancel={null} />
              )}
            </div>
          </div>
        </section></LoginWrapper>
        <FooterComponent /></>
    );
  }
}

const daterageformSelector = getFormValues("searchForm");
const mapStateToProps = (state: any) => ({
  staffSearchedList:
    state.businessDetails && state.businessDetails.staffSearchedList,
  staffNoshowRes: state.businessDetails && state.businessDetails.staffNoshowRes,
  daterangeFormValue: daterageformSelector(state),
});
const mapDispatchToProps = (dispatch: any) => ({
  getSearchResults: (id: any, data: any) =>
    dispatch(getSearchResults(id, data, BusinessSetup.STAFF_USER_BOOKING_REQ)),
  noShow: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.STAFF_USER_BOOKING_NOSHOW_REQ)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(StaffViewContainer);
