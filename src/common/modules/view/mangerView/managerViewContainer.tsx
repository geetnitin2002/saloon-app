import React from "react";
import { connect } from "react-redux";
import {
  getSearchResults,
  getReassignmentData,
  applyReassignment,
} from "../actionView";
import daterageform from "../staffView/staffViewUtils";
import TableView from "../tableComponent";
import searchForm, {
  leaveForm,
  CommentBox,
  staffLeaveForm,
} from "./managerViewUtils";
import GenernalForm from "../../../components/Form/generalForm";
import moment from "moment";
import { UserProvider } from "../../businessModule/registration/addServices/contextApi";
import { getBusinessStaff } from "../../businessModule/action/addBusinessAction";
import { getBusinessFutureLeaves } from "../../home/action/businessDetailAction";
import styled from "styled-components";
// @ts-ignore
import { BusinessSetup } from "custom-actions";
import AlertSuccess from "../../../components/alertSuccessComponent";
import ReassignmentComponent from "./reassignment";
import { submit, getFormValues } from "redux-form";
import Arrowicon from "TARGET_BUILD/images/uploads/arrow.png";
import FooterComponent from "../../../components/footerComponent";
import { ViewProvider } from "./managerViewContextApi";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import List from "../../../components/List/list";
import{
  cancelLeave,
} from "../../../api/businessApi";
import { any } from "prop-types";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import { Link } from "react-router-dom";
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import BUSINESS_APP from "./../../../../apiConfig";

const LoginWrapper = styled.div`
  background-position-y: 0px;
  padding-top: 10px;
  background-image: url(${HeaderLogo});
  background-repeat: repeat;
  min-height: 100vh;
`;
const FullName = styled.p`
  margin: auto;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  text-align: center;
  /* text-decoration-color: #f5dcdc; */
  font-family: "Montserrat-SemiBold";
  font-size: 16px;
  font-weight: 600;
  // min-width: 950px;
  justify-content: space-between;
  display: flex;
  cursor: pointer;
`;
const Time = styled.p`
  margin: auto;
  max-width: 950px;
  /* border: solid 2px #ccc; */
  padding: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const LeaveRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  form {
    width: 39%;
  }
  button {
    height: 50%;
  }
`;
const AvailTime = styled.div`
  margin: auto;
`;
const TimeSpan = styled.span`
  border: 1px solid;
  /* margin: auto; */
  padding: 4px;
  color: white;
  background-color: #123145;
  border-radius: 6%;
  /* min-width: 20px; */
  width: 90px;
  height: 20px;
  margin-top: 10px;
  line-height: 9px;
  text-align: center;
`;
const Img = styled.img`
  width: 16px;
  height: 16px;
  transform: none solid;
  background-position: center;
  cursor: pointer;
  transform: rotate(270deg);
`;
const Img1 = styled.img`
  width: 16px;
  height: 16px;
  transform: none solid;
  background-position: center;
  cursor: pointer;
`;

const ButtonWraspper = styled.div`
  margin: 16px;
`;

class ManagerViewContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      closeModel: false,
      success: null,
      //defaultValue: moment(new Date()).format("DD/MM/YYYY"),
      //defaultValue: new Date().toLocaleDateString(),
      defaultValue: moment(new Date().toLocaleDateString()).format("DD/MM/YYYY"),
      reassigment: null,
      staffAvailablity: null,
      modelShow: true,
      error: null,
      markLeave: false,
      listTemplates: {
        thead: ["Name", "Start date", "End date"],
        tbody: ["name", "start", "end"],
        // tbody: ["0", "1", "2"],
        actionItems: {
          edit: true,
          delete: true,
        },
      },
    };
  }

  componentDidMount() {
    const request = {
      dateStr: moment(new Date()).format("DD/MM/YYYY"),
      selectedUserId: null,
      loggedInUserId: this.props.location.state.userId,
    };
    this.props.getSearchResults(this.props.match.params.id, request);
    this.props.getStaffDetails(this.props.match.params.id);
    this.props.getFutureLeaves(this.props.match.params.id);
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.managerNoshowRes &&
      prevProps.managerNoshowRes !== this.props.managerNoshowRes
    ) {
      const request = {
        dateStr: moment(new Date()).format("DD/MM/YYYY"),
        selectedUserId: null,
        loggedInUserId: this.props.location.state.userId,
      };
      this.setState({
        success:
          this.props.managerNoshowRes &&
          this.props.managerNoshowRes["success"] &&
          this.props.managerNoshowRes["success"][0]["message"],
      });
      this.props.getSearchResults(this.props.match.params.id, request);
    }
    if (
      this.props.managerCancelRes &&
      prevProps.managerCancelRes !== this.props.managerCancelRes
    ) {
      if (
        this.props.managerCancelRes &&
        this.props.managerCancelRes["success"]
      ) {
        this.setState({
          success:
            this.props.managerCancelRes &&
            this.props.managerCancelRes["success"] &&
            this.props.managerCancelRes["success"][0]["message"],
          cancelData: null,
        });
        const request = {
          dateStr: moment(new Date()).format("DD/MM/YYYY"),
          selectedUserId: null,
          loggedInUserId: this.props.location.state.userId,
        };
        this.props.getSearchResults(this.props.match.params.id, request);
      } else {
        this.setState({
          error: this.props.managerCancelRes["error"],
          cancelData: null,
        });
      }
    }
    if (
      this.props.managerSearchedList &&
      this.props.managerSearchedList.staffAvailablity &&
      this.props.managerSearchedList.staffAvailablity !==
        (prevProps.managerSearchedList &&
          prevProps.managerSearchedList.staffAvailablity)
    ) {
      this.setState({
        staffAvailablity: this.props.managerSearchedList.staffAvailablity,
      });
    }
    if (
      this.props.staffLeaveRes &&
      this.props.staffLeaveRes !== prevProps.staffLeaveRes
    ) {
      if (this.props.staffLeaveRes.error) {
        this.setState({
          error: this.props.staffLeaveRes.error,
        });
      } else {
        this.props.getFutureLeaves(this.props.match.params.id);
        this.setState({
          success:
            this.props.staffLeaveRes &&
            this.props.staffLeaveRes["success"] &&
            this.props.staffLeaveRes["success"][0]["message"],
          markLeave: false,
        });
      }
    }
  }
  handleSubmit = () => {
    this.props.submitForm("cancel");
  };

  handleLeaveCancelSubmit = () => {
    this.props.submitForm("cancel");
  };
  stringToDate = (_date: any, _format: any, _delimiter: any) => {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(
      dateItems[yearIndex],
      month,
      dateItems[dayIndex]
    );
    return formatedDate;
  };
  changeFormValue = (value: any) => {
    // const selector_new = getFormValues("daterageform"); //formValueSelector('daterageform');
    // const searchDate:any = selector_new(this.state);
    console.log(this.state.defaultValue);
    console.log(value.date);
    var initialFromDate = "", initialEndDate = "";

    if (this.props.daterangeFormValue.date == this.state.defaultValue) {
      initialFromDate = new Date().toLocaleDateString();
      console.log(this.props.daterangeFormValue.date);
    }
    else {
      initialFromDate = this.props.daterangeFormValue.date;
    }
    if (this.props.daterangeFormValue.date1 == this.state.defaultValue) {
      initialEndDate = new Date().toLocaleDateString();
      console.log(this.props.daterangeFormValue.date1);
    }
    else {
      initialEndDate = this.props.daterangeFormValue.date1;
    }

    //if ( initialFromDate != "" || initialEndDate != "")     {
    const request = {
      dateStr: value.date === null ? null: moment(new Date(initialFromDate)).format("DD/MM/YYYY"),
      fromDateStr: this.props.daterangeFormValue.date == undefined ? null : moment(new Date(initialFromDate)).format("DD/MM/YYYY"),
      toDateStr: this.props.daterangeFormValue.date1 == undefined ? null : moment(new Date(initialEndDate)).format("DD/MM/YYYY"),
      selectedUserId: value.staff === "All" ? null : value.staff || null,
      loggedInUserId: this.props.location.state.userId,
    };
    this.props.getSearchResults(this.props.match.params.id, request);
//  }
  // else{
  //   const request = {
  //     dateStr: value.date === null ? null: moment(new Date(value.date)).format("DD/MM/YYYY"),
  //     fromDateStr: this.props.daterangeFormValue.date == undefined ? null : moment(new Date(this.props.daterangeFormValue.date)).format("DD/MM/YYYY"),
  //     toDateStr: this.props.daterangeFormValue.date1 == undefined ? null : moment(new Date(this.props.daterangeFormValue.date1)).format("DD/MM/YYYY"),
  //     selectedUserId: value.staff === "All" ? null : value.staff || null,
  //     loggedInUserId: this.props.location.state.userId,
  //   };
  //   this.props.getSearchResults(this.props.match.params.id, request);

  // }
    // this.setState({
    //   defaultValue: moment(value.date).format("DD/MM/YYYY"),
    // });
  };

  changeFormValue_new = (value: any) => {
     //const selector_new = getFormValues("searchForm"); //formValueSelector('searchForm');
     //const searchDate:any = selector_new(this.state);
//alert(searchDate);

    //this.setState({ defaultValue: moment(value.date).format("DD/MM/YYYY") });
    const request = {
      dateStr: this.props.searchFormValue.date === null ? null: moment(new Date(this.props.searchFormValue.date)).format("DD/MM/YYYY"),
      //dateStr: moment(new Date(searchDate)).format("DD/MM/YYYY"),
      fromDateStr: this.props.daterangeFormValue.date == undefined ? null : moment(new Date(this.props.daterangeFormValue.date)).format("DD/MM/YYYY"),
      toDateStr: this.props.daterangeFormValue.date1 == undefined ? null : moment(new Date(this.props.daterangeFormValue.date1)).format("DD/MM/YYYY"),
      selectedUserId: value.staff === "All" ? null : value.staff || null,
      loggedInUserId: this.props.location.state.userId,
      //userIdOfStaff: this.props.location.state.userId,//100547
    };
    this.props.getSearchResults(this.props.match.params.id, request);

  //  var bookings = this.props.getDateRangeSearchResults(this.props.match.params.id, request); //need to add business id
  //  this.props.managerSearchedList = this.props.getDateRangeSearchResults(request);
  //  this.setState({businessDetails: {managerSearchedList : bookings}});
  };

  noShow = (value: any) => {
    this.setState({
      success: null,
    });
    this.props.noShow(this.props.match.params.id, value);
  };
  cancel = (value: any) => {
    this.setState({
      success: null,
      cancelData: value,
    });
    console.log(value)
    //this.props.cancel(this.props.match.params.id, value);
  };
  cancelLeave = (value: any) => {
    this.setState({
      success: null,
      cancelLeaveData: value,
    });
    console.log(value)
  };
  reAssign = (value: any) => {
    this.setState({ reassigment: value, closeModel: true });

    this.props.getReassignmentData(
      this.props.match.params.id,
      value.bookingNumber
    );
  };
  getStaffList = (showAll: boolean = true, hide: boolean = false) => {
    let list: any = showAll
      ? [{ label: "All Staff", value: null }]
      : hide
      ? []
      : [{ label: "", value: "" }];
    this.props.staffList &&
      this.props.staffList.map((row: any) => {
        list.push({
          label: row.firstname,
          value: row.userId,
        });
      });
    return list;
  };
  rowClick = (row: any, index: any) => {
    const staffAvailablity = this.state.staffAvailablity;
    row.show = !row.show;
    staffAvailablity[index] = row;
    this.setState({ staffAvailablity: staffAvailablity });
  };
  closeSuccess = () => {
    this.setState({
      success: null,
    });
  };
  closeModel = (_row: any) => {
    this.setState({ closeModel: false, reassigment: null });
    this.props.resetReassignmentData();
  };
  formSubmit = (value: any) => {
    const request = {
      cancelReason: value.comment,
      bookingNumber: this.state.cancelData.bookingNumber,
    };
    this.props.cancel(this.props.match.params.id, request);
  };

  formLeaveSubmit = () => {
    console.log(this.state.cancelLeaveData.leaveNumber);
    console.log(this.state.cancelLeaveData.parentLeaveNumber);
    const request = {
      leaveNumber: this.state.cancelLeaveData.leaveNumber,
      parentLeaveNumber: this.state.cancelLeaveData.parentLeaveNumber,
    };
    cancelLeave(this.props.match.params.id, request)
    .then((res: any) => {
       if (!res.error && !res.errors) {
        window.location.reload();
       } else {
         this.setState({ error: res.error || res.errors });
       }
     })
     .catch((error: any) => {
       this.setState({ error });
     });
    this.setState({ error: null, cancelLeaveData: null });
    //alert("Leave cancelled");
    //window.location.reload();
  };

  deleteHandler = (id:any, row: any) => {
    this.handleModelClose();    
    var data : any = new Object();
    data.leaveNumber = id.leaveNumber;
    data.parentLeaveNumber = id.parentLeaveNumber;
    cancelLeave(this.props.match.params.id, data)
    console.log(id);
    console.log(id.leaveNumber);
    console.log(id.parentLeaveNumber);
    console.log(new Date().toLocaleDateString());
    //window.location.reload();
  };

  applyReassignment = (request: any) => {
    request.appointmentDate = this.state.reassigment.appointmentDate;
    this.props.applyReassignment(
      this.props.match.params.id,
      this.state.reassigment.bookingNumber,
      request
    );
  };
  handleLeaveSubmit = () => {
    this.setState({ markLeave: true });
    //this.props.submitForm("chooseLeave");
  };
  handleLeaveFormSubmit = (value: any) => {
    console.log(value);
    this.props.leave(this.props.match.params.id, {
      staffUserIds: [value.staff],
    });
  };
  handleModelClose = () => {
    this.setState({ error: null, cancelData: null });
  };

  handleLeaveModelClose = () => {
    this.setState({ error: null, cancelLeaveData: null });
  };
  formForLeave = (value: any) => {
    this.setState({ error: null });
    if (
      value.startTime &&
      value.startDate &&
      moment(value.startTime).format("HH:mm") ==
        moment(value.endTime).format("HH:mm") &&
      moment(value.startDate).format("DD/MM/YYYY") ==
        moment(value.endTime).format("DD/MM/YYYY")
    ) {
      this.setState({ error: "startTime and endTime can't be same" });
    } else if (
      !value.ifMarkLeaveForFullDay &&
      (!value.startTime || !value.endTime)
    ) {
      this.setState({ error: "please provide startTime and endTime" });
    } else {
      const res: any = {
        ifMarkAllStaffMembers: value.ifMarkAllStaffMembers ? "Y" : "N",
        ifMarkLeaveForFullDay: value.ifMarkLeaveForFullDay ? "Y" : "N",
        startDate: value.startDate
          ? moment(new Date(value.startDate)).format("DD/MM/YYYY")
          : null,
        endDate: value.endDate
          ? moment(new Date(value.endDate)).format("DD/MM/YYYY")
          : null,
        startTime: value.ifMarkLeaveForFullDay
          ? null
          : value.startTime
          ? moment(new Date(value.startTime)).format("HH:mm")
          : null,
        endTime: value.ifMarkLeaveForFullDay
          ? null
          : value.endTime
          ? moment(new Date(value.endTime)).format("HH:mm")
          : null,
        staffUserIds: value.ifMarkAllStaffMembers
          ? null
          : this.getSkills(value.staffUserIds),
      };
       console.log(res);
      this.props.leave(this.props.match.params.id, res);
    }
  };
  getSkills = (value: any) => {
    if (value) {
      const data: any = [];
      value.forEach((element: any) => {
        data.push(element.value);
      });
      return data;
    } else {
      return null;
    }
  };
  
  changeRole = () =>
  {
    const path = {
      pathname: "/business-details",
      state: { businessId: this.props.match.params.id },
    };
    this.props.history.push(path);
  }
  
  changeToStaffRole = () =>
  {
    const path = {
      pathname: "/staff-view/" + this.props.match.params.id,
      state: { userId: this.props.location.state.userId },
    };
    this.props.history.push(path);
    window.location.reload();
  } 

  handleMarkSubmit = () => {
    this.props.submitForm("mark-leave");
  };
  handleMarkLeaveModelClose = () => {
    this.setState({ error: null, cancelData: null, markLeave: false });
  };
  markLeave = () => {
    const ifMarkAllStaffMembers =
      this.props.leaveFormValue &&
      this.props.leaveFormValue.ifMarkAllStaffMembers;
    const ifMarkLeaveForFullDay =
      this.props.leaveFormValue &&
      this.props.leaveFormValue.ifMarkLeaveForFullDay;
    return (
      this.state.markLeave && (
        <ModalComponent
          title={"Mark Leave"}
          showModel={this.state.markLeave}
          handleSubmit={this.handleMarkSubmit}
          handleClose={this.handleMarkLeaveModelClose}
          isErrorHandler={false}
        >
          <ViewProvider
            value={{
              staffUserIds: {
                options: this.getStaffList(false, true),
                disable: ifMarkAllStaffMembers,
              },
              startTime: { disable: ifMarkLeaveForFullDay },
              endTime: { disable: ifMarkLeaveForFullDay },
            }}
          >
            <GenernalForm
              initialValue={{ ifMarkLeaveForFullDay: true }}
              handleSubmit={this.formForLeave}
              handleOnChange={null}
              formname="mark-leave"
              formContent={staffLeaveForm}
            />
          </ViewProvider>
        </ModalComponent>
      )
    );
  };
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  render() {
    const loginStyle = {
      background: "white",
      minHeight: "0px",
      top: "150px",
      border: "0px",
    };
    const buttonStyle = {
      justifyContent: "center",
      alignItems: "center"
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
        <><>
          <LoginWrapper>
            {!this.props.reassigmentData && (
              <>
                <section className="create-listing">
                  <div className="wrapper" id="mview" style={loginStyle}>
                    {this.state.success && (
                      <AlertSuccess
                        messages={this.state.success}
                        close={this.closeSuccess} />
                    )}
                    <h3 className="stitle">Business Overview</h3>
                    <>
                      <hr />
                      {/* <div className="wkdd" style={buttonStyle}>
                        <button
                          type="button"
                          className="button button--medium button--square button--search"
                          onClick={this.changeRole}
                        >
                                                    Edit Business
                        </button> &nbsp;&nbsp;&nbsp; <br></br>
                        <button
                          type="button"
                          className="button button--medium button--square button--search"
                          onClick={this.changeToStaffRole}
                        >
                          Bookings
                        </button>
                        <hr /> </div> */}
                        <div className="wkdd" style={buttonStyle}>
                      <ButtonWraspper>
                          <a
                            href={void 0}
                            onClick={this.changeRole}
                            className="abtn"
                            style={{
                              width: "170px",
                              borderRadius: "4px",
                            }}
                          >
                            Edit Business
                          </a>
                          {/* </Link> */}
                        </ButtonWraspper> 
                      <ButtonWraspper>
                          <a
                            href={void 0}
                            onClick={this.changeToStaffRole}
                            className="abtn"
                            style={{
                              width: "170px",
                              borderRadius: "4px",
                            }}
                          >
                            Check Bookings
                          </a>
                          {/* </Link> */}
                        </ButtonWraspper> </div>

                      <h5>Manage Leave</h5>
                      <LeaveRow className="row" id="leaveForm">
                        {(<List
                          listTemplates={this.state.listTemplates}
                          listData={this.props.futureLeaves ? this.props.futureLeaves : []}
                          /*editHandler={
                            this.props.status !== "APPROVED" ? this.editHandler : null
                            this.props.status !== null ? this.editHandler : null
                          }
                          deleteHandler={
                            this.props.status !== "APPROVED" &&
                            this.props.status !== null &&
                            this.props.staffList &&
                            this.props.staffList.length > 1
                              ? this.deleteHandler
                              : null
                          }*/
                          //deleteHandler={this.deleteLeaves}
                          deleteHandler={this.cancelLeave} />)}
                      </LeaveRow>
                      {/* <div className="wkdd" style={buttonStyle}>
                        <button
                          type="button"
                          className="button button--medium button--square button--search"
                          data-toggle="modal"
                          onClick={this.handleLeaveSubmit}
                        >
                          Enter Leave
                        </button>
                        {this.markLeave()} </div> */}
                        <div className="wkdd" style={buttonStyle}>
                      <ButtonWraspper>
                          <a
                            href={void 0}
                            onClick={this.handleLeaveSubmit}
                            className="abtn"
                            style={{
                              width: "170px",
                              borderRadius: "4px",
                            }}
                          >
                            Enter Leave
                          </a>
                          {/* </Link> */}
                        </ButtonWraspper> {this.markLeave()} </div>
                      <hr />
                      <h5>Availability Check</h5>
                      <div className="row wkdd" style={buttonStyle}>
                        <ViewProvider
                          value={{
                            staff: this.getStaffList(),
                          }}
                        >
                          <GenernalForm
                            initialValue={{}}
                            //initialValue={{ date: this.state.defaultValue }}   //If value to be today use this
                            handleSubmit={this.handleSubmit}
                            formname="searchForm"
                            formContent={searchForm}
                            handleOnChange={this.changeFormValue} />
                        </ViewProvider>
                      </div>
                      <div className="row">
                        {this.state.staffAvailablity &&
                          this.state.staffAvailablity.map(
                            (row: any, index: any) => (
                              <AvailTime key={index}>
                                <FullName onClick={() => this.rowClick(row, index)}>
                                  {row.fullName}
                                  <span>
                                    {!row.show && (
                                      <Img src={Arrowicon} alt="Salon" />
                                    )}
                                    {row.show && (
                                      <Img1 src={Arrowicon} alt="Salon" />
                                    )}
                                  </span>
                                </FullName>
                                <Time hidden={!row.show}>
                                  {row.availableSlots.map(
                                    (info: any, index: any) => (
                                      <TimeSpan key={index}>{info}</TimeSpan>
                                    )
                                  )}
                                </Time>
                              </AvailTime>
                            )
                          )}
                      </div>
                      <hr />
                      <h5> Manage Bookings</h5>
                      <div className="row wkdd" style={buttonStyle}>
                        <GenernalForm
                          initialValue={{ date: this.state.defaultValue, date1: this.state.defaultValue }}
                          //initialValue={{ date: this.state.defaultValue, date1: this.state.defaultValue }}
                          handleSubmit={this.handleSubmit}
                          formname="daterageform"
                          formContent={daterageform}
                          handleOnChange={this.changeFormValue} />
                      </div>
                      <div className="col-md-4"></div>

                      <div className="row">
                        {this.props.managerSearchedList && (
                          <TableView
                            searchedList={this.props.managerSearchedList}
                            noShow={this.noShow}
                            reAssign={this.reAssign}
                            cancel={this.cancel} />

                        )}
                      </div>

                    </>
                  </div>
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
                  {this.state.cancelData && !this.state.error && (
                    <ModalComponent
                      title={"Cancel Booking"}
                      showModel={this.state.modelShow}
                      handleSubmit={this.handleSubmit}
                      handleClose={this.handleModelClose}
                      isErrorHandler={false}
                    >
                      {" "}
                      <GenernalForm
                        initialValue={{}}
                        handleSubmit={this.formSubmit}
                        handleOnChange={null}
                        formname="cancel"
                        formContent={CommentBox} />
                    </ModalComponent>
                  )}

                  {this.state.cancelLeaveData && !this.state.error && (
                    <ModalComponent
                      title={"Cancel Leave"}
                      showModel={this.state.modelShow}
                      handleSubmit={this.handleLeaveCancelSubmit}
                      handleClose={this.handleLeaveModelClose}
                      isErrorHandler={false}
                    >
                      {" "}
                      <GenernalForm
                        initialValue={{}}
                        handleSubmit={this.formLeaveSubmit}
                        handleOnChange={null}
                        formname="cancel"
                        formContent={CommentBox} />
                    </ModalComponent>
                  )}

                </section>
              </>
            )}
            {this.props.reassigmentData && this.state.closeModel && (
              <ReassignmentComponent
                reassignmentRes={this.props.applyReassigmentRes}
                submitForm={this.props.submitForm}
                reassignment={this.applyReassignment}
                closeModel={this.closeModel}
                applyReassigmentRes={this.props.reassigmentData} />
            )}
          </LoginWrapper>
          <FooterComponent /></>
        </></>
    );
  }
}
const selector = getFormValues("mark-leave");
const searchFormSelector = getFormValues("searchForm");
const daterageformSelector = getFormValues("daterageform");

const mapStateToProps = (state: any) => ({
  managerSearchedList:
    state.businessDetails && state.businessDetails.managerSearchedList,
  managerNoshowRes:
    state.businessDetails && state.businessDetails.managerNoshowRes,
  managerCancelRes:
    state.businessDetails && state.businessDetails.managerCancelRes,
  reassigmentData:
    state.businessDetails && state.businessDetails.reassigmentData,
  applyReassigmentRes:
    state.businessDetails && state.businessDetails.applyReassigmentRes,
  staffList: state.addBusiness && state.addBusiness.staffList,
  staffLeaveRes: state.businessDetails && state.businessDetails.staffLeaveRes,
  futureLeaves: state.businessDetails && state.businessDetails.businessFutureLeaves,
  leaveFormValue: selector(state),
  searchFormValue: searchFormSelector(state),
  daterangeFormValue: daterageformSelector(state),
});
const mapDispatchToProps = (dispatch: any) => ({
  getFutureLeaves: (id: any, data: any) =>
  dispatch(getBusinessFutureLeaves(id, "GET_BUSINESS_FUTURE_LEAVES")),

  getDateRangeSearchResults: (id: any, data: any) =>
  dispatch(getSearchResults(id, data, BusinessSetup.STAFF_USER_BOOKING_REQ)),

  getSearchResults: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.MANAGER_USER_BOOKING_REQ)
    ),
  noShow: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_REQ)
    ),
  cancel: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.MANAGER_USER_BOOKING_CANCEl_REQ)
    ),
  leave: (id: any, data: any) =>
    dispatch(getSearchResults(id, data, "STAFF_ON_LEAVE")),
  getStaffDetails: (id: any) => dispatch(getBusinessStaff(id)),
  getReassignmentData: (id: any, bookingId: any) =>
    dispatch(
      getReassignmentData(
        id,
        bookingId,
        BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_REQ
      )
    ),
  resetReassignmentData: () =>
    dispatch(
      getReassignmentData(
        null,
        null,
        BusinessSetup.MANAGER_USER_BOOKING_RESET_REASSIGN
      )
    ),
  applyReassignment: (id: any, bookingId: any, data: any) =>
    dispatch(
      applyReassignment(
        id,
        bookingId,
        data,
        BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_REQ
      )
    ),
  submitForm: (formname: string) => dispatch(submit(formname)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerViewContainer);