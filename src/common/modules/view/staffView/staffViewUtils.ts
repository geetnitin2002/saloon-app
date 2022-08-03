import ErrorUtils from "../../../components/Form/errorUtils";
import InputSelect from "../../../components/Form/inputSelect";
import InputDateField from "../../../components/Form/inputDate";

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
            "From",
            "text",
            "date",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "dd/MM/yyyy"
          ),
          FormClass: "col-md-6",
          dateFormat: "dd/MM/yyyy",
        },
      },
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            "To",
            "text",
            "date1",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "dd/MM/yyyy"
          ),
          FormClass: "col-md-6",
          dateFormat: "dd/MM/yyyy",
        },
      },
    ],
  },
];
export default searchForm;
