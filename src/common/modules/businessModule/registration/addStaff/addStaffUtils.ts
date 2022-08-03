import InputField from "../../../../components/Form/inputField";
import ErrorUtils from "../../../../components/Form/errorUtils";
import InputSelect from "../../../../components/Form/inputSelect";
import MultiSelectField from "../../../../components/Form/inputMultiSelect";
import RegistrationStep from "../registrationUtils";
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

const getFields = (data: any) => {
  return [
    {
      component: InputSelect,
      props: {
        name: "startTime" + data,
        id: "openingHour" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: [],
      },
    },
    {
      component: InputSelect,
      props: {
        name: "endTime" + data,
        id: "ClosingHourOptions" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: [],
      },
    },
  ];
};
export const RegistrationFormStep3 = [
  {
    classname: "row",
    title: "Monday",
    field: getFields("Mon"),
  },
  {
    classname: "row",
    title: "Tuesday",
    field: getFields("Tues"),
  },
  {
    classname: "row",
    title: "Wednesday",
    field: getFields("Wed"),
  },
  {
    classname: "row",
    title: "Thursday",
    field: getFields("Thurs"),
  },
  {
    classname: "row",
    title: "Friday",
    field: getFields("Fri"),
  },
  {
    classname: "row",
    title: "Saturday",
    field: getFields("Sat"),
  },
  {
    classname: "row",
    title: "Sunday",
    field: getFields("Sun"),
  },
];

const addStaffForm = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "First Name",
          "text",
          "firstName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            ErrorUtils.alphaNumeric,
            ErrorUtils.maxLength(50),
          ]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Last Name",
          "text",
          "lastName",
          "zmdi zmdi-account-o",
          [
            ErrorUtils.Required,
            ErrorUtils.alphaNumeric,
            ErrorUtils.maxLength(50),
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
          "Staff Email",
          "email",
          "email",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email, ErrorUtils.maxLength(100)]
        ),
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Staff Mobile",
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
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Staff Role",
          name: "staffRole",
          id: "serviceDuration",
          placeholder: "Choose",
          options: [
            { label: "Manager", value: "MANAGER" },
            { label: "Employee", value: "EMPLOYEE" },
          ],
        },
      },
      {
        component: MultiSelectField,
        props: {
          ...getDefaultFieldProps(
            "Service Capabilities",
            "text",
            "serviceSkills",
            "zmdi"
          ),
          options: [],
        },
      },
    ],
  },
  // ...RegistrationStep.formFieldsStep3,
];

export default addStaffForm;
