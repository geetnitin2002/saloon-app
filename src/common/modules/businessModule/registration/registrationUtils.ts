import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import InputSelect from "../../../components/Form/inputSelect";
import styled from "styled-components";
import InputDateField from "../../../components/Form/inputDate";
import { Field, Fields } from "redux-form";
import errorUtils from "../../../components/Form/errorUtils";
import { select } from "redux-saga/effects";
import { values } from "lodash";
import { render } from "@testing-library/react";
import { Button } from "react-bootstrap";
import { any } from "prop-types";
import changePassword from "../../userModule/changePassword/changePassword";

const formClass = {
  width: "50%",
};
/**
 * @function getDefaultFieldProps
 * get initial value of form types
 */
const getDefaultFieldProps = (
  label: any,
  type: any,
  name: any,
  iClass: any = null,
  validate: any = null,
  placeholder: any = null,
  disable: any = null,
) => {
  return { label, type, name, iClass, validate, placeholder, disable };
};
/**
 * @constant RegistrationFormStep1
 * step1 form creation
 */
const RegistrationFormStep1 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner Name",
          "text",
          "firstName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner Surname",
          "text",
          "lastName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Name",
          "text",
          "businessName",
          "",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner's Mobile",
          "text",
          "phone",
          "zmdi zmdi-smartphone-android",
          [ErrorUtils.Required, ErrorUtils.phoneNumber]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner's Email",
          "text",
          "email",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email, errorUtils.maxLength(100)]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Password",
          "password",
          "password",
          "zmdi zmdi-password",
          [ErrorUtils.Required, errorUtils.maxLength(15)]
        ),
      },
    ],
  },


  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Confirm Email",
          "text",
          "confirmEmail",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email, errorUtils.maxLength(100)]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Confirm Password",
          "password",
          "confirmPassword",
          "zmdi zmdi-password",
          [ErrorUtils.Required, errorUtils.maxLength(15)]
        ),
      },
    ],
  },


];







/**
 * @constant RegistrationFormStep1A
 * step1 form creation
 */
const RegistrationFormStep1A = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner Name",
          "text",
          "firstName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner Surname",
          "text",
          "lastName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Name",
          "text",
          "businessName",
          "",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(50),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner's Mobile",
          "text",
          "phone",
          "zmdi zmdi-smartphone-android",
          [ErrorUtils.Required, ErrorUtils.phoneNumber]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Account Owner's Email",
          "text",
          "email",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email, errorUtils.maxLength(100)]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Password",
          "password",
          "password",
          "zmdi zmdi-password",
          [ErrorUtils.Required, errorUtils.maxLength(15)]
        ),
      },
    ],
  },

  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Confirm Email",
          "text",
          "confirmEmail",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email, errorUtils.maxLength(100)]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Confirm Password",
          "password",
          "confirmPassword",
          "zmdi zmdi-password",
          [ErrorUtils.Required, errorUtils.maxLength(15)]
        ),
      },
    ],
  },

   {
     addButtonText: [
       {
         component: Button,
       }
     ]
   }


];











/**
 * @constant RegistrationFormStep2
 * step2 form creation
 */
const RegistrationFormStep2 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Address Line 1",
          "text",
          "addressLine1",
          "zmdi zmdi-home",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(200),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Address Line 2",
          "text",
          "addressLine2",
          "zmdi zmdi-home",
          [errorUtils.maxLength(200), errorUtils.alphaNumeric]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Area / Suburb",
          "text",
          "cityLocation",
          "zmdi zmdi-pin",
          [
            ErrorUtils.Required,
            errorUtils.maxLength(100),
            errorUtils.alphaNumeric,
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps("City", "text", "city", "zmdi zmdi-pin", [
          ErrorUtils.Required,
          errorUtils.maxLength(100),
        ]),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Postal Code / Zip",
            "text",
            "postalCode",
            "zmdi zmdi-pin",
            [
              ErrorUtils.Required,
              errorUtils.maxLength(10),
              errorUtils.alphaNumeric,
            ]
          ),
          ...{ style: { maxWidth: "328px" } },
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Latitude",
            "text",
            "latitude",
            "zmdi zmdi-pin",
            [
              ErrorUtils.Required,
              errorUtils.maxLength(10),
              errorUtils.alphaNumeric,
            ]
          ),
          ...{ style: { maxWidth: "328px" } },
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Longitude",
            "text",
            "longitude",
            "zmdi zmdi-pin",
            [
              ErrorUtils.Required,
              errorUtils.maxLength(10),
              errorUtils.alphaNumeric,
            ]
          ),
          ...{ style: { maxWidth: "328px" } },
        },
      },
    ],
  },
];

/**
 * @constant RegistrationFormStep3
 * step3 form creation
 */
const OpeningHourOptions = [
  { label: "Closed", value: "00:00" },
  { label: "00:30 AM", value: "00:30" },
  { label: "01:00 AM", value: "01:00" },
  { label: "01:30 AM", value: "01:30" },
  { label: "02:00 AM", value: "02:00" },
  { label: "02:30 AM", value: "02:30" },
  { label: "03:00 AM", value: "03:00" },
  { label: "03:30 AM", value: "03:30" },
  { label: "04:00 AM", value: "04:00" },
  { label: "04:30 AM", value: "04:30" },
  { label: "05:00 AM", value: "05:00" },
  { label: "05:30 AM", value: "05:30" },
  { label: "06:00 AM", value: "06:00" },
  { label: "06:30 AM", value: "06:30" },
  { label: "07:00 AM", value: "07:00" },
  { label: "07:30 AM", value: "07:30" },
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "9:00 AM", value: "09:00" },
  { label: "9:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
  { label: "06:00 PM", value: "18:00" },
  { label: "06:30 PM", value: "18:30" },
  { label: "07:00 PM", value: "19:00" },
  { label: "07:30 PM", value: "19:30" },
  { label: "08:00 PM", value: "20:00" },
  { label: "08:30 PM", value: "20:30" },
  { label: "09:00 PM", value: "21:00" },
  { label: "09:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" },
  { label: "12:00 PM", value: "24:00" },
];
const ClosingHourOptions = [
  { label: "Closed", value: "00:00" },
  { label: "00:30 AM", value: "00:30" },
  { label: "01:00 AM", value: "01:00" },
  { label: "01:30 AM", value: "01:30" },
  { label: "02:00 AM", value: "02:00" },
  { label: "02:30 AM", value: "02:30" },
  { label: "03:00 AM", value: "03:00" },
  { label: "03:30 AM", value: "03:30" },
  { label: "04:00 AM", value: "04:00" },
  { label: "04:30 AM", value: "04:30" },
  { label: "05:00 AM", value: "05:00" },
  { label: "05:30 AM", value: "05:30" },
  { label: "06:00 AM", value: "06:00" },
  { label: "06:30 AM", value: "06:30" },
  { label: "07:00 AM", value: "07:00" },
  { label: "07:30 AM", value: "07:30" },
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "9:00 AM", value: "09:00" },
  { label: "9:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
  { label: "06:00 PM", value: "18:00" },
  { label: "06:30 PM", value: "18:30" },
  { label: "07:00 PM", value: "19:00" },
  { label: "07:30 PM", value: "19:30" },
  { label: "08:00 PM", value: "20:00" },
  { label: "08:30 PM", value: "20:30" },
  { label: "09:00 PM", value: "21:00" },
  { label: "09:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" },
  { label: "12:00 PM", value: "24:00" },
];
const getFields = (data: any) => {
  return [
    {
      component: InputSelect,
      props: {
        name: "startTime" + data,
        id: "openingHour" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: OpeningHourOptions,
      },
    },
    {
      component: InputSelect,
      props: {
        name: "endTime" + data,
        id: "ClosingHourOptions" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: ClosingHourOptions,
      },
    },
  ];
};
//const defaultOtherDaysToMondayHours = () => {

//}
const RegistrationFormStep3 = [
  {
    classname: "row",
    title: "Monday",
    field: getFields("Mon"),
  },
  {
    classname: "row",
    title: "Tuesday",
    //field: getFields("Mon"),
    field: getFields("Tues"),
  },
  {
    classname: "row",
    title: "Wednesday",
    //field: getFields("Mon"),
    field: getFields("Wed"),
  },
  {
    classname: "row",
    title: "Thursday",
    //field: getFields("Mon"),
    field: getFields("Thurs"),
  },
  {
    classname: "row",
    title: "Friday",
    //field: getFields("Mon"),
    field: getFields("Fri"),
  },
  {
    classname: "row",
    title: "Saturday",
    //field: getFields("Mon"),
    field: getFields("Sat"),
  },
  {
    classname: "row",
    title: "Sunday",
    field: getFields("Sun"),
  },
];

/**
 * @constant RegistrationFormStep4
 * step4 form creation
 */

const OptionsYesNo = [
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
];
const RegistrationFormStep4 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Website",
          "text",
          "weburl",
          "zmdi zmdi-laptop",
          [ErrorUtils.websiteValidation],
          "Website url"
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Contact",
          "text",
          "contactPhone",
          "zmdi zmdi-smartphone-android",
          [ErrorUtils.phoneNumber]
        ),
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Business Description",
            "textarea",
            "writeup",
            "5",
            [errorUtils.maxLength(400)]
          ),
          ...{ FormClass: "col-sm-12" },
        },
      },
    ],
  },
];
const RegistrationFormStep5 = [
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label:
            "Display Business Phone number on Booking Confirmations",
          name: "ifPhoneShownOnBookingEmail",
          id: "ifPhoneShownOnBookingEmail",
          placeholder: "Choose",
          options: OptionsYesNo,
        },
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label:
            "Notify Bookers about missing appointments",
            name: "ifNotifyNoShowToBooker",
            id: "ifNotifyNoShowToBooker",
          placeholder: "Choose",
          options: OptionsYesNo,
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Minimum lead time to booking",
          name: "preBookingInterval",
          id: "preBookingInterval",
          placeholder: "Choose",
          options: [
            { label: "15 Min", value: "15" },
            { label: "30 Min", value: "30" },
            { label: "45 Min", value: "45" },
            { label: "60 Min", value: "60" },
            { label: "75 Min", value: "75" },
            { label: "90 Min", value: "90" },
            { label: "105 Min", value: "105" },
            { label: "02 Hrs", value: "120" },
            { label: "03 Hrs", value: "180" },
            { label: "04 Hrs", value: "240" },
            { label: "05 Hrs", value: "300" },
            { label: "06 Hrs", value: "360" },
            { label: "07 Hrs", value: "420" },
            { label: "08 Hrs", value: "480" },
            { label: "09 Hrs", value: "540" },
            { label: "10 Hrs", value: "600" },
            { label: "11 Hrs", value: "660" },
            { label: "12 Hrs", value: "720" },
            { label: "13 Hrs", value: "780" },
            { label: "14 Hrs", value: "840" },
            { label: "15 Hrs", value: "900" },
            { label: "16 Hrs", value: "960" },
            { label: "17 Hrs", value: "1020" },
            { label: "18 Hrs", value: "1080" },
            { label: "19 Hrs", value: "1140" },
            { label: "20 Hrs", value: "1200" },
            { label: "21 Hrs", value: "1260" },
            { label: "22 Hrs", value: "1320" },
            { label: "23 Hrs", value: "1380" },
            { label: "24 Hrs", value: "1440" },
          ],
        },
      },
      {
        component: InputField,
        props: {
          FormClass: "form-col",
          label: "Number of days in advance bookings can be accepted",
          name: "advanceBookingPeriod",
          id: "advanceBookingPeriod",
          validate: [
            ErrorUtils.Required,
            errorUtils.maxLength(3),
            ErrorUtils.numberValidation,
          ],
          placeholder: "10",
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Staff E-mails for future bookings (other than today)",
          name: "ifStaffNotifiedFutureBookings",
          id: "ifStaffNotifiedFutureBookings",
          placeholder: "Choose",
          options: OptionsYesNo,
        },
      },
    ],
  },
];

const RegistrationFormStep6 = [
  {
    addButtonText: "Add Hoildays",
    removeButtonText: "Remove",
    fieldsName: "holiday",
    field: [
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            "",
            "text",
            "date",
            "zmdi zmdi-laptop",
            null,
            "Pick the holiday dates"
          ),
          FormClass: "form-col-1",
          minDate: new Date(),
        },
      },
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            "",
            "text",
            "date1",
            "zmdi zmdi-laptop",
            null,
            "Pick the holiday dates"
          ),
          FormClass: "form-col-1",
          minDate: new Date(),
        },
      },
    ],
  },
];


/**
 *
 * @param data edit form data
 */
const BusinessMainDetail = (data: any) => {
  return {
    businessName: data.businessName,
    email: data.ownerEmailId,
    confirmEmail: data.ownerEmailId,
    firstName: data.ownerFirstname,
    lastName: data.ownerLastname,
    phone: data.ownerPhone,
    password: "1234",
    confirmPassword: "1234",
  };
};
const BusinessExtraDetail = (data: any) => {
  return {
    contactPhone: data.contactPhone,
    weburl: data.websiteUrl,
    writeup: data.writeup,
  };
};
const BusinessSettingDetails = (data: any) => {
  return {
    advanceBookingPeriod: data.preBookingWindow.toString(),
    ifNotifyNoShowToBooker: data.notifyNoShowToCustomer,
    ifPhoneShownOnBookingEmail: data.displayPhoneOnBooking,
    ifStaffNotifiedFutureBookings: data.ifStaffNotifiedFutureBookings,
    preBookingInterval: data.bookingInterval.toString(),
  };
};
const BusinessWorkinghourDetails = (data: any) => {
  return {
    startTimeMon: data.mondayHours.split("-")[0],
    endTimeMon: data.mondayHours.split("-")[1],
    startTimeTues: data.tuesdayHours.split("-")[0],
    endTimeTues: data.tuesdayHours.split("-")[1],
    startTimeWed: data.wednesdayHours.split("-")[0],
    endTimeWed: data.wednesdayHours.split("-")[1],
    startTimeThurs: data.thursdayHours.split("-")[0],
    endTimeThurs: data.thursdayHours.split("-")[1],
    startTimeFri: data.fridayHours.split("-")[0],
    endTimeFri: data.fridayHours.split("-")[1],
    startTimeSat: data.saturdayHours.split("-")[0],
    endTimeSat: data.saturdayHours.split("-")[1],
    startTimeSun: data.sundayHours.split("-")[0],
    endTimeSun: data.sundayHours.split("-")[1],
  };
};

/**
 * disable all form
 */
const DisableFormFields = (formData: any, status: any, disable = false) => {
  if ((status && status === "APPROVED") || disable) {
    formData.forEach((element: any) => {
      element.field.forEach((row: any) => {
        let props = row.props;
        props.validate = [];
        props.disable = false;
        return props;
      });
    });
  }
  return formData;
};

const DisableFormField = (field: any, status: any, disable = false) => {
  
  if ((status && status !== null) || disable) {
    field.forEach((element: any) => {
      element.field.forEach((row: any) => {
        let props = row.props;
        if(props.name === "password" && props.name.value !== null ){
        console.log(props)
        props.validate = [];
        props.disable = true;
        return props; }
        if(props.name === "email" && props.name.value !== null ){
        props.validate = [];
        props.disable = true;
        return props; }
        if(props.name === "confirmPassword" && props.name.value !== null ){
        props.validate = [];
        props.disable = true;
        return props; }
        if(props.name === "confirmEmail" && props.name.value !== null ){
        props.validate = [];
        props.disable = true;
        return props; }
      } );
    });
  }
  return field;
};

export default {
  formFieldsStep1: RegistrationFormStep1,
  formFieldsStep2: RegistrationFormStep2,
  formFieldsStep3: RegistrationFormStep3,
  formFieldsStep4: RegistrationFormStep4,
  formFieldsStep5: RegistrationFormStep5,
  formFieldsStep6: RegistrationFormStep6,
  BusinessMainDetail: BusinessMainDetail,
  BusinessExtraDetail: BusinessExtraDetail,
  BusinessSettingDetails: BusinessSettingDetails,
  BusinessWorkinghourDetails: BusinessWorkinghourDetails,
  DisableFormFields,
  DisableFormField,
};

/**
 * 
 *       
        
 */
