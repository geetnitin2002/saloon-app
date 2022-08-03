// @ts-ignore
import { BusinessSetup } from "custom-actions";

const initialState = {
  addBusinessResponse: null,
  addBusinessErrorResponse: null,
  businessId: null,
  serviceList: [],
  staffList: []
} as any;
/**
 * @description - Switch cases for the dispatched User Actions.
 *
 * @param state - State of the store.
 * @param action - Dispatched action.
 */
const addBusinessReducer = (
  state = initialState,
  action: { type: BusinessSetup; payload?: any }
) => {
  switch (action.type) {
    case BusinessSetup.BUSINESS_ADD_RESPONSE:
      return {
        ...state,
        addBusinessResponse: action.payload,
        businessId: action.payload && action.payload
      };
    case BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_HOUR_FIELDS_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_SETTINGS_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_HOLIDAYS_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_SERVICES_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_ADD_STAFF_RES:
      return {
        ...state,
        addBusinessResponse: action.payload
      };
    case BusinessSetup.BUSINESS_GET_LIST_STAFF_RES:
      return {
        ...state,
        staffList: action.payload
      };
    case BusinessSetup.BUSINESS_GET_LIST_SERVICES_RES:
      return {
        ...state,
        serviceList: action.payload
      };
    case BusinessSetup.BUSINESS_ERROR_RESPONSE:
      return {
        ...state,
        addBusinessErrorResponse: action.payload
      };
    case BusinessSetup.BUSINESS_RESPONSE_RESET:
      return {
        ...state,
        addBusinessResponse: null,
        addBusinessErrorResponse: null
      };
    case "BOOKING_GET_WEEK_RES":
      return {
        ...state,
        weekRangeList: action.payload
      };
    case BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS_RES:
      return {
        ...state,
        businessWorkingHourSlots: action.payload
      };
    case "GET_ALL_BUSINESS_DETAILS": {
      return {
        ...state,
        allBusinessDetails: action.payload
      };
    }
    default:
      return state;
  }
};

export default addBusinessReducer;
