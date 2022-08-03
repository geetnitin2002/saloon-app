import InputField from "../../../../components/Form/inputField";
import ErrorUtils from "../../../../components/Form/errorUtils";
import InputSelect from "../../../../components/Form/inputSelect";

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
const OptionsforServiceCategory = [
  { label: "Regular", value: "1" },
  { label: "Double Time", value: "2" },
  { label: "Ticket", value: "3" },
];
const serviceDurationOptions = [
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
];

const addServiceForm = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps("Service Name", "text", "name", "", [
            ErrorUtils.Required,
            ErrorUtils.alphaNumeric,
          ]),
          ...{ FormClass: "col-sm-6" },
        },
      },
      {
        component: InputSelect,
        props: {
          FormClass: "col-sm-6",
          label: "Service Type",
          name: "category",
          id: "serviceCategory",
          placeholder: "Choose",
          options: OptionsforServiceCategory,
          info: {
            1: "Service for a set time period",
            2: "Service that allows for bookable availability in the middle",
            3: "Ticket (services that can have a group of customers like a boat ride)",
          },
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps("Price", "text", "price", "zmdi", [
            ErrorUtils.maxLength(4),
            ErrorUtils.numberValidation,
          ]),
          FormClass: "col-sm-6",
        },
      },
      {
        component: InputSelect,
        props: {
          FormClass: "col-sm-6",
          label: "Category",
          name: "sarchCategory",
          id: "serviceDuration",
          placeholder: "Choose",
          options: [],
          validate: [ErrorUtils.Required],
        },
      },
    ],
  },
  {
    field: [
      {
        dependent: [
          {
            name: "category",
            value: ["3"],
          },
        ],
        isDependent: true,
        component: InputField,
        props: getDefaultFieldProps(
          "No. Of Tickets",
          "text",
          "maxTicketCount",
          "zmdi",
          [ErrorUtils.Required, ErrorUtils.numberValidation]
        ),
      },
      {
        dependent: [
          {
            name: "category",
            value: ["3"],
          },
        ],
        isDependent: true,
        component: InputField,
        props: getDefaultFieldProps(
          "Tickets Allowed in single time",
          "text",
          "maxTicketsAllowedPerBooking",
          "zmdi",
          [ErrorUtils.Required, ErrorUtils.numberValidation]
        ),
      },
    ],
  },
  {
    field: [
      {
        dependent: [
          {
            name: "category",
            value: ["2"],
          },
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Initial Duration",
          name: "initialDuration",
          id: "initialDuration",
          placeholder: "Choose",
          options: serviceDurationOptions,
          validate: [ErrorUtils.Required],
          defaultValue: "15",
        },
      },
      {
        dependent: [
          {
            name: "category",
            value: ["2"],
          },
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Rest Period",
          name: "restPeriod",
          id: "restPeriod",
          placeholder: "Choose",
          options: serviceDurationOptions,
          validate: [ErrorUtils.Required],
          defaultValue: "15",
        },
      },
      {
        dependent: [
          {
            name: "category",
            value: ["2"],
          },
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Remaining Duration",
          name: "remianingDuration",
          id: "remianingDuration",
          placeholder: "Choose",
          options: serviceDurationOptions,
          validate: [ErrorUtils.Required],
          defaultValue: "15",
        },
      },
    ],
  },
  {
    field: [
      {
        dependent: [
          {
            name: "category",
            value: ["1", "3"],
          },
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "col-sm-6",
          label: "Service Duration",
          name: "slotsDefinition",
          id: "serviceDuration",
          placeholder: "Choose",
          options: serviceDurationOptions,
          defaultValue: "15",
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
            "Service Description",
            "text",
            "description",
            "",
            [ErrorUtils.maxLength(400)]
          ),
          ...{ FormClass: "col-sm-12" },
        },
      },
    ],
  },
];

export default {
  addServiceForm: addServiceForm,
};
