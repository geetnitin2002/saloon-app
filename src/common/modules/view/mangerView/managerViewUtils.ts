import ErrorUtils from "../../../components/Form/errorUtils";
import InputSelect from "../../../components/Form/inputSelect";
import InputDateField from "../../../components/Form/inputDate";
import InputField from "../../../components/Form/inputField";
import MultiSelectField from "../../../components/Form/inputMultiSelect";

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
 * @constant searchForm
 * LoginForm form creation
 */
const searchForm = [
  {
    field: [
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            " ",
            "text",
            "date",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "dd/MM/yyyy"
          ),
          FormClass: "col-md-8",
          dateFormat: "dd/MM/yyyy",
        },
      },
      {
        component: InputSelect,
        props: {
          label: " ",
          name: "staff",
          id: "ClosingHourOptions",
          placeholder: "Choose staff",
          value: "",
          options: [],
          FormClass: "col-md-8",
        },
      },
    ],
  },
];
export const leaveForm = [
  {
    field: [
      {
        component: InputSelect,
        props: {
          label: "Staff",
          name: "staff",
          id: "ClosingHourOptions",
          placeholder: "Choose staff",
          value: "",
          options: [],
          FormClass: "col-md-9",
          validate: [ErrorUtils.Required],
          dateFormat: "dd/MM/yyyy",
        },
      },
    ],
  },
];
export const reassignmentForm = [
  {
    field: [
      {
        component: InputField,
        props: {
          label: "Services",
          name: "services",
          id: "ClosingHourOptions",
          placeholder: "Choose Service",
          value: "",
          options: [],
          disable: true,
        },
      },
      {
        component: InputSelect,
        props: {
          label: "Staff",
          name: "staff",
          id: "ClosingHourOptions",
          placeholder: "Choose staff",
          value: "",
          options: [],
        },
      },
    ],
  },
];
export const reassignmentForm1 = [
  {
    field: [
      {
        component: InputField,
        props: {
          label: "Services 2",
          name: "services1",
          id: "ClosingHourOptions",
          placeholder: "Choose Service",
          value: "",
          options: [],
          disable: true,
        },
      },
      {
        component: InputSelect,
        props: {
          label: "Staff 2",
          name: "staff1",
          id: "ClosingHourOptions",
          placeholder: "Choose staff",
          value: "",
          options: [],
        },
      },
    ],
  },
];
export const CommentBox = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Reason for Cancellation",
            "text",
            "comment",
            "",
            [ErrorUtils.maxLength(500)]
          ),
          ...{ FormClass: "col-sm-12" },
        },
      },
    ],
  },
];
export const CommentBox1 = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Reason for Deletion",
            "text",
            "comment",
            "",
            [ErrorUtils.maxLength(500)]
          ),
          ...{ FormClass: "col-sm-12" },
        },
      },
    ],
  },
];

export const staffLeaveForm = [
  {
    classname: "form-row",
    field: [
      {
        component: InputField,
        props: {
          label: "Full Day Leave",
          type: "checkbox",
          name: "ifMarkLeaveForFullDay",
          icons: "",
          validations: [ErrorUtils.maxLength(200)],
          FormClass: "col-sm-3",
          style: {
            display: "flex",
            margin: "15px 0px",
            justifyContent: "flex-end",
            flexDirection: "row-reverse",
            alignItems: "baseline",
          },
          formHolder: "margin-right-4",
        },
      },
      {
        component: InputField,
        props: {
          label: "All Staff Members",
          placeHolder: "Reason for Cancellation",
          type: "checkbox",
          name: "ifMarkAllStaffMembers",
          icons: "",
          validations: [ErrorUtils.maxLength(200)],
          FormClass: "col-sm-3",
          style: {
            display: "flex",
            margin: "15px 13px",
            justifyContent: "flex-end",
            flexDirection: "row-reverse",
            alignItems: "baseline",
          },
          formHolder: "margin-right-4",
        },
      },
      {
        component: MultiSelectField,
        props: {
          label: "Staff Members",
          type: "text",
          name: "staffUserIds",
          icons: "",
          validations: [ErrorUtils.maxLength(200)],
          FormClass: "form-col",
          options: [{ leabel: "", value: "" }],
          useContextData: true,
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputDateField,
        props: {
          label: "Form Date",
          type: "date",
          name: "startDate",
          icons: "",
          FormClass: "form-col",
          showTimeSelect: false,
          dateFormat: "dd/MM/yyyy",
        },
      },
      {
        component: InputDateField,
        props: {
          label: "Time",
          type: "date",
          name: "startTime",
          icons: "",
          timeFormat: "HH:mm",
          FormClass: "form-col",
          showTimeSelect: true,
          showTimeSelectOnly: true,
          dateFormat: "h:mm aa",
          useContextData: true,
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputDateField,
        props: {
          label: "To Date",
          type: "startDate",
          name: "endDate",
          icons: "",
          FormClass: "form-col",
          showTimeSelect: false,
          dateFormat: "dd/MM/yyyy",
        },
      },
      {
        component: InputDateField,
        props: {
          label: "Time",
          type: "date",
          name: "endTime",
          icons: "",
          FormClass: "form-col",
          showTimeSelect: true,
          showTimeSelectOnly: true,
          dateFormat: "h:mm aa",
          timeFormat: "HH:mm",
          useContextData: true,
        },
      },
    ],
  },
];
export default searchForm;
