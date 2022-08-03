// @ts-ignore
import { BusinessSetup } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  addBusinessMain,
  updateBusinessMain,
  addBusinessAddress,
  addBusinessHours,
  addBusinessSettings,
  addBusinessExtraInfo,
  addBusinessHolidays,
  addBusinessService,
  addBusinessStaff,
  deleteBusinessService,
  deleteBusinessStaff,
  getBusinessStaff,
  getBusinessService,
  getBusinessAddressInfo,
  getBusinessMainInfo,
  getBusinessExtraInfo,
  bookTicket,
  getBusinessWorkingHourSlots,
  getBusinessWeekRange,
  getTicketsAvailability,
  getBusinessWeek,
  getAllBusiness,
  allBusinessBookings,
  allBusinessesSheet,
  approveBusiness,
  fileUplads,
    getApprovedBusiness,
    getEditedBusiness,
  getDisabledBusiness,
  disableBusiness,
    deleteBusiness,
    cancelLeave,
  fileDels
} from "../../api/businessApi";
import { enableBusiness } from "../../modules/businessModule/action/addBusinessAction";

export function* addBusinessSaga() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD, addBusiness);
}

function* addBusiness(action: any) {
  let response = yield call(addBusinessMain, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_RESPONSE,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: (response && response.errors) || response.error,
    });
  }
}
export function* updateBusinessSaga() {
  yield takeLatest(BusinessSetup.BUSINESS_UPDATE, updateBusiness);
}

function* updateBusiness(action: any) {
  let response = yield call(updateBusinessMain, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_RESPONSE,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: (response && response.errors) || response.error,
    });
  }
}
export function* getBusiness() {
  yield takeLatest(BusinessSetup.BUSINESS_GET, getBusinessInfo);
}
function* getBusinessInfo(action: any) {
  let response = yield call(getBusinessMainInfo, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_RES,
      payload: response.data,
    });
  }
}

export function* addBusinessAddres() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS, businessAddress);
}
function* businessAddress(action: any) {
  let response = yield call(addBusinessAddress, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}

export function* getBusinessAddres() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS,
    getBusinessAddress
  );
}
function* getBusinessAddress(action: any) {
  let response = yield call(getBusinessAddressInfo, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessExtraInf() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_EXTRA_FIELDS,
    getBusinessExtraInfos
  );
}
function* getBusinessExtraInfos(action: any) {
  let response = yield call(getBusinessExtraInfo, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_EXTRA_FIELDS_RES,
      payload: response.data,
    });
  }
}

export function* addBusinessHourss() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_HOUR_FIELDS, addBusinessHour);
}
function* addBusinessHour(action: any) {
  let response = yield call(addBusinessHours, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_HOUR_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}
export function* addBusinessExtaInfos() {
  yield takeLatest(
    BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS,
    addBusinessExtraInfos
  );
}
function* addBusinessExtraInfos(action: any) {
  let response = yield call(addBusinessExtraInfo, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}
export function* addNewBusinessSettings() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_SETTINGS, addBusinessSettingss);
}
function* addBusinessSettingss(action: any) {
  let response = yield call(addBusinessSettings, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_SETTINGS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}

export function* addNewBusinessHoliday() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_HOLIDAYS, addNewBusinessHolidays);
}
function* addNewBusinessHolidays(action: any) {
  let response = yield call(addBusinessHolidays, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_HOLIDAYS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}

export function* addNewBusinessServices() {
  yield takeLatest(
    BusinessSetup.BUSINESS_ADD_SERVICES,
    addNewBusinessServicess
  );
}
function* addNewBusinessServicess(action: any) {
  let response = yield call(addBusinessService, action.id, action.body);
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_SERVICES_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}
export function* deleteNewBusinessServices() {
  yield takeLatest(
    BusinessSetup.BUSINESS_DELETE_SERVICES,
    deleteBusinessServicess
  );
}
function* deleteBusinessServicess(action: any) {
  let response = yield call(deleteBusinessService, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_DELETE_SERVICES_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response,
    });
  }
}
export function* addNewBusinessStaff() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_STAFF, addBusinessStaffs);
}
function* addBusinessStaffs(action: any) {
  let response = yield call(addBusinessStaff, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_STAFF_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* deleteNewBusinessStaff() {
  yield takeLatest(BusinessSetup.BUSINESS_DELETE_STAFF, deleteBusinessStaffs);
}
export function* getBusinessstaff() {
  yield takeLatest(BusinessSetup.BUSINESS_GET_LIST_STAFF, getBusinessStaffs);
}
function* getBusinessStaffs(action: any) {
  const response = yield call(getBusinessStaff, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_LIST_STAFF_RES,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* getBusinesService() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_LIST_SERVICES,
    getBusinessServicess
  );
}
function* getBusinessServicess(action: any) {
  const response = yield call(getBusinessService, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_LIST_SERVICES_RES,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* getBusinesWeek() {
  yield takeLatest("BOOKING_GET_WEEK", getBusinesWeeks);
}
function* getBusinesWeeks(action: any) {
  const response = yield call(getBusinessWeek, action.id);
  if (response && !response.errors) {
    yield put({
      type: "BOOKING_GET_WEEK_RES",
      payload: response.data,
    });
  } else {
    yield put({
      type: "BOOKING_GET_WEEK_RES_ERROR",
      payload: response && response.errors,
    });
  }
}
export function* getAllBusinessList() {
  yield takeLatest("GET_ALL_BUSINESS", getAllBusines);
}
function* getAllBusines() {
  const response = yield call(getAllBusiness);
  yield put({
    type: "GET_ALL_BUSINESS_RES",
    payload: response,
  });
}

export function* getAllBusinessBookingsList() {
  yield takeLatest("GET_ALL_BUSINESS_BOOKINGS", getAllBusinessBookingList);
}
function* getAllBusinessBookingList() {
  const response = yield call(allBusinessBookings);
  yield put({
    type: "GET_ALL_BUSINESS_BOOKINGS_RES",
    payload: response,
  });
}


export function* getAllBusinessesSheetList() {
  yield takeLatest("GET_ALL_BUSINESSES_SHEET", getAllBusinessesSheet);
}
function* getAllBusinessesSheet() {
  const response = yield call(allBusinessesSheet);
  yield put({
    type: "GET_ALL_BUSINESSES_SHEET_RES",
    payload: response,
  });
}

export function* getApprovedBusinessList() {
    yield takeLatest("GET_APPROVED_BUSINESS", getApprovedBusines);
}
function* getApprovedBusines() {
    const response = yield call(getApprovedBusiness);
    yield put({
        type: "GET_APPROVED_BUSINESS_RES",
        payload: response,
    });
}

export function* getEditedBusinessList() {
    yield takeLatest("GET_EDITED_BUSINESS", getEditedBusines);
}
function* getEditedBusines() {
    const response = yield call(getEditedBusiness);
    yield put({
        type: "GET_EDITED_BUSINESS_RES",
        payload: response,
    });
}

export function* getDisabledBusinessList() {
  yield takeLatest("GET_DISABLED_BUSINESS", getDisabledBusines);
}
function* getDisabledBusines() {
  const response = yield call(getDisabledBusiness);
  yield put({
      type: "GET_DISABLED_BUSINESS_RES",
      payload: response,
  });
}



function* deleteBusinessStaffs(action: any) {
  let response = yield call(deleteBusinessStaff, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_DELETE_STAFF_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* bookTicketSaga() {
  yield takeLatest(BusinessSetup.TICKET_BOOKING_REQ, ticketBooking);
}

function* ticketBooking(action: any) {
  let response = yield call(bookTicket, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.TICKET_BOOKING_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.TICKET_BOOKING_RES,
      payload: response && response,
    });
  }
}
export function* getTicketsAvailable() {
  yield takeLatest(BusinessSetup.GET_TICKETS_AVAILABILITY, ticketAvailable);
}

function* ticketAvailable(action: any) {
  let response = yield call(getTicketsAvailability, action.id, action.name);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.GET_TICKETS_AVAILABILITY_RES,
      payload: response.data,
    });
  }
}
export function* getBusinessWorkingHours() {
  yield takeLatest(
    BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS,
    getBusinessWorkingHour
  );
}

function* getBusinessWorkingHour(action: any) {
  let response = yield call(getBusinessWorkingHourSlots, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessPerWeekRange() {
  yield takeLatest(BusinessSetup.BUSINESS_wEEK_RANGE, getBusinessWeekRang);
}

function* getBusinessWeekRang(action: any) {
  let response = yield call(getBusinessWeekRange, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_wEEK_RANGE_RES,
      payload: response,
    });
  }
}
export function* approveBusinessReq() {
  yield takeLatest("APPROVE_BUSINESS", approveBusinessReqs);
}

function* approveBusinessReqs(action: any) {
  let response = yield call(approveBusiness, action.id, action.data);
  if (response && !response.errors && !response.error) {
    yield put({
      type: "APPROVE_BUSINESS_RES",
      payload: response,
    });
  } else {
    yield put({
      type: "APPROVE_BUSINESS_RES",
      payload: response,
    });
  }
}
export function* businessImageUpload() {
  yield takeLatest("FILE_UPLOAD", businessImageUploadReq);
}
export function* businessImageDel() {
  yield takeLatest("FILE_DELETE", businessImageDelReq);
}

function* businessImageUploadReq(action: any) {
  let response = yield call(fileUplads, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "FILE_UPLOAD_SUCESS",
      payload: response,
    });
  }
}
function* businessImageDelReq(action: any) {
  let response = yield call(fileDels, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "FILE_DELETE_SUCESS",
      payload: response,
    });
  }
}
export function* disableBusinesses() {
    yield takeLatest(
        BusinessSetup.BUSINESS_DISABLE,
        disableBusines
    );
}
function* disableBusines(action: any) {
    let response = yield call(disableBusiness, action.id, action.body);
    if (response && !response.errors) {
        yield put({
            type: BusinessSetup.BUSINESS_DISABLE_RES,
            payload: response,
        });
    } else {
        yield put({
            type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
            payload: response,
        });
    }
}
export function* enableBusinesses() {
    yield takeLatest(
        BusinessSetup.BUSINESS_ENABLE,
        enableBusines
    );
}
function* enableBusines(action: any) {
    let response = yield call(enableBusiness, action.id, action.body);
    if (response && !response.errors) {
        yield put({
            type: BusinessSetup.BUSINESS_ENABLE_RES,
            payload: response,
        });
    } else {
        yield put({
            type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
            payload: response,
        });
    }
}






export function* deleteBusinesses() {
    yield takeLatest(
        BusinessSetup.BUSINESS_DELETE,
        deleteBusines
    );
}
function* deleteBusines(action: any) {
    let response = yield call(deleteBusiness, action.id, action.body);
    if (response && !response.errors) {
        yield put({
            type: BusinessSetup.BUSINESS_DELETE_RES,
            payload: response,
        });
    } else {
        yield put({
            type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
            payload: response,
        });
    }
}

export function* cancelLeaves() {
    yield takeLatest(
        BusinessSetup.BUSINESS_DELETE,
        cancelLeavee
    );
}
function* cancelLeavee(action: any) {
    let response = yield call(cancelLeave, action.id, action.body);
    if (response && !response.errors) {
        yield put({
            type: BusinessSetup.BUSINESS_DELETE_LEAVE_RES,
            payload: response,
        });
    } else {
        yield put({
            type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
            payload: response,
        });
    }
}


