import ApiRequest from "./apiRequest";
export const userLoginApi = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/login", null, body, null);
};

export const verifyEmailApi = async (body: any): Promise<any> => {
  return ApiRequest.post("/verifyEmail", null, body, null);
};
export const signUpReq = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/signup", null, body, null);
};
export const verifySeucrityQuestionApi = async (
  body: any,
  id: any
): Promise<any> => {
  const url = "/user/" + id + "/verifySecurityResponses";
  return ApiRequest.post(url, null, body, null);
};
export const addSeucrityQuestionApi = async (
  body: any,
  id: any
): Promise<any> => {
  const url = "/user/" + id + "/addSecurityQuestions";
  return ApiRequest.post(url, null, body, null);
};

export const resetpasswordAPi = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/resetPassword", null, body, null);
};
export const getAllSecurityQuestion = async (): Promise<any> => {
  return ApiRequest.get("/securityQuestions", null, null, null);
};
export const getSecurityQuestions = async (body: any): Promise<any> => {
  const url = "/user/securityQuestions";
  return ApiRequest.post(url, null, body, null);
};
export const changePassword = async (body: any): Promise<any> => {
  const url = "/user/changePassword";
  return ApiRequest.post(url, null, body, null);
};
