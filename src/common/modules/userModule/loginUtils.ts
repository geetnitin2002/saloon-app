import InputField from "../../components/Form/inputField";
import ErrorUtils from "../../components/Form/errorUtils";
import InputSelect from "../../components/Form/inputSelect";
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
 * @constant LoginForm
 * LoginForm form creation
 */
const LoginForm = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Email Address", "text", "email", null, [
          ErrorUtils.Required,
          ErrorUtils.Email,
        ]),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Password", "password", "password", null, [
          ErrorUtils.Required,
        ]),
      },
    ],
  },
];

/**
 * @constant ForgotPassword
 * ForgotPassword form creation
 */
const forgotPasswordFormStep1 = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Email", "text", "email", null, [
          ErrorUtils.Required,
          ErrorUtils.Email,
        ]),
      },
    ],
  },
];
const forgotPasswordFormStep2 = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Secuirty Question 1",
          name: "securityQuestion1",
          id: "securityQuestion1",
          placeholder: "Choose",
          options: [
            { label: "What is your pet name ?", value: "1" },
            { label: "What is your school name ?", value: "2" },
            { label: "What is your home name ?", value: "3" },
            { label: "What is your last name ?", value: "4" },
          ],
        },
      },
      {
        component: InputField,
        props: getDefaultFieldProps("Answer 1", "text", "answer1", null, [
          ErrorUtils.Required,
          ErrorUtils.alphaNumeric,
        ]),
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Secuirty Question 2",
          name: "securityQuestion2",
          id: "securityQuestion2",
          placeholder: "Choose",
          options: [
            { label: "What is your pet name ?", value: "1" },
            { label: "What is your school name ?", value: "2" },
            { label: "What is your home name ?", value: "3" },
            { label: "What is your last name ?", value: "4" },
          ],
        },
      },
      {
        component: InputField,
        props: getDefaultFieldProps("Answer 2", "text", "answer2", null, [
          ErrorUtils.Required,
          ErrorUtils.alphaNumeric,
        ]),
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Secuirty Question 3",
          name: "securityQuestion3",
          id: "securityQuestion3",
          placeholder: "Choose",
          options: [
            { label: "What is your pet name ?", value: "1" },
            { label: "What is your school name ?", value: "2" },
            { label: "What is your home name ?", value: "3" },
            { label: "What is your last name ?", value: "4" },
          ],
        },
      },
      {
        component: InputField,
        props: getDefaultFieldProps("Answer 3", "text", "answer3", null, [
          ErrorUtils.Required,
          ErrorUtils.maxLength(100),
          ErrorUtils.alphaNumeric,
        ]),
      },
    ],
  },
];
const forgotPasswordFormStep3 = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Email", "email", "email", null, [
          ErrorUtils.Required,
          ErrorUtils.Email,
          ErrorUtils.maxLength(100),
        ]),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Password", "password", "password", null, [
          ErrorUtils.Required,
        ]),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Confirm Password", "password", "confirmPassword", null, [
          ErrorUtils.Required,
        ]),
      },
    ],
  },

  
];

const forgotPasswordFormStep4 = [
  ...[
    {
      classname: "page-section__subtitle",
      field: [
        {
          component: InputField,
          props: {
            ...getDefaultFieldProps("Email", "email", "email", null, [
              ErrorUtils.Required,
              ErrorUtils.Email,
              ErrorUtils.maxLength(100),
            ]),
            disable: true,
          },
        },
      ],
    },
  ],
  //...forgotPasswordFormStep2,
];
const ownerSecQuestion = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: {
          FormClass: "form-col",
          label: "Secuirty Question 1",
          name: "securityQuestion1",
          id: "securityQuestion1",
          placeholder: "Choose",
          disable: true,
          validate: [ErrorUtils.Required],
        },
      },
      {
        component: InputField,
        props: getDefaultFieldProps("Answer 1", "text", "answer1", null, [
          ErrorUtils.Required,
          ErrorUtils.alphaNumeric,
        ]),
      },
    ],
  },
];
const resetPassword1 = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Email", "email", "email", null, [
          ErrorUtils.Required,
          ErrorUtils.Email,
          ErrorUtils.maxLength(100),
        ]),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "New Password",
          "password",
          "newPassword",
          null,
          [ErrorUtils.Required]
        ),
      },
    ],
  },
];
const changePassword = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Email", "email", "email", null, [
          ErrorUtils.Required,
          ErrorUtils.Email,
          ErrorUtils.maxLength(100),
        ]),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Old Password",
          "password",
          "oldPassword",
          null,
          [ErrorUtils.Required]
        ),
      },
    ],
  },
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "New Password",
          "password",
          "newPassword",
          null,
          [ErrorUtils.Required]
        ),
      },
    ],
  },
  
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Confirm Password",
          "password",
          "confirmPassword",
          null,
          [ErrorUtils.Required]
        ),
      },
    ],
  },
];



/**
 * @constant RoleForm
 * LoginForm form creation
 */
const RoleForm = [
  {
    classname: "page-section__subtitle",
    field: [
      {
        component: InputSelect,
        props: {
          ...getDefaultFieldProps("Select Role", "text", "role", null, [
            ErrorUtils.Required,
          ]),
          ...{ options: [], FormClass: "col-md-12" },
        },
      },
    ],
  },
];
export default {
  Login: LoginForm,
  verifyEmail: forgotPasswordFormStep1,
  verifySecurityQuestion: forgotPasswordFormStep2,
  resetPassword: forgotPasswordFormStep3,
  emailWithSec: forgotPasswordFormStep4,
  ownerSecQuestion: ownerSecQuestion,
  resetPassword1: resetPassword1,
  changePassword,
  RoleForm,
};
