import {
  LoginModule,
  resetPasswordModule,
  businessDetailsModule,
  businessRegisterationModule,
  managerViewModule,
  staffViewModule,
  BusinessViewModel,
  AllBusinessViewModel,
  ServiceCategoryModel,
  signUpModule,
  ContactViewModel,
  serviceViewModel,
  homeViewModel,
  aboutViewModel,
  changePasswordModule,
  ticketViewModule,
  cancelViewModule, AdminViewModel,
  ApprovedBusinessViewModel,
  EditedBusinessViewModel,
  DisabledBusinessViewModel,
  ReviewerViewModel,
  ReportsViewModel,
} from "./common/loadableModule";

export const publicRoutes = [
  {
    component: LoginModule,
    exact: true,
    path: "/",
  },
  {
    component: businessRegisterationModule,
    path: "/business-registration",
  },
  {
    component: LoginModule,
    path: "/login",
  },
  {
    component: resetPasswordModule,
    path: "/reset-password",
  },
  {
    component: signUpModule,
    path: "/sign-up",
  },
  {
    component: changePasswordModule,
    path: "/changePassword",
  },
  {
    component: cancelViewModule,
    path: "/cancel-view/:id",
  },
];

export const protectedRoutes = [
  {
    component: BusinessViewModel,
    path: "/business-view",
  },
  {
    component: staffViewModule,
    path: "/staff-view/:id",
  },
  {
    component: managerViewModule,
    path: "/manager-view/:id",
  },
  {
    component: ticketViewModule,
    path: "/ticket-view/:id",
  },
  {
    component: AllBusinessViewModel,
    path: "/all-business-list",
  },


  {
    component: EditedBusinessViewModel,
    path: "/edited-business-list",
  },


  {
    component: ApprovedBusinessViewModel,
    path: "/approved-business-list",
  },

  {
    component: DisabledBusinessViewModel,
    path: "/disabled-business-list",
  },

  {
    component: businessDetailsModule,
    path: "/business/:id/details",
  },
  {
    component: businessRegisterationModule,
    path: "/business-details",
  },
  {
    component: ServiceCategoryModel,
    path: "/service-category",
  },


  {
    component: AdminViewModel,
    path: "/admin",
  },


  {
    component: ReviewerViewModel,
    path: "/reviewer",
  },

  
  {
    component: ReportsViewModel,
    path: "/reports",
  },

  {
    component: ContactViewModel,
    path: "/contact",
  },
  {
    component: serviceViewModel,
    path: "/Services",
  },
  {
    component: homeViewModel,
    path: "/home",
  },
  {
    component: aboutViewModel,
    path: "/about",
  },
];
