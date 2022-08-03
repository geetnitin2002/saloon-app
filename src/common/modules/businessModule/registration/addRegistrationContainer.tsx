import React from "react";
import RegistrationFromFields from "./registrationUtils";
import styled from "styled-components";
import { submit, formValueSelector, getFormValues } from "redux-form";
import { connect } from "react-redux";
import RegistrationForm from "./registrationForm";
import AddServiceContainer from "./addServices/addServiceContainer";
import AddStaffContainer from "./addStaff/addStaffContainer";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import {
  addBusiness,
  // added updateBusiness on 13/10/2020
  updateBusiness,
  addBusinessAddress,
  addBusinessHour,
  addBusinessExtraInfo,
  businessResetResponse,
  addBusinessSettings,
  addBusinessHolidays,
  getAllBusinessDetails,
  fileUplad,
  fileDel
} from "../action/addBusinessAction";
import lodash, { indexOf } from "lodash";
import moment from "moment";
import Errorhandler from "../../../components/errorHandlerComponent";
import ModalComponent from "../../../components/modelComponent";
import Loader from "../../../components/loader";
import FileUpload from "./fileUpload";
import { Gallery } from "./gallery";
import {GalleryBeforeSave} from './galleryBeforeSave';
import {getImages} from "../../../api/businessApi";
import ApiConfig from "../../../../apiConfig";
import { threadId } from "worker_threads";
import { title } from "process";
import BUSINESS_APP from "./../../../../apiConfig";
import { useHistory } from "react-router-dom";

const defaultValueHours = {
  startTimeMon: "08:00",
  startTimeTues: "08:00",
  startTimeWed: "08:00",
  startTimeThurs: "08:00",
  startTimeFri: "08:00",
  startTimeSat: "08:00",
  startTimeSun: "00:00",
  endTimeMon: "17:00",
  endTimeWed: "17:00",
  endTimeThurs: "17:00",
  endTimeFri: "17:00",
  endTimeSat: "17:00",
  endTimeSun: "00:00",
  endTimeTues: "17:00",
};
const defaultBusinessSettings = {
  ifPhoneShownOnBookingEmail: "N",
  ifStaffNotifiedFutureBookings: "N",
  preBookingInterval: "30",
  advanceBookingPeriod: "20",
  ifNotifyNoShowToBooker: "N",
};
const TableDiv = styled.div`
  height: 600px;
  padding-top: 40px;
`;
const WizardDiv = styled.div`
  position: relative;
  background: #fff;
  padding: 64px 58px 50px;
  min-height: 720px;
  height: auto;
`;
const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const LoaderBox = styled.div`
  top: 46px;
  left: 165px;
  margin: auto;
`;
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
  margin-left: 10px;
`;

class AddRegistrationContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      step1: {},
      step2: {},
      step3: defaultValueHours,
      step4: {},
      step5: defaultBusinessSettings,
      step6: { members: [{ weburl: "" }] },
      modelShow: true,
      loader: false,
      defaultValue: this.props.location.state,
      fileUpload: {
        myFileMain: null,
        myFile: null,
      },
      tempFileUploader : {
        myFileMain: null,
        myFile: null,
      },
      error: null,
      holidays: null,
      holidayDelete: false,
      updateFinished: false,
      finished: false,
      link: null,
      linkEdit: false,
      linkEditCount: 0,
      deleteImageIndex :null,
      replaceImageIndex :null,
      replaceImageData:null,
      replaceDone:true,
    };
  }
  componentDidMount = () => {
    if (this.state.defaultValue && this.state.defaultValue.businessId) {
      this.props.getAllBusinessDetails(this.state.defaultValue.businessId);
    }
    if (
      !this.state.defaultValue &&
      this.props.location.pathname === "/business-details"
    ) {
      this.props.history.push("/login");
    }
  };
  onBackButtonEvent = (e: any) => {
    e.preventDefault();
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.addBusinessResponse &&
      !this.props.addBusinessErrorResponse &&
      prevProps.addBusinessResponse !== this.props.addBusinessResponse
    ) {
  
      if (this.state.page == 1) {
        this.setState({
          step1: this.props.addBusinessResponse,
        });
      }
      if (this.state.page < 7) {
        if (this.state.page == 5) {
          this.setState({ page: this.state.page + 2 });
        } else {
          this.setState({ page: this.state.page + 1, linkEditCount: 0 });
        }
        this.props.businessResetResponse();
      }
      this.setState({ loader: false });
    } 
    if (
      this.props.addBusinessErrorResponse &&
      prevProps.addBusinessErrorResponse !== this.props.addBusinessErrorResponse
    ) {
      this.setState({ loader: false, modelShow: true });
    }
    if (
      this.props.allBusinessDetails &&
      !this.props.allBusinessDetails.errors &&
      !this.props.allBusinessDetails.error &&
      this.props.allBusinessDetails !== prevProps.allBusinessDetails
    ) {
      this.businessDetails(this.props.allBusinessDetails);
    }
    if (
      this.props.addressInfo &&
      prevProps.addressInfo &&
      !lodash.isEqual(this.props.addressInfo, prevProps.addressInfo)
    ) {
      const link = this.genratedLink();
      this.setState({ link });
    }
    if(this.state.page !== prevState.page && this.state.page === 3) {
      const id=this.props.businessId ? this.props.businessId : this.state.defaultValue && this.state.defaultValue.businessId
      getImages(id).then(res => {
        if(res.data && res.data.Main && res.data.Child){
    //console.log('images',res.data.Child[1])
          this.setState({fileUpload: {
            myFileMain: res.data.Main,
            myFile: res.data.Child.filter(item => item)
            
          }})
        }
      })
    }
  }
  componentWillUnmount() {
    this.setState({
      step5: defaultBusinessSettings,
      step3: defaultValueHours,
      step6: { members: [{ weburl: "" }] },
    });
    window.onpopstate = this.onBackButtonEvent;
  }
  businessDetails = (data: any) => {
    this.setState({
      step1: data.main && RegistrationFromFields.BusinessMainDetail(data.main),
      step4:
        data.extraInfo &&
        RegistrationFromFields.BusinessExtraDetail(data.extraInfo),
      step2: data.address,
      step3: data.workingHours
        ? RegistrationFromFields.BusinessWorkinghourDetails(data.workingHours)
        : defaultValueHours,
      step5:
        data.settings &&
        RegistrationFromFields.BusinessSettingDetails(data.settings),
      holidays: data.holidays,
      link: data.address && data.address.googleMapsUrl,
    });
  };
  nextPage = (e: any) => {
    e.preventDefault();
    if (this.state.page == 7 || this.state.page == 8) {
      this.setState({ page: this.state.page + 1 });
    }
    //commented below lines on 13/10/2020
     else {
      // if (this.props.allBusinessDetails && this.state.page == 1) {
      //   this.setState({ page: this.state.page + 1 });
      // }
      this.props.submitForm("step" + this.state.page);
    }
  };
  handleSubmit = (value: any, _formName: string) => {
    this.setState({ loader: true, error: null });
    this.props.businessResetResponse();
    console.log(value);
    //added below second condition line on 13/10/2020
    /*if (_formName === "step1" && !(this.props.allBusinessDetails && this.props.allBusinessDetails.main)) {
          this.props.addBusiness(value);
        }
          else {
          this.submitForm(
            value,
            _formName,
            this.props.businessId
              ? this.props.businessId
              : this.state.defaultValue && this.state.defaultValue.businessId
          );
        }*/

    
    /*if (_formName === "step1" && !(this.props.allBusinessDetails && this.props.allBusinessDetails.main)) {
      this.props.addBusiness(value);
    }
      else{*/
        if (_formName === "step1" && value.password !== value.confirmPassword) {
          this.setState({error: "Passwords didn't match"});
        }
          else {
            if (_formName === "step1" && value.email !== value.confirmEmail) {
            this.setState({error: "Emails didn't match"});
            }/*
          }
        this.submitForm(
          value,
          _formName,
          this.props.businessId
            ? this.props.businessId
            : this.state.defaultValue && this.state.defaultValue.businessId
        );
    }*/

    /*if (_formName === "step1" && value.password !== value.confirmPassword) {
      this.setState({error: "Passwords didn't match"});
    }
      else{
        if (_formName === "step1" && value.email !== value.confirmEmail){
          this.setState({error: "Emails didn't match"});
        }*/
        else {
          if (_formName === "step1" && !(this.props.allBusinessDetails && this.props.allBusinessDetails.main)) {
           this.props.addBusiness(value);
          }
          else {
          this.submitForm(
            value,
            _formName,
            this.props.businessId
              ? this.props.businessId
              : this.state.defaultValue && this.state.defaultValue.businessId
          );
        }
      }
    }
  };
  submitForm = (value: any, _formName: any, businessId: any) => {
    const edit = this.state.defaultValue && this.state.defaultValue.businessId;
    if (
      _formName === "step3" &&
      (!lodash.isEqual(value, this.state.step4 || {}) ||
        this.state.fileUpload.myFileMain ||
        !edit)
    ) {
      this.setState({
        step4: value,
      });
      const request = {
        weburl: value.weburl ? value.weburl : null,
        contactPhone: value.contactPhone ? value.contactPhone : null,
        writeup: value.writeup ? value.writeup : null,
        userRole: "OWNER",
      };
      const data = new FormData();
      if (
        this.state.fileUpload &&
        this.state.fileUpload.myFileMain &&
        !this.state.fileUpload.error
      ) {
        console.log("uploading",this.state.fileUpload)
        const newdata:any = []
        this.state.fileUpload.myFile.map((imageitem:any)=>{
          if(imageitem.hasOwnProperty('url') && imageitem.url!== ""){
            newdata.push(imageitem)
          }else if(!imageitem.hasOwnProperty('url')) {
            newdata.push(imageitem)
          }
        })
        data.append("mainImage", this.state.fileUpload["myFileMain"][0] || this.state.fileUpload["myFileMain"]);
 
          data.append(
          "otherImage1",
          newdata.length!==0?newdata[0]:null
        );
        data.append(
         "otherImage2",
         newdata.length!==0?newdata[1]:null
        );
        data.append(
          "otherImage3",
          newdata.length!==0?newdata[2]:null
        );
        data.append(
          "otherImage4",
          newdata.length!==0?newdata[3]:null
        );
        data.append("test", "test");
        this.props.fileUplad(businessId, data);
        //01-12-2020
        /*
        setTimeout(() => {
          // this.setState({ page: this.state.page + 1 });

          const fileUpload = {
            myFileMain: null,
            myFile: null,
          };
          this.setState({ loader: false, fileUpload });
        }, 7000);*/
        //01-12-2020
      }
      // let error = 0;
      // if (
      //   this.state.fileUpload &&
      //   this.state.fileUpload.myFileMain === null &&
      //   this.props.location.pathname !== "/business-details"
      // ) {
      //   this.setState({
      //     error: "Please Correct The Working Hours For Monday",
      //     loader: false,
      //   });
      //   error++;
      // } else {
      if (!lodash.isEqual(value, this.state.step4)) {
        this.props.addBusinessExtraInfo(businessId, request);
      } else {
        this.setState({ page: this.state.page + 1, loader: false });
      }
      //}
    } else if (
      (_formName === "step2" && !lodash.isEqual(value, this.state.step2)) ||
      (_formName === "step2" &&
        this.state.linkEditCount &&
        lodash.isEqual(value, this.state.step2))
    ) {
      this.setState({
        step2: value,
      });
      const request = {
        addressLine1: value.addressLine1 ? value.addressLine1 : null,
        addressLine2: value.addressLine2 ? value.addressLine2 : null,
        area: value.cityLocation ? value.cityLocation : null,
        city: value.city ? value.city : null,
        postalCode: value.postalCode ? value.postalCode : null,
        userRole: "OWNER",
        googleMapsUrl: this.state.link,
        latitude: value.latitude ? value.latitude :null,
        longitude: value.longitude ? value.longitude :null
      };
      this.props.addBusinessAddress(businessId, request);
    }
      //added below else-if condition on 13/10/2020
    else if (_formName === "step1" && !lodash.isEqual(value, this.state.step1))
     {
      this.setState({
        step1: value,
      });
      const request = {
        firstName: value.firstName ? value.firstName : null,
        lastName: value.lastName ? value.lastName : null,
        email: value.email ? value.email : null,
        phone: value.phone ? value.phone : null,
        businessName: value.businessName ? value.businessName : null,
        password: value.password ? value.password : null,
      };
      this.props.updateBusiness(businessId, request);
      // end
    } else if (
      _formName === "step4" &&
      (!lodash.isEqual(value, this.state.step3) || !edit)
    ) {
      this.setState({
        step3: value,
      });
      let error = 0;
      const data = lodash.cloneDeep(value);
      if (
        this.replaceValue(value.endTimeMon) <=
          this.replaceValue(value.startTimeMon) &&
        value.startTimeMon !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Monday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeTues) <=
          this.replaceValue(value.startTimeTues) &&
        value.startTimeTues !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Tuesday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeWed) <=
          this.replaceValue(value.startTimeWed) &&
        value.startTimeWed !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Wednesday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeThurs) <=
          this.replaceValue(value.startTimeThurs) &&
        value.startTimeThurs !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Thursday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeFri) <=
          this.replaceValue(value.startTimeFri) &&
        value.startTimeFri !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Friday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeSat) <=
          this.replaceValue(value.startTimeSat) &&
        value.startTimeSat !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Saturday",
          loader: false,
        });
        error++;
      } else if (
        this.replaceValue(value.endTimeSun) <=
          this.replaceValue(value.startTimeSun) &&
        value.startTimeSun !== "00:00"
      ) {
        this.setState({
          error: "Please Correct The Working Hours For Sunday",
          loader: false,
        });
        error++;
      }
      const request = {
        monHours: data["startTimeMon"] + "-" + data["endTimeMon"],
        tuesHours: data["startTimeTues"] + "-" + data["endTimeTues"],
        wedHours: data["startTimeWed"] + "-" + data["endTimeWed"],
        thursHours: data["startTimeThurs"] + "-" + data["endTimeThurs"],
        friHours: data["startTimeFri"] + "-" + data["endTimeFri"],
        satHours: data["startTimeSat"] + "-" + data["endTimeSat"],
        sunHours: data["startTimeSun"] + "-" + data["endTimeSun"],
        userRole: "OWNER",
      };
      if (error == 0) {
        this.props.addBusinessHour(businessId, request);
      }
    } else if (
      _formName === "step5" &&
      (!lodash.isEqual(value, this.state.step5) || !edit)
    ) {

      /*if (this.state.step5 != null && this.state.step5.advanceBookingPeriod > value.advanceBookingPeriod ) {
        this.setState({
          error: "Advance booking window can only be increased",
          loader: false,
        });
        return;
      }*/

      this.setState({
        step5: value,
      });
      const request = {
        ifPhoneShownOnBookingEmail: value.ifPhoneShownOnBookingEmail
          ? value.ifPhoneShownOnBookingEmail
          : "N",
        ifStaffNotifiedFutureBookings: value.ifStaffNotifiedFutureBookings
          ? value.ifStaffNotifiedFutureBookings
          : "N",
        preBookingInterval: value.preBookingInterval
          ? value.preBookingInterval
          : "45",
        advanceBookingPeriod: value.advanceBookingPeriod
          ? value.advanceBookingPeriod
          : 20,
        ifNotifyNoShowToBooker: value.ifNotifyNoShowToBooker
          ? value.ifNotifyNoShowToBooker
          : "N",
        userRole: "OWNER",
      };
      this.props.addBusinessSettings(businessId, request);
    } else if (
      _formName === "step16" &&
      (!lodash.isEqual(value, this.state.step6) || this.state.holidayDelete)
    ) {
      this.setState({
        step6: value,
        holidayDelete: false,
      });
      const data = lodash.cloneDeep(value);
      let holiday: any = this.state.holidays || [];
      if (data.members) {
        data.members.forEach((element: any) => {
          if (element && element.date) {
            holiday.push(moment(element.date).format("DD/MM/YYYY"));
            if (element && element.date1) {
              holiday.push(moment(element.date1).format("DD/MM/YYYY"));
            }
          }
        });
      }

      const request = {
        holiday,
        userRole: "OWNER",
      };
      this.props.addBusinessHolidays(businessId, request);
    } else {
      if (this.state.page == 5) {
        this.setState({ page: this.state.page + 2 });
      } else {
        this.setState({ page: this.state.page + 1 });
      }
      this.setState({ loader: false });
    }
  };
  replaceValue = (value: any) => {
    return value && value.replace(":", "");
  };
  formFinished = (e: any) => {
    e.preventDefault();
    const formRequest = {
      ...this.state.step1,
      ...this.state.step2,
      ...this.state.step3,
      ...this.state.step4,
    };
  };

  previousPage = (e: any) => {
    e.preventDefault();
    if (this.state.page > 1 ) {
      if (this.state.page - 1 == 6) {
        this.setState({ page: this.state.page - 2 });
      } else {
        this.setState({ page: this.state.page - 1 });
      }
    if (this.props.businessId) {
      this.props.getAllBusinessDetails(this.props.businessId);
    }
    }
  };
  currentStyle = (page: number, count: number) => {
    return page !== count
      ? {
          display: "none",
        }
      : {};
  };
  handleModelClose = () => {
    this.setState({ modelShow: false });
    this.props.businessResetResponse();
  };
  ModelClose = () => {
    this.setState({ error: null, finished: false });
  };
  onChangeHandler = (event: any) => {
    const fileUpload = this.state.fileUpload;
    const name = event.target.name;
    fileUpload[name] = event.target.files[0];
    this.setState({
      fileUpload,
    });
  };
  //added deleteImageIndex, replaceImageIndex, replaceImageData on 13/10/2020
  fileUploadHandler = (row: any, index: any) => {
    if(index === 0) {
      this.setState({fileUpload: {
        //myFileMain: row.myFileMain[0], 18-11-2020
		myFileMain: row.myFileMain && row.myFileMain.length !==0 &&row.myFileMain[0],
        myFile: this.state.fileUpload.myFile
      }})
    } else{
    if(this.state.fileUpload && this.state.fileUpload.myFileMain){
      let myFile;
      if(this.state.fileUpload.myFile){
        myFile = [...this.state.fileUpload.myFile, ...row.myFile];
      } else{
        myFile = row.myFile;
      }
      this.setState({fileUpload: {
        myFileMain: this.state.fileUpload.myFileMain,
        myFile: myFile
      }
    })
    } else{
      this.setState({
        fileUpload: {
          //myFileMain: row.myFileMain[0], 18-11-2020
		  myFileMain: row.myFileMain && row.myFileMain.length !==0 &&row.myFileMain[0],
          myFile: row.myFile || []
        },
        deleteImageIndex : null,
        replaceImageIndex : null,
        replaceImageData: null
      });
    }
  }
  };
  isTicketBased = () => {
    const isTicket: any = this.props.serviceList.filter(
      (element: any) => element.ifTicketBasedService === "N"
    );
    return isTicket.length > 0;
  };
  disableNextButton: any = () => {
    if (!this.props.serviceList || this.props.serviceList.length < 0) {
      return {
        width: "152px",
        borderRadius: "4px",
        pointerEvents: "none",
        cursor: "default",
      };
    }
    return { width: "152px", borderRadius: "4px" };
  };
  disableButton: any = () => {
    if (!this.props.serviceList || this.props.serviceList.length < 0) {
      return {
        width: "152px",
        borderRadius: "4px",
        pointerEvents: "none",
        cursor: "default",
      };
    } else if (
      (!this.props.staffList || this.props.staffList.length < 0) &&
      this.state.page == 8
    ) {
      return {
        width: "152px",
        borderRadius: "4px",
        pointerEvents: "none",
        cursor: "default",
      };
    }
    return { width: "152px", borderRadius: "4px" };
  };
  deleteHandlerHoliday = (item: any) => {
    let index = this.state.holidays.findIndex((row: any) => row === item);
    let data = this.state.holidays;
    if (index != -1) {
      data.splice(index, 1);
      this.setState({ holidays: data, holidayDelete: true });
    }
  };
  
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  finish = () => {
    this.setState({ finished: true });
  };
  updateFinish = () => {
    this.setState({ updateFinished: true });
  };
  finishClose = () => {
    //window.location.reload();
      this.props.history.push(`${BUSINESS_APP.BUSINESS_APP}`);
      //this.props.history.replace(`${BUSINESS_APP.BUSINESS_APP}`);
      if (localStorage.getItem("userDetail")) {
          var userDetails: any = localStorage.getItem("userDetail");
          console.log(JSON.parse(userDetails));
          userDetails = JSON.parse(userDetails);
          if (userDetails.roles.length > 0 && userDetails.roles[0] !== "REVIEWER") {
              window.location.assign(`${BUSINESS_APP.BUSINESS_APP}`);
          }
          else if (userDetails.roles.length > 0 && userDetails.roles[0] === "REVIEWER") {
              this.props.history.replace('/reviewer');
          }
      }
      else
          window.location.assign(`${BUSINESS_APP.BUSINESS_APP}`);
  }
  updateFinishClose = () => {
    //window.location.reload();
    if (localStorage.getItem("userDetail")) {
      var userDetails: any = localStorage.getItem("userDetail");
      console.log(JSON.parse(userDetails));
      userDetails = JSON.parse(userDetails);
      //if (userDetails.roles.length > 0 && userDetails.roles[0] === "ADMIN") {
      if (userDetails.roles.length > 0 && userDetails.roles[0] !== "REVIEWER") {
        const path = {
          pathname: "/manager-view/" + this.state.defaultValue.businessId,
          state: { userId: userDetails.userId },
        };
        this.props.history.push(path);
      }
      else if (userDetails.roles.length > 0 && userDetails.roles[0] === "REVIEWER") {
        this.props.history.replace('/reviewer');
      }
    };
  }
  genratedLink = () => {
    const add = !this.props.addressInfo.addressLine2
      ? `${this.props.addressInfo.addressLine1}+${this.props.addressInfo.cityLocation}+${this.props.addressInfo.city}+${this.props.addressInfo.postalCode}`
      : `${this.props.addressInfo.addressLine1}+${this.props.addressInfo.addressLine2}+${this.props.addressInfo.cityLocation}+${this.props.addressInfo.city}+${this.props.addressInfo.postalCode}`;
    return "https://www.google.com/maps/search/" + add;
  };
  getLink = () => {
    if (this.state.link) {
      return this.state.link;
    }
    return this.genratedLink();
  };
  editLinkHandler = () => {
    this.setState({
      linkEdit: !this.state.linkEdit,
      linkEditCount: this.state.linkEdit ? 1 : 0,
    });
  };
  linkChange = (value: any) => {
    this.setState({ link: value.target.value });
  };
  getGeneratedLink = () => {
    const link = this.getLink();
    if (!this.state.link && link !== this.state.link) {
      this.setState({ link });
    }
    return (
      <>
        {!this.state.linkEdit && (
          <>
            <a style={{ color: "#123145" }} href={link} target="_blank">
              {link}
            </a>
            <A href={void 0} onClick={() => this.editLinkHandler()}>
              <i className="zmdi zmdi-edit"></i>
            </A>
          </>
        )}
        {this.state.linkEdit && (
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="link"
              className="form-control"
              autoComplete={"off"}
              style={{ width: "95%", paddingLeft: "0px" }}
              value={link}
              onChange={this.linkChange}
            />
            <A href={void 0} onClick={() => this.editLinkHandler()}>
              <i className="zmdi zmdi-check zmdi-hc-2x"></i>
            </A>
          </div>
        )}
      </>
    );
  };

  
//03-12-2020
deleteImage = (index:any, file: any) =>{
    console.log("djfkjds")
    //console.log(file)
    if(index === 0) {
     /// alert("main")
      let myFileMain = this.state.fileUpload.myFileMain || '';
      myFileMain = null;
      //  myFile.splice(0, 1);
      this.setState({fileUpload: {
        myFileMain: myFileMain,
      myFile: this.state.fileUpload.myFile
      }})
     
    }
    else {
     // alert("sample")
      let myFile = this.state.fileUpload.myFile ;
     // alert(myFile)
        myFile.splice(index-1, 1);
      this.setState({fileUpload: {
        myFileMain: this.state.fileUpload.myFileMain,
        myFile: myFile 
      }})
    }
	if(typeof(file.url) === "string" && file.name) {
      const id=this.props.businessId ? this.props.businessId : this.state.defaultValue && this.state.defaultValue.businessId
     // let fileName = `${ApiConfig.IMAGE_URL}Bid_${id}_Image${index===0 ? "_Main" : index}.png`;
      this.deleteSavedImage(file.name, index);
    }
  }
  
  //03-12-2020
  
  /*//added deleteImage on 13/10/2020
  deleteImage = (index:any, file: any) =>{
    //console.log(file)
    if(index === 0) {
      let myFileMain = this.state.fileUpload.myFileMain || '';
      myFileMain = null;
      //  myFile.splice(0, 1);
      this.setState({fileUpload: {
        myFileMain: myFileMain,
     //   myFile: myFile || []
      }})
    } else{
      let myFile = this.state.fileUpload.myFile ? [...this.state.fileUpload.myFile] : [];
        myFile.splice(index-1, 1);
      this.setState({fileUpload: {
        myFileMain: this.state.fileUpload.myFileMain,
        myFile: myFile || []
      }})
    }
    if(typeof(file.url) === "string" && file.name) {
      const id=this.props.businessId ? this.props.businessId : this.state.defaultValue && this.state.defaultValue.businessId
     // let fileName = `${ApiConfig.IMAGE_URL}Bid_${id}_Image${index===0 ? "_Main" : index}.png`;
      this.deleteSavedImage(file.name, index);
    }
  }
*/

  //added replaceImage on 13/10/2020
  replaceImage = (file:any, index:any, prevFile: any) =>{
      if(index === 0) {
        this.setState({fileUpload: {
          myFileMain: file[0],
          myFile: this.state.fileUpload.myFile
        }})
      } else{
        let myFile = [...this.state.fileUpload.myFile];
        myFile[index-1] = file[0];
        console.log("replace image",myFile)
        this.setState({fileUpload: {
          myFileMain: this.state.fileUpload.myFileMain,
          myFile: myFile
        }})
      }
      if(typeof(prevFile) === "string") {
        const id=this.props.businessId ? this.props.businessId : this.state.defaultValue && this.state.defaultValue.businessId
        let fileName = `${ApiConfig.IMAGE_URL}Bid_${id}_Image${index===0 ? "_Main" : index}.png`;
        this.updateImage(file[0], fileName);
      }
      // this.setState({ 
      //   replaceImageIndex : index,
      //   replaceImageData : file
      // })
  }
  addImage = (filename:any) =>{
    var newfileUpload = this.state.fileUpload;
    if(newfileUpload.myFile && newfileUpload.myFile.length){
      console.log("**newfileUpload.myFile*",...newfileUpload.myFile)
      console.log("**filename",filename.target.files)
     //Add
     newfileUpload.myFile  = [...newfileUpload.myFile,...filename.target.files]
    }else{
      newfileUpload.myFile = filename.target.files;
    }
    this.setState({
        fileUpload : newfileUpload
    },()=>{
    // this.fileUploadHandler(this.state.fileUpload)
    })
  }
 
  //added updateImage on 14/10/2020
  updateImage = (file:any, fileName:any,) => {
    let businessId = this.props.businessId
          ? this.props.businessId
          : this.state.defaultValue && this.state.defaultValue.businessId

   this.setState({ loader: true});
   let name= this.getFileName(fileName.slice(72))
         const payload = new FormData();
         payload.append(name, file[0]);
           payload.append("test", "test");
        this.props.fileUplad(businessId, payload);
        setTimeout(() => {
              this.setState({ loader: false})
        }, 7000);
  }

//added deleteSavedImage on 14/10/2020
deleteSavedImage = (fileName:any,index:any) => {
   this.setState({ loader: true});
   let name= this.getFileName(fileName.slice(72))
   let fileNaming = fileName.split('/')
   const businessId =   this.props.businessId
          ? this.props.businessId
          : this.state.defaultValue && this.state.defaultValue.businessId
         const payload = {
              'Image':
              fileNaming[fileNaming.length-1]
         };
        this.props.fileDel(businessId, payload);
        setTimeout(() => {
        this.setState({ loader: false})
        }, 7000);
  }

//added getFileName on 14/10/2020
  getFileName=(name:any)=>{
      switch(name){
        case 'Image_Main.png':
          return 'mainImage';
        case 'Image1.png':
          return 'otherImage1';
        case 'Image2.png':
          return 'otherImage2';
        case 'Image3.png':
          return 'otherImage3';
        case 'Image4.png' :
          return 'otherImage4';
          default:
            return ''
      }
  }

  render() {
    const { page } = this.state;
    const status =
      this.props.allBusinessDetails &&
      this.props.allBusinessDetails.main &&
      this.props.allBusinessDetails.main.status;
    const formFieldsStep6 = lodash.cloneDeep(
      RegistrationFromFields.formFieldsStep6
    );
     return (
      <>
        {page !== 7 && page !== 8 && (
          <WizardDiv className="clearfix">
            {/* <RegistrationStep page={page} /> */}
            {page === 1 && (
              <RegistrationForm
                initialValue={this.state.step1}
                handleSubmit={(value: any) => this.handleSubmit(value, "step1")}
                formname="step1"
                sectionTitle="Let's Setup Your Business"
                formContent={RegistrationFromFields.DisableFormField(
                  RegistrationFromFields.formFieldsStep1,
                  status
                )}
              />
            )}
            {page === 3 && (
              <>
                <RegistrationForm
                  initialValue={this.state.step4}
                  handleSubmit={(value: any) =>
                    this.handleSubmit(value, "step3")
                  }
                  formname="step3"
                  sectionTitle="Business Information"
                  formContent={RegistrationFromFields.DisableFormFields(
                    RegistrationFromFields.formFieldsStep4,
                    status
                  )}
                />
                <Hr />
                  {/* added deleteImageIndex, replaceImageIndex, replaceImageData on 13/10/2020 */}
                <FileUpload
                  replaceImageData = {this.state.replaceImageData}
                  replaceImageIndex = {this.state.replaceImageIndex}
                  deleteImageIndex = {this.state.deleteImageIndex}
                  uploadFile={this.fileUploadHandler}
                  //disable={status && status === "APPROVED"}
                />
          
          
                    <GalleryBeforeSave
                    number = {0}
                    replaceImage={this.replaceImage}
                    deleteImage={this.deleteImage}
                    addImage={this.addImage}
                    imageArray={this.state.fileUpload.myFile}
                    myFileMain={this.state.fileUpload.myFileMain}
                    id={
                      this.props.businessId
                        ? this.props.businessId
                        : this.state.defaultValue &&
                          this.state.defaultValue.businessId
                    }
                    />
              </>
            )}
            {page === 2 && (
              <>
                <RegistrationForm
                  initialValue={this.state.step2}
                  handleSubmit={(value: any) =>
                    this.handleSubmit(value, "step2")
                  }
                  formname="step2"
                  sectionTitle="Business Address"
                  formContent={RegistrationFromFields.DisableFormFields(
                    RegistrationFromFields.formFieldsStep2,
                    status
                  )
                }
                />
                <div className="form-col"> <label> Map Address Link to be used for Business </label></div>
                <div className="wkdd">
                {this.props.addressInfo &&
                  this.props.addressInfo.addressLine1 &&
                  this.props.addressInfo.postalCode &&
                  this.props.addressInfo.city &&
                  this.props.addressInfo.cityLocation &&
                  this.props.addressInfo.latitude &&
                  this.props.addressInfo.latitude&&
                  this.getGeneratedLink()}
                  </div>
              </>
            )}
            {page === 4 && (
              <RegistrationForm
                initialValue={this.state.step3}
                handleSubmit={(value: any) => this.handleSubmit(value, "step4")}
                formname="step4"
                sectionTitle="Business Working Hours"
                formContent={RegistrationFromFields.DisableFormFields(
                  RegistrationFromFields.formFieldsStep3,
                  status
                )}
              />
            )}
            {page === 5 && (
              <RegistrationForm
                initialValue={this.state.step5}
                handleSubmit={(value: any) => this.handleSubmit(value, "step5")}
                formname="step5"
                sectionTitle="Business Preferences"
                formContent={RegistrationFromFields.DisableFormFields(
                  RegistrationFromFields.formFieldsStep5,
                  status
                )}
              />
            )}
            {page === 6 && (
              <>
                <RegistrationForm
                  initialValue={this.state.step6}
                  handleSubmit={(value: any) =>
                    this.handleSubmit(value, "step6")
                  }
                  formname="step6"
                  sectionTitle="Mark Holidays"
                  formContent={RegistrationFromFields.DisableFormFields(
                    formFieldsStep6,
                    status
                  )}
                  otherInfo={this.state.holidays}
                  dynamicForm={true}
                  deleteHandler={this.deleteHandlerHoliday}
                />
              </>
            )}
            <Hr />
            {this.state.loader && <LoaderBox className="loader" />}
            <div className="actions clearfix">
              <ul role="menu" aria-label="Pagination">
                <li
                  className={page === 1 ? "disabled" : ""}
                  aria-disabled={page === 1 ? "true" : "false"}
                >
                  <a href={void 0} onClick={this.previousPage} role="menuitem">
                    Back
                  </a>
                </li>
                {page !== 8 && (
                  <li aria-hidden="false" aria-disabled="false">
                    <a href={void 0} onClick={this.nextPage} role="menuitem">
                      Next
                    </a>
                  </li>
                )}
              </ul>
              {page === 1 &&
                this.props.addBusinessResponse &&
                this.props.addBusinessResponse.errors && (
                  <p className="error">
                    {this.props.addBusinessResponse.errors}
                  </p>
                )}
            </div>
          </WizardDiv>
        )}
        {(page === 7 || page === 8) && (
          <form>
            <TableDiv>
              {page === 7 && (
                <AddServiceContainer
                  step={page}
                  businessId={
                    this.state.defaultValue &&
                    this.state.defaultValue.businessId
                      ? this.state.defaultValue.businessId
                      : this.props.businessId
                  }
                  status={
                    this.props.allBusinessDetails &&
                    this.props.allBusinessDetails.main &&
                    this.props.allBusinessDetails.main.status
                  }
                  edit={
                    this.state.defaultValue &&
                    this.state.defaultValue.businessId
                  }
                />
              )}
              {page === 8 && (
                <AddStaffContainer
                  businessId={
                    this.state.defaultValue &&
                    this.state.defaultValue.businessId
                      ? this.state.defaultValue.businessId
                      : this.props.businessId
                  }
                  edit={
                    this.state.defaultValue &&
                    this.state.defaultValue.businessId
                  }
                  status={
                    this.props.allBusinessDetails &&
                    this.props.allBusinessDetails.main &&
                    this.props.allBusinessDetails.main.status
                  }
                />
              )}
              {(page === 7 || page === 8) && (
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <a
                        href={void 0}
                        onClick={this.previousPage}
                        className="abtn"
                        style={this.disableButton()}
                      >
                        Back
                      </a>
                    </div>
                    <div className="form-col"></div>
                    <div className="form-col"></div>

                    {page !== 8 && this.isTicketBased() && (
                      <div className="form-col">
                        <a
                          href={void 0}
                          onClick={this.nextPage}
                          className="abtn"
                          style={this.disableNextButton()}
                        >
                          Next
                        </a>
                      </div>
                    )}
                      {page === 8 && status === "APPROVED" &&
                      (
                        //this.state.userRole &&
                        //this.state.userRole.role === "REVIEWER"  && (
                        //this.props.location.pathname !== "/business-details" && (
                        <div className="form-col">
                          <a
                            href={void 0}
                            className="abtn"
                            onClick={this.updateFinish}
                            style={{
                              width: "152px",
                              borderRadius: "4px",
                            }}
                            role="menuitem"
                          >
                            Update Business
                          </a>
                        </div>
                      )
                      }
                      {page === 8 && status !== "APPROVED" && (
                      //this.state.userRole &&
                      //this.state.userRole.role === "REVIEWER"  && (
                      //this.props.location.pathname !== "/business-details" && (
                        <div className="form-col">
                          <a
                            href={void 0}
                            className="abtn"
                            onClick={this.finish}
                            style={{
                              width: "152px",
                              borderRadius: "4px",
                            }}
                            role="menuitem"
                          >
                            Complete Setup
                          </a>
                        </div>
                      )
                      }
                  </div>
                </div>
              )}
            </TableDiv>
          </form>
        )}
        {(this.props.addBusinessErrorResponse !== null ||
          (this.props.allBusinessDetails &&
            this.props.allBusinessDetails.errors) ||
          (this.props.allBusinessDetails &&
            this.props.allBusinessDetails.error)) &&
          this.state.modelShow && (
            <ModalComponent
              title={"Error Details"}
              showModel={this.state.modelShow}
              handleSubmit={null}
              handleClose={this.handleModelClose}
              isErrorHandler={true}
            >
              <Errorhandler
                error={
                  this.props.addBusinessErrorResponse ||
                  this.props.allBusinessDetails.errors ||
                  this.props.allBusinessDetails.error
                }
              />
            </ModalComponent>
          )}
        {this.state.error && (
          <ModalComponent
            title={"Error"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.ModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.state.error} />
          </ModalComponent>
        )}
        {this.state.finished && (
          <ModalComponent
            title={"Complete"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.finishClose}
            isErrorHandler={false}
            showSaveButton={true}
          >
            Setup Complete. Your details are being reviewed by the Lettuce Book
            team - we will let you know once we have activated your business.
          </ModalComponent>
        )}
        {this.state.updateFinished && (
          <ModalComponent
            title={"Complete"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.updateFinishClose}
            isErrorHandler={false}
            showSaveButton={true}
          >
            Amandments complete. Your changes are being reviewed by the Lettuce Book
            team - we will let you know once we have completed them.
          </ModalComponent>
        )}
      </>
    );
  }
}
const selector = getFormValues("step2");
const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  businessId: state.addBusiness && state.addBusiness.businessId,
  addBusinessResponse:
    state.addBusiness && state.addBusiness.addBusinessResponse,
  addBusinessErrorResponse:
    state.addBusiness && state.addBusiness.addBusinessErrorResponse,
  allBusinessDetails: state.addBusiness && state.addBusiness.allBusinessDetails,
  userLoginDetails:
    state.user &&
    state.user.loginResponse &&
    state.user &&
    state.user.loginResponse.data,
  staffList: state.addBusiness && state.addBusiness.staffList,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
  addressInfo: selector(state),
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  addBusiness: (data: any) => dispatch(addBusiness(data)),
    addBusinessAddress: (id: number, data: any) =>
    dispatch(addBusinessAddress(id, data)),
  //added updateBusiness on 13/10/2020
  updateBusiness: (id: number, data: any) =>
    dispatch(updateBusiness(id, data)),
  addBusinessHour: (id: number, data: object) =>
    dispatch(addBusinessHour(id, data)),
  addBusinessExtraInfo: (id: number, data: object) =>
    dispatch(addBusinessExtraInfo(id, data)),
  businessResetResponse: () => dispatch(businessResetResponse()),
  addBusinessSettings: (id: number, data: object) =>
    dispatch(addBusinessSettings(id, data)),
  addBusinessHolidays: (id: number, data: object) =>
    dispatch(addBusinessHolidays(id, data)),
  getAllBusinessDetails: (id: any) => dispatch(getAllBusinessDetails(id)),
  fileUplad: (id: any, data: any) => dispatch(fileUplad(id, data)),
  fileDel: (id: any, data: any) => dispatch(fileDel(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRegistrationContainer);
