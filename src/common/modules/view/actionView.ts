export const getSearchResults = (id: any, data: any, type: any) => ({
  id,
  type,
  body: data
});

export const getReassignmentData = (id: any, bookingId: any, type: any) => ({
  id,
  type,
  bookingId
});
export const applyReassignment = (
  id: any,
  bookingId: any,
  data: any,
  type: any
) => ({
  id,
  type,
  bookingId,
  body: data
});
export const AllBussinessList = () => ({
  type: "GET_ALL_BUSINESS"
});



export const EditedBussinessList = () => ({
  type: "GET_EDITED_BUSINESS"
});


export const ApprovedBussinessList = () => ({
  type: "GET_APPROVED_BUSINESS"
});


export const DisabledBussinessList = () => ({
  type: "GET_DISABLED_BUSINESS"
});


export const AllBussinessBookingsList = () => ({
  type: "GET_ALL_BUSINESS_BOOKINGS"
});


export const AllBussinessesSheetList = () => ({
  type: "GET_ALL_BUSINESSES_SHEET"
});