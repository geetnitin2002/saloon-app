import { all } from "redux-saga/effects";
import {
  userLogin,
  userProfileSaga,
  userVerifyEmail,
  userResetPassword,
  userVerifySecurityQuestion,
  addSecurityQuestion,
  signUP,
  getAllSecurityQuestions,
  getuseSecurityQuestion,
} from "./userProfile/userProfileSaga";
import {
  addBusinessSaga,
  updateBusinessSaga,
  addBusinessAddres,
  addBusinessHourss,
  addBusinessExtaInfos,
  addNewBusinessSettings,
  addNewBusinessHoliday,
  addNewBusinessServices,
  addNewBusinessStaff,
  deleteNewBusinessServices,
  deleteNewBusinessStaff,
  getBusinessstaff,
  getBusinesService,
  getBusinessAddres,
  getBusiness,
  getBusinessExtraInf,
  bookTicketSaga,
  getTicketsAvailable,
  getBusinessWorkingHours,
  getBusinessPerWeekRange,
  getBusinesWeek,
    getAllBusinessList,
    getApprovedBusinessList,
    getEditedBusinessList,
    getDisabledBusinessList,
  approveBusinessReq,
  businessImageUpload,
  businessImageDel
} from "./businessSetup/businessSaga";
import {
  getServiceCategoriessAndBusinesses,
  getBusinessLocation,
  SearchForCategoriessAndBusinesses,
  userBookingREq,
  userBookingREqnoShow,
  userBookingREqCancel,
  usergetReassignmentData,
  userapplyReassignment,
  staffuserBookingREq,
  staffUserBookingREqnoShow,
  GetStaffAvailability,
  bookAppointmentReq,
    getAllBusinessDetailReq,
    getApprovedBusinessDetailReq,
    getDisabledBusinessDetailReq,
  staffOnLeaveReq,
  ticketBookingREq,
  ticketBookingREqCancel,
  getBusinessFutureLeavesSaga,
} from "./businessDetail/businessDetailsSaga";
function* rootSaga() {
  yield all([
    userProfileSaga(),
    userLogin(),
    userVerifyEmail(),
    userVerifySecurityQuestion(),
    userResetPassword(),
    addBusinessSaga(),
    updateBusinessSaga(),
    addBusinessAddres(),
    addBusinessHourss(),
    addBusinessExtaInfos(),
    addNewBusinessSettings(),
    addNewBusinessHoliday(),
    addNewBusinessServices(),
    addNewBusinessStaff(),
    deleteNewBusinessServices(),
    deleteNewBusinessStaff(),
    getBusinessstaff(),
    getBusinesService(),
    getBusinessAddres(),
    getBusiness(),
    getBusinessExtraInf(),
    bookTicketSaga(),
    getTicketsAvailable(),
    getBusinessWorkingHours(),
    getBusinessPerWeekRange(),
    getServiceCategoriessAndBusinesses(),
    getBusinessLocation(),
    SearchForCategoriessAndBusinesses(),
    userBookingREq(),
    userBookingREqnoShow(),
    userBookingREqCancel(),
    usergetReassignmentData(),
    userapplyReassignment(),
    staffuserBookingREq(),
    staffUserBookingREqnoShow(),
    getBusinesWeek(),
    GetStaffAvailability(),
    bookAppointmentReq(),
    getAllBusinessDetailReq(),
      getAllBusinessList(),
      getApprovedBusinessDetailReq(),
      getApprovedBusinessList(),
      getEditedBusinessList(),
      getDisabledBusinessList(),
      getDisabledBusinessDetailReq(),
    approveBusinessReq(),
    businessImageUpload(),
    businessImageDel(),
    staffOnLeaveReq(),
    addSecurityQuestion(),
    signUP(),
    getAllSecurityQuestions(),
    getuseSecurityQuestion(),
    ticketBookingREq(),
    ticketBookingREqCancel(),
    getBusinessFutureLeavesSaga(),
  ]);
}

export default rootSaga;
