import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import { reducer as reduxFormReducer } from "redux-form";
import addBusinessReducer from "./addBusiness/addBusinessReducer";
import BusinessDetailsReducer from "./businessDetail/businessDetailsReducer";
const commonRootReducer = combineReducers({
  user: userReducer,
  form: reduxFormReducer,
  addBusiness: addBusinessReducer,
  businessDetails: BusinessDetailsReducer
});
export default commonRootReducer;
