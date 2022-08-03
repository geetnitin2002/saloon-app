// @ts-ignore
import { BusinessSetup } from "custom-actions";

const initialState = {
  addressDetail: null,
  businessInfo: null,
  businessExtraInfo: null,
  ticketBookingRes: null,
  ticketsAvailable: null,
  serviceCategoriessAndBusinesses: [],
  locationsList: [],
  searchList: [],
  managerSearchedList: null,
  managerNoshowRes: null,
  managerCancelRes: null,
  reassigmentData: null,
  applyReassigmentRes: null,
  staffSearchedList: null,
  staffNoshowRes: null,
} as any;

const locationList = (state: any, action: any) => {
  let list = action.payload;
  const updatedList = [];
  for (let i = 0; i < list.length; i++) {
    updatedList.push({ label: list[i], value: list[i] });
  }
  return {
    ...state,
    locationsList: updatedList,
  };
};

/**
 * @description - Switch cases for the dispatched User Actions.
 *
 * @param state - State of the store.
 * @param action - Dispatched action.
 */
const BusinessDetailsReducer = (
  state = initialState,
  action: { type: BusinessSetup; payload?: any }
) => {
  switch (action.type) {
    case BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS_RES:
      return {
        ...state,
        addressDetail: action.payload,
      };
    case BusinessSetup.BUSINESS_GET_RES:
      return {
        ...state,
        businessInfo: action.payload,
      };
    case BusinessSetup.BUSINESS_GET_EXTRA_FIELDS_RES:
      return {
        ...state,
        businessExtraInfo: action.payload,
      };
    case BusinessSetup.TICKET_BOOKING_RES:
      return {
        ...state,
        ticketBookingRes: action.payload,
      };
    case BusinessSetup.TICKET_BOOKING_RESET:
      return {
        ...state,
        ticketBookingRes: null,
      };
    case BusinessSetup.GET_TICKETS_AVAILABILITY_RES:
      return {
        ...state,
        ticketsAvailable: action.payload,
      };
    case BusinessSetup.GET_BUSINESS_SERVICES_COMBINED_RES:
      return {
        ...state,
        serviceCategoriessAndBusinesses: action.payload,
      };
    case BusinessSetup.SEARCH_BUSINESS_RES:
      return {
        ...state,
        searchList: action.payload,
      };
    case BusinessSetup.GET_BUSINESS_LOCATIONS_RES:
      return locationList(state, action);
    case BusinessSetup.MANAGER_USER_BOOKING_RES:
      const staffAvailablity = action.payload.staffAvailablity;
      staffAvailablity.map((row: any) => {
        row.show = false;
        return row;
      });
      action.payload.staffAvailablity = staffAvailablity;
      return {
        ...state,
        managerSearchedList: action.payload,
        managerNoshowRes: null,
      };
    case BusinessSetup.STAFF_USER_BOOKING_RES:
      return {
        ...state,
        staffSearchedList: action.payload,
        staffNoshowRes: null,
        managerCancelRes: null,
        reassigmentData: null,
      };
    case BusinessSetup.MANAGER_USER_BOOKING_CANCEl_RES:
      return {
        ...state,
        managerCancelRes: action.payload,
      };
    case BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_RES:
      return {
        ...state,
        managerNoshowRes: action.payload,
      };
    case "GET_BOOKED_TICKET_RES":
      return {
        ...state,
        bookedTicketList: action.payload,
      };
    case "GET_BOOKED_TICKET_CANCEl_RES":
      return {
        ...state,
        ticketCancelRes: action.payload,
      };
    case BusinessSetup.STAFF_USER_BOOKING_NOSHOW_RES:
      return {
        ...state,
        staffNoshowRes: action.payload,
      };
    case BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_RES:
      return {
        ...state,
        reassigmentData: action.payload,
      };
    case BusinessSetup.MANAGER_USER_BOOKING_RESET_REASSIGN:
      return {
        ...state,
        reassigmentData: null,
        applyReassigmentRes: null,
      };
    case BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_RES:
      return {
        ...state,
        applyReassigmentRes: action.payload,
      };
    case "STAFF_AVAILABILITY_RES":
      return {
        ...state,
        staffAvailablityRes: action.payload,
      };
    case "BOOK_APPOINTMENT_RES":
      return {
        ...state,
        serviceBookingRes: action.payload,
      };
    case "BOOK_APPOINTMENT_RESET":
      return {
        ...state,
        serviceBookingRes: null,
        staffAvailablityRes: null,
      };
    case "GET_ALL_BUSINESS_RES":
      return {
        ...state,
        allBusinessResponse: action.payload,
      };
    case "APPROVE_BUSINESS_RES":
      return {
        ...state,
        approveResponse: action.payload,
      };
    case "STAFF_ON_LEAVE_RES":
      return {
        ...state,
        staffLeaveRes: action.payload,
      };
    case BusinessSetup.BUSINESS_DELETE_SERVICES_RES:
      return {
        ...state,
        deleteServiceRes: action.payload,
      };
    case BusinessSetup.BUSINESS_ERROR_RESPONSE:
      return {
        ...state,
        deleteServiceRes: action.payload,
      };
    case BusinessSetup.BUSINESS_DELETE_STAFF_RES:
      return {
        ...state,
        deleteStaffRes: action.payload,
      };
    case BusinessSetup.BUSINESS_ERROR_RESPONSE:
      return {
        ...state,
        deleteStaffRes: action.payload,
      };


    case BusinessSetup.BUSINESS_DISABLE_RES:
      return {
        ...state,
        disableRes: action.payload,
      };





      
    case BusinessSetup.BUSINESS_DELETE_LEAVE_RES:
      return {
        ...state,
        disableRes: action.payload,
      };



    case BusinessSetup.BUSINESS_DELETE_RES:
      return {
        ...state,
        deleteRes: action.payload,
      };


      case BusinessSetup.BUSINESS_ENABLE_RES:
        return {
          ...state,
          enableRes: action.payload,
        };

    case "GET_APPROVED_BUSINESS_RES":
      return {
        ...state,
        approvedBusinessResponse: action.payload,
          };


    case "GET_ALL_BUSINESS_BOOKINGS_RES":
      return {
        ...state,
        approvedBusinessResponse: action.payload,
          };

    case "GET_ALL_BUSINESSES_SHEET_RES":
      return {
        ...state,
        approvedBusinessResponse: action.payload,
          };

    case "GET_EDITED_BUSINESS_RES":
      return {
        ...state,
        editedBusinessResponse: action.payload,
          };
      case "GET_DISABLED_BUSINESS_RES":
          return {
              ...state,
              disabledBusinessResponse: action.payload,
          };

    case "GET_BUSINESS_FUTURE_LEAVES_RESPONSE":
      return {
        ...state,
        businessFutureLeaves: action.payload,
      };


      case "GET_DISABLED_BUSINESS_RES":
        return {
          ...state,
          disabledBusinessResponse: action.payload,
        };



    default:
      return state;
  }
};

export default BusinessDetailsReducer;
