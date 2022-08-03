import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AllBussinessList } from "../actionView";
import List from "../../../components/List/list";
import NoResultFound from "../../../components/List/noResultFound";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import searchForm, {
  CommentBox1,
} from "../mangerView/managerViewUtils";
import { submit, getFormValues } from "redux-form";
// import BlockIcon from '@material-ui/icons/Block';
import {
  deleteBusiness,
  getAllBusiness,
} from "../../../api/businessApi";
import { any } from "prop-types";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import FooterComponent from "../../../components/footerComponent";


const LoginWrapper1 = styled.div`
background-position-y: 0px;
padding-top: 10px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 100vh;
`;

const LoginWrapper = styled.div`
  width: 500px;
  margin: auto;
  padding: 7px;
`;
class AllBusinessViewList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      //closeModel: false,
      success: null,
      defaultValue: null,
      reassigment: null,
      staffAvailablity: null,
      modelShow: true,
      error: null,
      markLeave: false,
      listTemplates: {
        thead: ["Business Name", "Owner", "Contact Phone", "Address"],
        tbody: ["businessName", "owner", "phone", "address"],
        //link: true,
        actionItems: {
          edit: true,
          delete: true,
          disable: true,
          seen: false,
        },
      },
    };
  }
  /*state = {
    listTemplates: {
      thead: ["Business Name", "Owner", "Contact Phone", "Address"],
      tbody: ["businessName", "owner", "phone", "address"],
      link: true,
      actionItems: {
        edit: true,
        delete: true,
        disable: true,
        seen: false,
      },
    },
  };*/
  componentDidMount() {
    this.props.AllBusinessList();
  }
  rowHandler = (row: any) => {
    const path = {
      pathname: "/business-details",
      state: { businessId: row.businessId },
    };
    this.props.history.push(path);
  };


  getAllBusinesss = () => {
   this.handleModelClose();
    getAllBusiness()
  };

  deleteBusinesss = (value: any) => {
    this.setState({
      success: null,
      deleteBusinessData: value,
    });
    console.log(value)
  };

  deleteHandler = (id:any, row: any) => {
    this.handleModelClose();
    //alert("this deletes the business, do you want to continue?");
    deleteBusiness(id.businessId, row)
    .then((res: any) => {
       if (!res.error && !res.errors) {
         this.getAllBusinesss();
       } else {
         this.setState({ error: res.error || res.errors });
       }
     })
     .catch((error: any) => {
       this.setState({ error });
     });
     window.location.reload();
  };


   // this.props.deleteBusiness(this.props.businessId, {
     // userRole: "REVIEWER",
    //});
 // };
refresh = () => {
  window.location.reload();
}

 handleLeaveCancelSubmit = () => {
  //this.props.submitForm("all-business-list");
  this.handleModelClose();
  const request = {
    row: any
  }
  deleteBusiness(this.state.deleteBusinessData.businessId, request)
  .then((res: any) => {
    if (!res.error && !res.errors) {
      window.location.reload();
    } else {
      this.setState({ error: res.error || res.errors });
    }
  })
  .catch((error: any) => {
    this.setState({ error });
  });
  console.log(this.state.deleteBusinessData.businessId);
  this.setState({ error: null, deleteBusinessData: null });
  //window.location.reload()
  this.setState({});
  //this.refresh();
};

handleLeaveModelClose = () => {
  this.setState({ error: null, deleteBusinessData: null });
  console.log(this.state.deleteBusinessData.businessId);
};


formLeaveSubmit = () => {
  this.handleModelClose();
};

  handleModelClose = () => {
    this.setState({ error: null });
  };

  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "70px",
      border: "0px",
      background: "white",
    };
    return (
      <section className="create-listing">
        <LoginWrapper1>
        <div className="wrapper" id="mview" style={loginStyle}>
          <h3>Business Awaiting Approvals</h3>
          <div className="row">
            <List
              listTemplates={this.state.listTemplates}
              listData={
                this.props.businessListRes && this.props.businessListRes.data
                  ? this.props.businessListRes.data
                  : []
              }
              //deleteHandler={this.deleteHandler}
              deleteHandler={this.deleteBusinesss}
              //rowClick={this.rowHandler}
              editHandler={this.rowHandler}
              
            />
            <NoResultFound
              list={
                this.props.businessListRes && this.props.businessListRes.data
              }
              text={"No businesses are awaiting approval !"}
            />
          </div>
        </div>

        {this.state.deleteBusinessData && !this.state.error && (
        <ModalComponent
          title={"Delete Business"}
          showModel={this.state.modelShow}
          handleSubmit={this.handleLeaveCancelSubmit}
          handleClose={this.handleLeaveModelClose}
          isErrorHandler={false}
        >
          {" "}
          <GenernalForm
            initialValue={{}}
            handleSubmit={this.formLeaveSubmit}
            handleOnChange={null}
            formname="cancel"
            formContent={CommentBox1}
          />
        </ModalComponent>
        )}
      </LoginWrapper1>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.allBusinessResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  AllBusinessList: () => dispatch(AllBussinessList()),
  submitForm: (formname: string) => dispatch(submit(formname)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllBusinessViewList);
