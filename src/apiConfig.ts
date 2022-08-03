//const env_end_point = "http://15.206.74.49:5000";
// const env_end_point = "http://localhost:5000";
//const IMAGE_URL = "https://reg-bookings-bucket.s3.us-east-2.amazonaws.com/";
// const IMAGE_URL = 'https://bookingwebsitedev.blob.core.windows.net/businessimages/'

// const env_end_point = "https://thesalonapis.azurewebsites.net/";

const IMAGE_URL = 'https://lettucebookstorage.blob.core.windows.net/businessimages/'

//const env_end_point = "https://lettucebookapis.azurewebsites.net/";
const env_end_point = "http://localhost:5000/";

export default {
  API_END_POINT: env_end_point,
/*   BUSINESS_APP: "https://booking-userapp.azurewebsites.net/",
   BUSINESS_SEARCH: "https://booking-adminapp.azurewebsites.net/",*/
  BUSINESS_APP: "http://localhost:2000/",
  BUSINESS_SEARCH: "http://localhost:3000/",
  IMAGE_URL,
};
