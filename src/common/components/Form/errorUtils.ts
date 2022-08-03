const required = (value: any) =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = (max: number) => (value: string | any[]) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = (min: number) => (value: string | any[]) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const number = (value: any) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;
const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 _@./#&+-/!"']/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
const phoneNumber = (value: string) =>
  value && !/^(0|[0-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;
const websiteValidation = (value: string) =>
  value &&
  !/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/.test(
    value
  )
    ? " Invalid website url"
    : undefined;
const numberValidation = (value: any) =>
  value && !/^[0-9]*$/.test(value) ? "Only number allowed" : undefined;

export default {
  Required: required,
  maxLength: maxLength,
  minLength: minLength,
  number: number,
  minValue: minValue,
  Email: email,
  alphaNumeric: alphaNumeric,
  phoneNumber: phoneNumber,
  websiteValidation: websiteValidation,
  numberValidation: numberValidation,
};
