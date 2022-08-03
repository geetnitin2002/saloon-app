import ApiRequest from "./apiRequest";
export const addBusinessMain = async (body: any): Promise<any> => {
  return ApiRequest.post("/business/addBusinessMain", null, body, null);
};
export const updateBusinessMain = async (id:any, body: any): Promise<any> => {
    const url = "/business/" + id + "/updateBusinessMainFields";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessAddress = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessAddress";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessExtraInfo = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/addBusinessExtraInfo";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessHolidays = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessHolidays";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessService = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessService";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessSettings = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessSettings";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessHours = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessHours";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessStaff = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessStaff";
  return ApiRequest.post(url, null, body, null);
};
export const bookTickets = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/bookTickets";
  return ApiRequest.post(url, null, body, null);
};

export const workingHours = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/workingHours";
  return ApiRequest.post(url, null, body, null);
};
export const deleteBusinessService = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/deleteBusinessService";
  return ApiRequest.post(url, null, body, null);
};
export const deleteBusinessStaff = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/deleteBusinessStaff";
  return ApiRequest.post(url, null, body, null);
};

export const getBusinessService = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/services";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessStaff = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/staff";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessSkillStaff = async (
  id: any,
  data: any
): Promise<any> => {
  const url = "/business/" + id + "/skilledStaff";
  return ApiRequest.post(url, null, data, null);
};
export const getBusinessWeek = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/weeksRange";
  return ApiRequest.get(url, null, null, null);
};

// export const  AttachFile = async (id: any,f_name :any): Promise<any> => {
//   let filename  = f_name.split('.').slice(0, -1).join('.')
//   const url = "/business/" + id + "/" + filename;
//   return ApiRequest.get(url, null, null, null);
// };

export const getBusinessAddressInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/address";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessMainInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/mainFields";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessExtraInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/extraInfo";
  return ApiRequest.post(url, null, null, null);
};

export const bookTicket = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/bookTickets";
  return ApiRequest.post(url, null, body, null);
};
export const getTicketsAvailability = async (
  id: any,
  name: any
): Promise<any> => {
  const url =
    "/business/" + id + "/service/" + name + "/getTicketsAvailability";
  return ApiRequest.get(url, null, null, null);
};

export const getBusinessWorkingHourSlots = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/businessWorkingHourSlotsRange";
  return ApiRequest.get(url, null, null, null);
};
export const getBusinessWeekRange = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/weeksRange";
  return ApiRequest.post(url, null, null, null);
};
export const serviceCategoriessAndBusinesses = async (): Promise<any> => {
  const url = "/serviceCategoriessAndBusinesses";
  return ApiRequest.get(url, null, null, null);
};

export const getBusinessLocationList = async (): Promise<any> => {
  const url = "/locations";
  return ApiRequest.get(url, null, null, null);
};

export const SearchCategoriessAndBusinesses = async (
  body: any
): Promise<any> => {
  const url = "/search";
  return ApiRequest.post(url, null, body, null);
};
export const userBooking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/user/bookings";
  return ApiRequest.post(url, null, body, null);
};
export const booking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/bookings";
  return ApiRequest.post(url, null, body, null);
};
export const ticketsbooking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/tickets";
  return ApiRequest.post(url, null, body, null);
};
export const staffUserBooking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/user/bookings";
  return ApiRequest.post(url, null, body, null);
};
export const userBookingCancel = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/cancelBooking";
  return ApiRequest.post(url, null, body, null);
};
export const cancelTickets = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/cancelTicket";
  return ApiRequest.post(url, null, body, null);
};
export const userBookingNoShow = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/noShow";
  return ApiRequest.post(url, null, body, null);
};

export const getReassignmentData = async (
  id: any,
  bookingNumber: any
): Promise<any> => {
  const url =
    "/business/" + id + "/booking/" + bookingNumber + "/getReassignmentData";
  return ApiRequest.post(url, null, null, null);
};
export const applyReassignment = async (
  id: any,
  bookingNumber: any,
  data: any
): Promise<any> => {
  const url =
    "/business/" + id + "/booking/" + bookingNumber + "/applyReassignment";
  return ApiRequest.post(url, null, data, null);
};
export const getStaffAvailability = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/getStaffAvailability";
  return ApiRequest.post(url, null, body, null);
};
export const bookAppointment = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/bookAppointment";
  return ApiRequest.post(url, null, data, null);
};
export const getBusinessDetails = async (id: any): Promise<any> => {
  const url = "/business/" + id;
  return ApiRequest.post(url, null, {behavior: 'User'}, null);
  //return ApiRequest.post(url, null, null, null);
};
export const getAllBusiness = async (): Promise<any> => {
  const url = "/businesses";
  return ApiRequest.get(url, null, null, null);
};



export const getDisabledBusiness = async (): Promise<any> => {
    const url = "/disabledbusinesses";
    return ApiRequest.get(url, null, null, null);
};



export const getApprovedBusiness = async (): Promise<any> => {
  const url = "/approvedbusinesses";
  return ApiRequest.get(url, null, null, null);
};

export const getEditedBusiness = async (): Promise<any> => {
    const url = "/editedbusinesses";
    return ApiRequest.get(url, null, null, null);
};

export const getImages = async (b_id: any): Promise<{data: {Main:String, Child:Array<any>}}> => {
  const url = `/business/${b_id}/images`;
  return ApiRequest.get(url, null, null, null);
};


export const approveBusiness = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/approve";
  return ApiRequest.post(url, null, data, null);
};



export const enableBusiness = async (id: any, data: any): Promise<any> => {
    const url = "/business/" + id + "/enable";
    return ApiRequest.post(url, null, data, null);
};


export const disableBusiness = async (id: any, data: any): Promise<any> => {
    const url = "/business/" + id + "/disable";
    return ApiRequest.post(url, null, data, null);
};


export const deleteBusiness = async (id: any, data: any): Promise<any> => {
    const url = "/business/" + id + "/deleteBusiness";
    return ApiRequest.post(url, null, data, null);
};


export const allBusinessBookings = async (): Promise<any> => {
  const url = "/report/allBusinessBookings";
  return ApiRequest.post(url, null, null, null);
};

export const allBusinessesSheet = async (): Promise<any> => {
  const url = "/report/allBusinessList";
  return ApiRequest.post(url, null, null, null);
};

export const cancelLeave = async (id: any, data: any): Promise<any> => {
    const url = "/business/" + id + "/cancelLeaves";
    return ApiRequest.post(url, null, data, null);
};


export const fileUplads = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/upload";
  return ApiRequest.post(url, null, data, null);
};
export const fileDels = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/delete";
  return ApiRequest.post(url, null, data, null);
};
export const staffOnLeave = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/staff/leave";
  return ApiRequest.post(url, null, data, null);
};
export const serviceCategories = async (): Promise<any> => {
  const url = "/serviceCategories";
  return ApiRequest.get(url, null, null, null);
};
export const AddserviceCategories = async (data: any): Promise<any> => {
  const url = "/serviceCategory/" + data;
  return ApiRequest.post(url, null, null, null);
};
export const deleteserviceCategories = async (data: any): Promise<any> => {
  const url = "/deleteServiceCategory/" + data;
  return ApiRequest.post(url, null, null, null);
};

export const staffWorkingHourSlotsRange = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/staffWorkingHourSlotsRange";
  return ApiRequest.post(url, null, null, null);
};
export const markStaffOnleaves = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/markStaffOnleaves";
  return ApiRequest.post(url, null, data, null);
};

export const staffName = async (id: any): Promise<any> => {
  const url = "/user/" + id + "/staffName";
  return ApiRequest.post(url, null, null, null);
};

export const getFutureLeaves = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/futureLeaves";
  return ApiRequest.post(url, null, null, null);
};
