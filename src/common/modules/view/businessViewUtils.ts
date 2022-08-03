import ErrorUtils from "../../components/Form/errorUtils";
import InputSelect from "../../components/Form/inputSelect";

/**
 * @constant RoleForm
 * LoginForm form creation
 */
const RoleForm = [
  {
    field: [
      {
        component: InputSelect,
        props: {
          label: "Role",
          name: "role",
          id: "ClooseRole",
          placeholder: "Choose Role",
          value: "",
          options: [
            { label: "staff", value: "staff" },
            { label: "manager", value: "manager" },
            { label: "owner", value: "owner" }
          ],
          FormClass: "col-md-12",
          validations: [ErrorUtils.Required]
        }
      }
    ]
  }
];

export default RoleForm;