import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ModalComponent from "../../../../components/modelComponent";
import List from "../../../../components/List/list";
import AddServiceForm from "../../../../components/Form/generalForm";
import ServiceUtil from "./addServiceUtils";
import { formValueSelector, submit } from "redux-form";
import { UserProvider } from "./contextApi";
import {
  addBusinessServices,
  deleteBusinessServices,
  getBusinessServices,
  approveBusiness,
} from "../../action/addBusinessAction";
import NoResultFound from "../../../../components/List/noResultFound";
import AlertSuccess from "../../../../components/alertSuccessComponent";
import { serviceCategories } from "../../../../api/businessApi";
import lodash from "lodash";
import searchForm, {
    CommentBox1,
  } from "./../../../../modules/view/mangerView/managerViewUtils";
  import GenernalForm from "./../../../../components/Form/generalForm";
interface IAddServiceProps {
  readonly step: number;
  readonly serviceCategory: any;
  readonly submitForm: any;
  readonly addBusinessServices: any;
  readonly businessId: any;
  readonly deleteBusinessServices: any;
  readonly getBusinessServices: any;
  readonly serviceList: any;
  readonly addBusinessResponse: any;
  readonly status: any;
  readonly deleteServiceRes: any;
  readonly approveRes?: any;
  readonly approveBusiness: any;
  readonly edit: any;
}

const TableDiv = styled.div`
  height: 600px;
  padding-top: 40px;
`;
const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
`;
const ButtonWraspper = styled.div`
  margin: 16px;
`;
const InfoComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        color: "#123145",
      }}
    >
      <span>Service for a set time period</span>
      <span>
      Service that allows for bookable availability in the middle
      </span>
      <span>
        Ticket (services that can have a group of customers like a boat
        ride)
      </span>
    </div>
  );
};
class AddServiceContainer extends React.Component<IAddServiceProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
          step: this.props.step,
          success: null,
          modelShow: null,
          modalShow: null,
          //error: null,
          listTemplates: {
            thead: ["Name", "Duration", "Price"],
            tbody: ["name", "duration", "price"],
            actionItems: {
              edit: true,
              delete: true,
              disable: true,
            },
          },
          actionType: "add",
          editData: null,
          topCategory: [],
          userRole: {
            role: "OWNER",
          },
        };
      }
  
  /*state = {
    step: this.props.step,
    modelShow: false,
    success: null,
    listTemplates: {
      thead: ["Name", "Duration", "Price"],
      tbody: ["name", "duration", "price"],
      actionItems: {
        edit: true,
        delete: true,
        disable: true,
      },
    },
    actionType: "add",
    editData: null,
    topCategory: [],
    userRole: {
      role: "OWNER",
    },
  };*/

  componentDidMount() {
    if (localStorage.getItem("userDetail")) {
      const userDetails: any = localStorage.getItem("userDetail");
      console.log(JSON.parse(userDetails));
      this.setState({ userRole: JSON.parse(userDetails) });
    }
    this.props.getBusinessServices(this.props.businessId);
    serviceCategories().then((res: any) => {
      if (!res.error && !res.errors) {
        //console.log(res);
        let rest = [];
        for (let data of res.data) {
          rest.push({ label: data, value: data });
        }
        this.setState({ topCategory: rest });
      }
    });
  }
  componentDidUpdate(prevProps: any) {
    if (
      this.props.addBusinessResponse &&
      !this.props.addBusinessResponse.errors &&
      this.props.addBusinessResponse.responseType === "success" &&
      prevProps.addBusinessResponse !== this.props.addBusinessResponse
    ) {
      this.setState({
        success: this.props.addBusinessResponse["success"][0]["message"],
        loader: false,
      });
      this.handleClose();
      this.props.getBusinessServices(this.props.businessId);
    }
    if (
      this.props.deleteServiceRes &&
      !this.props.deleteServiceRes.errors &&
      prevProps.deleteServiceRes !== this.props.deleteServiceRes
    ) {
      this.props.getBusinessServices(this.props.businessId);
    }
    if (
      this.props.approveRes &&
      (this.props.approveRes.errors ||
        this.props.approveRes.responseType === "errors") &&
      prevProps.approveRes !== this.props.approveRes
    ) {
      this.setState({
        error: this.props.approveRes["errors"],
        loader: false,
      });
    }
    if (
      this.props.approveRes &&
      !this.props.approveRes.errors &&
      this.props.approveRes.responseType === "success" &&
      prevProps.approveRes !== this.props.approveRes
    ) {
      this.setState({
        success: this.props.approveRes["success"][0]["message"],
        userRole: null,
        loader: false,
      });
    }
  }
  closeTicket = () => {
    this.setState({ success: null });
  };
  handleApprove = () => {
    this.setState({ loader: true });
    this.props.approveBusiness(this.props.businessId, {
      userRole: this.state.userRole && this.state.userRole.role,
    });
  };
  editHandler = (row: any) => {
    row.sarchCategory = row.category;
    row.category = "1";
    row.slotsDefinition = row.subslotsCount;
    if (row.ifDoubleTimeService === "Y") {
      row.category = "2";
      row.initialDuration = row.subslotsCount.split(";")[0];
      row.restPeriod = row.subslotsCount.split(";")[1];
      row.remianingDuration = row.subslotsCount.split(";")[2];
    } else if (row.ifTicketBasedService === "Y") {
      row.category = "3";
      row.maxTicketCount = row.totalTicketCount;
      row.maxTicketsAllowedPerBooking = row.maxTicketsSoldPerBooking;
    }
    this.setState({
      modelShow: true,
      actionType: "edit",
      editData: row,
    });
  };
  deleteHandler = (row: any) => {
    this.props.deleteBusinessServices(this.props.businessId, {
      serviceName: row.name,
      userRole: "OWNER",
    });
  };
  handleModelShow = () => {
    this.setState({ modelShow: true, actionType: "add", editData: null });
  };
  handleClose = () => {
    this.setState({ modelShow: false, actionType: "add", editData: null });
  };
  handleSubmit = () => {
    this.props.submitForm("addServices");
  };
  handleFormSubmit = (value: any) => {
    console.log(value);
    const request = {
      name: value.name,
      slotsDefinition: value.slotsDefinition,
      price: value.price,
      currency: "RAND",
      ifDoubleTime: "N",
      ifTicketBasedService: "N",
      maxTicketCount: null,
      maxTicketsAllowedPerBooking: null,
      category: value.sarchCategory,
      topCategory: null,
      description: value.description,
    };
    if (value.category === "2") {
      request.ifDoubleTime = "Y";
      request.slotsDefinition =
        value.initialDuration +
        ";" +
        value.restPeriod +
        ";" +
        value.remianingDuration;
    }
    if (value.category === "3") {
      request.ifTicketBasedService = "Y";
      request.maxTicketCount = value.maxTicketCount;
      request.maxTicketsAllowedPerBooking = value.maxTicketsAllowedPerBooking;
    }
    this.props.addBusinessServices(this.props.businessId, {
      ...request,
      userRole: "OWNER",
    });
  };
  isTicketBased = () => {
    const isTicket: any = this.props.serviceList.filter(
      (element: any) => element.ifTicketBasedService === "N"
    );
    return isTicket.length > 0;
  };


    handleModelClose = () => {
        this.setState({ error: null });
      };
      deleteServicess = (value: any) => {
        this.setState({
          success: null,
          deleteServiceData: value,
          modalShow: true,
        });
        console.log(value)
        console.log(value.name)
      };
      handleCancelSubmit = (row: any) => {
        //this.props.submitForm("all-business-list");
        this.handleModelClose();
        console.log(this.state.deleteServiceData.name);
        this.props.deleteBusinessServices(this.props.businessId, {
          serviceName: this.state.deleteServiceData.name,
          userRole: "OWNER",
        });
        this.setState({ error: null, deleteServiceData: null });
        this.setState({});
      };
      handleCancelModelClose = () => {
        this.setState({ error: null, deleteServiceData: null });
        //console.log();
      };
      
      
      formCancelSubmit = () => {
        this.handleModelClose();
      };
    
    




  render() {
    let form: any = lodash.cloneDeep(ServiceUtil.addServiceForm);
    form[0].field[0].props.disable =
      this.state.actionType === "add" ? false : true;
    form[1].field[1].props.options = this.state.topCategory;
    return (
      <>
        <h3 className="stitle">Setup Services</h3>
        {this.state.success && (
          <AlertSuccess
            messages={this.state.success}
            close={this.closeTicket}
          />
        )}
        <List
          listTemplates={this.state.listTemplates}
          listData={this.props.serviceList}
          editHandler={
            //this.props.status !== "APPROVED" ? this.editHandler : null
            this.props.status !== null ? this.editHandler : null
          }
          deleteHandler={
            //this.props.status !== "APPROVED" &&
            this.props.status !== null &&
            this.props.serviceList &&
            this.props.serviceList.length > 1
              //? this.deleteHandler
              ? this.deleteServicess
              : null
          }
        />

        {/* <NoResultFound list={this.props.serviceList} /> */}
        <div className="row">
          {this.props.status !== null && (
            <ButtonWraspper>
              <a
                href={void 0}
                className="abtn"
                style={{
                  width: "152px",
                  borderRadius: "4px",
                }}
                onClick={this.handleModelShow}
              >
                Add Service
              </a>
            </ButtonWraspper>
          )}
          
          {this.state.userRole &&
            !this.isTicketBased() &&
            this.props.serviceList.length > 0 &&
            this.props.edit &&
            this.state.userRole.role === "REVIEWER" &&(
            //this.props.status !== "APPROVED" && (
              <ButtonWraspper>
                <a
                  href={void 0}
                  onClick={this.handleApprove}
                  className="abtn"
                  style={{
                    width: "152px",
                    borderRadius: "4px",
                  }}
                >
                  Approve
                </a>
              </ButtonWraspper>
            )}
        </div>
        <Hr />
        {this.state.deleteServiceData && !this.state.error && (
        <ModalComponent
          title={"Delete Service"}
          showModel={this.state.modalShow}
          handleSubmit={this.handleCancelSubmit}
          handleClose={this.handleCancelModelClose}
          isErrorHandler={false}
        >
          {" "}
          <GenernalForm
            initialValue={{}}
            handleSubmit={this.formCancelSubmit}
            handleOnChange={null}
            formname="cancel"
            formContent={CommentBox1}
          />
        </ModalComponent>
        )}
        {this.state.modelShow && (
          <ModalComponent
            title={"Service Details"}
            showModel={this.state.modelShow}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
          >
            <UserProvider
              value={{
                category: this.props.serviceCategory,
              }}
            >
              <AddServiceForm
                initialValue={
                  this.state.actionType === "add"
                    ? {
                        category: "1",
                        slotsDefinition: "15",
                        sarchCategory:
                          (this.state.topCategory &&
                            this.state.topCategory[0]["value"]) ||
                          "",
                        initialDuration: "15",
                        restPeriod: "15",
                        remianingDuration: "15",
                      }
                    : this.state.editData || {}
                }
                handleSubmit={this.handleFormSubmit}
                formname="addServices"
                formContent={form}
                formValue={{
                  category: this.props.serviceCategory
                    ? this.props.serviceCategory
                    : "1",
                }}
              />
            </UserProvider>
          </ModalComponent>
        )}
      </>
    );
  }
}
const selector = formValueSelector("addServices");

const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
  serviceCategory: selector(state, "category"),
  addBusinessResponse:
    state.addBusiness && state.addBusiness.addBusinessResponse,
  deleteServiceRes:
    state.businessDetails && state.businessDetails.deleteServiceRes,
  approveRes: state.businessDetails && state.businessDetails.approveResponse,
});
const mapDispatchToprops = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  getBusinessServices: (id: number) => dispatch(getBusinessServices(id)),
  addBusinessServices: (id: number, data: object) =>
    dispatch(addBusinessServices(id, data)),
  deleteBusinessServices: (id: number, data: object) =>
    dispatch(deleteBusinessServices(id, data)),
  approveBusiness: (id: number, data: any) =>
    dispatch(approveBusiness(id, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(AddServiceContainer);
