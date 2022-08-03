import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import InputDateField from "../../../components/Form/inputDate";
import InputSelect from "../../../components/Form/inputSelect";

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
  placeholder: any = null
) => {
  return { label, type, name, iClass, validate, placeholder };
};
/**
 * @constant ticketBooking
 * step1 form creation
 */
const ticketBooking = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Service Chosen",
            "text",
            "serviceName",
            "zmdi",
            [ErrorUtils.Required]
          ),
          ...{ disable: true }
        }
      },
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            " Select Date",
            "text",
            "eventDate",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "MM/DD/YYYY"
          )
        }
      }
    ]
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Select Time Slot",
          name: "slotStartTime",
          id: "selectTimeSlot",
          placeholder: "Choose",
          options: [
            { label: "Choose", value: "" },
            { label: "10:00AM-06:00PM", value: "1000" },
            { label: "10:00AM-12:00PM", value: "1200" },
            { label: "12:00PM-02:00PM", value: "1400" },
            { label: "02:00PM-04:00PM", value: "1600" },
            { label: "04:00PM-06:00PM", value: "1800" }
          ]
        }
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "No. of Tickets required",
          name: "countOfTicketsToBook",
          id: "Ticketsrequired",
          placeholder: "Choose",
          options: [
            { label: "Choose", value: "" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" }
          ]
        }
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Full Name",
          "text",
          "bookerName",
          "zmdi zmdi-account-o",
          [ErrorUtils.Required]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Email Address",
          "text",
          "bookerEmail",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email]
        )
      }
    ]
  }
];
export default ticketBooking;
