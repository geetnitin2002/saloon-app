// @ts-ignore
import { USERProfile } from "custom-actions";

export const userLogin = (data: any) => ({
  type: USERProfile.USER_LOGIN,
  body: data,
});
export const verifyEmail = (data: any, step: number) => ({
  type: USERProfile.VERIFY_EMAIL,
  body: data,
  step,
});
export const signUp = (data: any, step: number) => ({
  type: "VERIFY_SIGNUP",
  body: data,
  step,
});
export const addSecurityQuestion = (data: any, step: number, id: number) => ({
  type: "ADD_SECURITY_QUESTION",
  body: data,
  step,
  id,
});
export const allSecurityQuestion = () => ({
  type: "ALL_SECURITY_QUESTION",
});
export const userSecurityQuestion = (id: any, data: any) => ({
  type: "USER_SECURITY_QUESTION",
  id,
  body: data,
});
export const verifySecurityQuestion = (
  data: any,
  step: number,
  id: number
) => ({
  type: USERProfile.VERFY_SECURITY_QUESTION,
  body: data,
  step,
  id,
});
export const resetPassword = (data: any, step: number) => ({
  type: USERProfile.RESET_PASSWORD,
  body: data,
  step,
});
export const resetData = () => ({
  type: "reset-password-error-res",
});
