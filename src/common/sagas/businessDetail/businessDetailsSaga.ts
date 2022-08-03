// @ts-ignore
import { BusinessSetup } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  serviceCategoriessAndBusinesses,
  getBusinessLocationList,
  SearchCategoriessAndBusinesses,
  booking,
  userBookingNoShow,
  userBookingCancel,
  getReassignmentData,
  applyReassignment,
  staffUserBooking,
  getStaffAvailability,
  bookAppointment,
  getBusinessDetails,
  staffOnLeave,
  cancelTickets,
  ticketsbooking,
  markStaffOnleaves,
  getFutureLeaves
} from "../../api/businessApi";
export function* getServiceCategoriessAndBusinesses() {
  yield takeLatest(
    BusinessSetup.GET_BUSINESS_SERVICES_COMBINED,
    getServiceCategoriessAndBusiness
  );
}
function* getServiceCategoriessAndBusiness() {
  let response = yield call(serviceCategoriessAndBusinesses);
  // let response = data;
  if (response) {
    yield put({
      type: BusinessSetup.GET_BUSINESS_SERVICES_COMBINED_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessLocation() {
  yield takeLatest(BusinessSetup.GET_BUSINESS_LOCATIONS, getBusinessLocations);
}
function* getBusinessLocations() {
  let response = yield call(getBusinessLocationList);
  // response.data = [
  //   "palika bazaar, New Delhi, New Delhi",
  //   "CP, New Delhi, New Delhi",
  //   "Sector 60, Mohali, Punjab"
  // ];
  if (response && !response.error && !response.errors) {
    yield put({
      type: BusinessSetup.GET_BUSINESS_LOCATIONS_RES,
      payload: response.data,
    });
  }
}
export function* SearchForCategoriessAndBusinesses() {
  yield takeLatest(
    BusinessSetup.SEARCH_BUSINESS,
    SearchForCategoriessAndBusiness
  );
}
function* SearchForCategoriessAndBusiness(action: any) {
  const response = yield call(SearchCategoriessAndBusinesses, action.body);
  if (response) {
    yield put({
      type: BusinessSetup.SEARCH_BUSINESS_RES,
      payload: response.data,
    });
  }
}

export function* userBookingREq() {
  yield takeLatest(BusinessSetup.MANAGER_USER_BOOKING_REQ, getUserBooking);
}
function* getUserBooking(action: any) {
  let response = yield call(booking, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_RES,
      payload: response.data,
    });
  }
}
export function* ticketBookingREq() {
  yield takeLatest("GET_BOOKED_TICKET", getTicketBooking);
}
function* getTicketBooking(action: any) {
  let response: any = yield call(ticketsbooking, action.id, action.body);
  // response.data = [
  //   {
  //     eventDate: "2020-07-15",
  //     serviceName: "Kayak",
  //     slotClockTime: "1030",
  //     bookerName: "Atul Arora",
  //     bookingNumber: "150-20200715-00000028",
  //     status: "NEW",
  //     ticketsCount: 3,
  //   },
  //   {
  //     eventDate: "2020-07-08",
  //     serviceName: "Kayak",
  //     slotClockTime: "1415",
  //     bookerName: "Regardt",
  //     bookingNumber: "150-20200708-00000029",
  //     status: "NEW",
  //     ticketsCount: 2,
  //   },
  // ];
  if (response && !response.errors && !response.error) {
    yield put({
      type: "GET_BOOKED_TICKET_RES",
      payload: response.data,
    });
  }
}

export function* staffuserBookingREq() {
  yield takeLatest(BusinessSetup.STAFF_USER_BOOKING_REQ, staffgetUserBooking);
}
function* staffgetUserBooking(action: any) {
  let response = yield call(staffUserBooking, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_RES,
      payload: response.data,
    });
  }
}

export function* userBookingREqnoShow() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_REQ,
    UserBookingnoShow
  );
}
function* UserBookingnoShow(action: any) {
  let response = yield call(userBookingNoShow, action.id, action.body);
  //response = true;
  if (response && !response.error && !response.errors) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_RES,
      payload: { error: response.error || response.errors },
    });
  }
}
export function* staffUserBookingREqnoShow() {
  yield takeLatest(
    BusinessSetup.STAFF_USER_BOOKING_NOSHOW_REQ,
    staffUserBookingnoShow
  );
}
function* staffUserBookingnoShow(action: any) {
  let response = yield call(userBookingNoShow, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_NOSHOW_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_NOSHOW_RES,
      payload: { error: response.errors || response.error },
    });
  }
}
export function* userBookingREqCancel() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_CANCEl_REQ,
    UserBookingCancel
  );
}
function* UserBookingCancel(action: any) {
  let response = yield call(userBookingCancel, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_CANCEl_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_CANCEl_RES,
      payload: { error: response.errors || response.error },
    });
  }
}
export function* ticketBookingREqCancel() {
  yield takeLatest("GET_BOOKED_TICKET_CANCEl_REQ", TicketBookingCancel);
}
function* TicketBookingCancel(action: any) {
  let response = yield call(cancelTickets, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: "GET_BOOKED_TICKET_CANCEl_RES",
      payload: response,
    });
  } else {
    yield put({
      type: "GET_BOOKED_TICKET_CANCEl_RES",
      payload: { error: response.errors || response.error },
    });
  }
}
export function* usergetReassignmentData() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_REQ,
    UsergetReassignmentData
  );
}
function* UsergetReassignmentData(action: any) {
  let response = yield call(getReassignmentData, action.id, action.bookingId);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_RES,
      payload: response.data,
    });
  }
}
export function* userapplyReassignment() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_REQ,
    UserapplyReassignment
  );
}
function* UserapplyReassignment(action: any) {
  let response = yield call(
    applyReassignment,
    action.id,
    action.bookingId,
    action.body
  );
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_RES,
      payload: { error: response.errors || "something went wrong" },
    });
  }
}
export function* GetStaffAvailability() {
  yield takeLatest("STAFF_AVAILABILITY_REQ", getStaffsAvailability);
}
function* getStaffsAvailability(action: any) {
  let response = yield call(getStaffAvailability, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "STAFF_AVAILABILITY_RES",
      payload: response.data,
    });
  } else {
    yield put({
      type: "STAFF_AVAILABILITY_RES",
      payload: response,
    });
  }
}
export function* bookAppointmentReq() {
  yield takeLatest("BOOK_APPOINTMENT_REQ", bookAppointmentReqs);
}
function* bookAppointmentReqs(action: any) {
  let response = yield call(bookAppointment, action.id, action.body);
  if (response && response.responseType === "success") {
    yield put({
      type: "BOOK_APPOINTMENT_RES",
      payload: response,
    });
  } else {
    yield put({
      type: "BOOK_APPOINTMENT_RES",
      payload: response,
    });
  }
}
export function* getAllBusinessDetailReq() {
  yield takeLatest("GET_ALL_BUSINESS_DETAILS_REQ", getAllBusinessDetailReqs);
}
function* getAllBusinessDetailReqs(action: any) {
  let response = yield call(getBusinessDetails, action.id);
  if (response && response.responseType === "data") {
    yield put({
      type: "GET_ALL_BUSINESS_DETAILS",
      payload: response.data,
    });
  } else {
    const error =
      response.responseType === "error"
        ? response.data
        : "Server not available try after some time";
    yield put({
      type: "GET_ALL_BUSINESS_DETAILS",
      payload: { error },
    });
  }
}






export function* getApprovedBusinessDetailReq() {
  yield takeLatest("GET_APPROVED_BUSINESS_DETAILS_REQ", getApprovedBusinessDetailReqs);
}
function* getApprovedBusinessDetailReqs(action: any) {
  let response = yield call(getBusinessDetails, action.id);
  if (response && response.responseType === "data") {
    yield put({
      type: "GET_APPROVED_BUSINESS_DETAILS",
      payload: response.data,
    });
  } else {
    const error =
      response.responseType === "error"
        ? response.data
        : "Server not available try after some time";
    yield put({
      type: "GET_APPROVED_BUSINESS_DETAILS",
      payload: { error },
    });
  }
}


export function* getEditedBusinessDetailReq() {
  yield takeLatest("GET_EDITED_BUSINESS_DETAILS_REQ", getEditedBusinessDetailReqs);
}
function* getEditedBusinessDetailReqs(action: any) {
  let response = yield call(getBusinessDetails, action.id);
  if (response && response.responseType === "data") {
    yield put({
      type: "GET_EDITED_BUSINESS_DETAILS",
      payload: response.data,
    });
  } else {
    const error =
      response.responseType === "error"
        ? response.data
        : "Server not available try after some time";
    yield put({
      type: "GET_EDITED_BUSINESS_DETAILS",
      payload: { error },
    });
  }
}








export function* getDisabledBusinessDetailReq() {
  yield takeLatest("GET_DISABLED_BUSINESS_DETAILS_REQ", getDisabledBusinessDetailReqs);
}
function* getDisabledBusinessDetailReqs(action: any) {
  let response = yield call(getBusinessDetails, action.id);
  if (response && response.responseType === "data") {
    yield put({
      type: "GET_DISABLED_BUSINESS_DETAILS",
      payload: response.data,
    });
  } else {
    const error =
      response.responseType === "error"
        ? response.data
        : "Server not available try after some time";
    yield put({
      type: "GET_DISABLED_BUSINESS_DETAILS",
      payload: { error },
    });
  }
}





export function* staffOnLeaveReq() {
  yield takeLatest("STAFF_ON_LEAVE", staffOnLeaveReqs);
}
function* staffOnLeaveReqs(action: any) {
  let response = yield call(markStaffOnleaves, action.id, action.body);
  if (response && response.responseType === "success") {
    yield put({
      type: "STAFF_ON_LEAVE_RES",
      payload: response,
    });
  } else {
    const error =
      response.responseType === "errors"
        ? response.errors
        : "Server not available try after some time";
    yield put({
      type: "STAFF_ON_LEAVE_RES",
      payload: { error },
    });
  }
}

export function* getBusinessFutureLeavesSaga() {
  yield takeLatest("GET_BUSINESS_FUTURE_LEAVES", getBusinessFutureLeaves);
}
function* getBusinessFutureLeaves(action: any) {
  let response = yield call(getFutureLeaves, action.id);
  // let response = data;
  if (response) {
    yield put({
      type: "GET_BUSINESS_FUTURE_LEAVES_RESPONSE",
      payload: response.data,
    });
  }
}
