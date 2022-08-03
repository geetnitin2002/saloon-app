import * as React from "react";
import Loadable from "react-loadable";
import LazyLoadModule from "./lazyLoadModule";

export function Loading(props: { error: any }) {
  return props && props.error ? (
    <div>{"Error Loading Module"}</div>
  ) : (
    <div>{"Loading..."}</div>
  );
}

export const loaderWrapper = (loader: any) =>
  Loadable({
    loader,
    loading: Loading,
    render(loaded: any, props: any) {
      const module = loaded.default;
      // passing location,history and match as second parimeter.
      return (
        <LazyLoadModule view={module.view} name={module.name} {...props} />
      );
    },
  });

export const businessRegisterationModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/businessModule")
);

export const businessDetailsModule = loaderWrapper(() =>
  import(
    /*webpackChunkName: "home"*/ "./modules/businessModule/businessDetails"
  )
);

export const LoginModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/userModule/login")
);

export const resetPasswordModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/userModule/resetPassword")
);
export const signUpModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/userModule/signup")
);
export const changePasswordModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/userModule/changePassword")
);
export const managerViewModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/mangerView")
);
export const ticketViewModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/ticketView")
);
export const cancelViewModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/cancelView")
);
export const staffViewModule = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/staffView")
);
export const BusinessViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/index")
);
export const AllBusinessViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/allBusinessList/index")
);
export const ServiceCategoryModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/serviceCategory/index")
);

export const AdminViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/adminView/index")
);


export const ReviewerViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/reviewerView/index")
);


export const ApprovedBusinessViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/approvedBusinessList/index")
);


export const EditedBusinessViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/editedBusinessList/index")
);

export const DisabledBusinessViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/disabledBusinessList/index")
);


export const ReportsViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/reportsView/index")
);

export const ContactViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/contact/index")
);
export const serviceViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/service/index")
);
export const aboutViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/about/index")
);
export const homeViewModel = loaderWrapper(() =>
  import(/*webpackChunkName: "home"*/ "./modules/view/home/index")
);
