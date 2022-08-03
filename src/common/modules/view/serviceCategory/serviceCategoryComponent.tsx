import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AllBussinessList } from "../actionView";
import { Link } from "react-router-dom";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/uploads/logo1.png";
import List from "../../../components/List/list";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import { submit } from "redux-form";
import {
  serviceCategories,
  AddserviceCategories,
  deleteserviceCategories,
} from "../../../api/businessApi";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import MultiSelectField from "../../../components/Form/inputMultiSelect";
import InputDateField from "../../../components/Form/inputDate";
import searchForm, {
  CommentBox1,
} from "../mangerView/managerViewUtils";
import { any } from "prop-types";
import FooterComponent from "../../../components/footerComponent";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import BUSINESS_APP from "./../../../../apiConfig";

const LoginWrapper = styled.div`
background-position-y: 0px;
padding-top: 10px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 100vh;
`;

const SIDENAV = styled.div`
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #123145;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 2px;
  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: white;
    display: block;
    transition: 0.3s;
  }
  a:hover {
    color: #f1f1f1;
  }
`;
const Button: any = styled.button`
  background: ${(props: any) => (props.primary ? "#123145" : "white")};
  color: ${(props: any) => (props.primary ? "white" : "#123145")};
  background: #123145;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #123145;
  border-radius: 3px;
  padding: 10px;
  float: -1px;
  width: 13%;
  height: 41px;
  margin-top: 11px;
  text-align: center;
  cursor: pointer;
  margin-left: 38px;
  /* margin-top: 26px*/
`;
const ButtonWraspper = styled.div`
  margin: 16px;
`;
class AdminView extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      //closeModel: false,
      //success: null,
      modelShow: true,
      //error: null,
      listTemplates: {
        thead: ["Cateroties"],
        tbody: ["cateroties"],
        link: true,
        actionItems: {
          delete: true,
        },
      },
      formBox: [
        {
          classname: "form-col",
          field: [
            {
              component: InputField,
              props: {
                type: "text",
                name: "comment",
                icons: "",
                validations: [ErrorUtils.maxLength(200)],
                FormClass: "col-sm-12",
              },
            },
          ],
        },
      ],
      success: null,
      topCategory: [],
      error: null,
    };
  }

  formSubmit = (value: any) => {
    // console.log(value);
    this.handleModelClose();
    AddserviceCategories(value.comment)
      .then((res: any) => {
        if (!res.error && !res.errors) {
          let rest = [];
          for (let data of res.data) {
            rest.push({ label: data, value: data, cateroties: data });
          }
          this.setState({ topCategory: rest });
        } else {
          this.setState({ error: res.error || res.errors });
        }
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
  handleSubmitForm = (e: any) => {
    this.props.submitForm("add-services");
    e.preventDefault();
  };

  componentDidMount() {
    this.getServiceCategories();
  }
  getServiceCategories = () => {
    this.handleModelClose();
    serviceCategories()
      .then((res: any) => {
        if (!res.error && !res.errors) {
          //console.log(res);
          let rest = [];
          for (let data of res.data) {
            rest.push({ label: data, value: data, cateroties: data });
          }
          this.setState({ topCategory: rest });
        } else {
          this.setState({ error: res.error || res.errors });
        }
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  deleteRecord = (row: any) => {
    this.handleModelClose();
    deleteserviceCategories(row.label)
      .then((res: any) => {
        if (!res.error && !res.errors) {
          this.getServiceCategories();
        } else {
          this.setState({ error: res.error || res.errors });
        }
      })
      .catch((error: any) => {
        this.setState({ error });
      });
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };




  deleteServicess = (value: any) => {
    this.setState({
      success: null,
      deleteServiceData: value,
    });
    console.log(value)
    console.log(value.label)
  };

  handleCancelSubmit = () => {
    //this.props.submitForm("all-business-list");
    this.handleModelClose();
    deleteserviceCategories(this.state.deleteServiceData.label)
    .then((res: any) => {
      if (!res.error && !res.errors) {
        this.getServiceCategories();
      } else {
        this.setState({ error: res.error || res.errors });
      }
    })
    .catch((error: any) => {
      this.setState({ error });
    });

    this.setState({ error: null, deleteServiceData: null });
    //window.location.reload()
    this.setState({});
    //this.refresh();
  };
  
  handleCancelModelClose = () => {
    this.setState({ error: null, deleteServiceData: null });
    //console.log();
  };
  
  
  formCancelSubmit = () => {
    this.handleModelClose();
  };





  servicesLoad =() => {
    
  };
  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "150px",
      border: "0px",
    };
    return (
      <>
        <header id="masthead" className="site-header site-header--fluid">
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
            <div className="d-lg-flex align-items-lg-center">
            <div className="site-header__logo">
              <h1 className="screen-reader-text">The Salon</h1>
              <p className="page-banner__title_p1">
              {/* <a href={this.props.imageUrl}> */}
                <a  href={BUSINESS_APP.BUSINESS_APP}>
                    <img
                      src={SalonLogo}
                      alt="Salon"
                      style={{ width: "63%", height: "75%", marginBottom: "-20px" }} />
                {/* </a> */}
              </a></p>
              <a  href={BUSINESS_APP.BUSINESS_APP}>
              <p className="logoname">lettuce</p>
              <p className="logoname1">book</p>
              </a>
            </div>
                <br>
                </br>
          </div>
            <div className="d-lg-flex align-items-lg-center">
            <div className="user-action" style={{ right: "4px" }}>
              
            <a href={`${BUSINESS_APP.BUSINESS_APP}`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <span style={{ marginLeft: "5px" }}>Home</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}About`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <span style={{ marginLeft: "5px" }}>About</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}login`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-user" />
                <span style={{ marginLeft: "5px" }}>Sign in</span>
            </a> 
            <a href={`${BUSINESS_APP.BUSINESS_SEARCH}business-registration`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                <i className="fa fa-building-o" />
                <span style={{ marginLeft: "5px" }}>Business sign up</span>
            </a>
              </div>
            </div>

            <div className="d-lg-none nav-mobile">
              {/* <a
                href="#"
                className="nav-toggle js-nav-toggle nav-toggle--white"
              >
                <span></span>
              </a> */}
            </div>
          </div>
        </header>
        <LoginWrapper>
        <section className="create-listing" >
          <div
            className="wrapper"
            style={{
              //border: "2px solid #123145",
              // width: "439px",
              padding: " 20px 40px 100px 40px", 
              margin: "5px auto",
              background: "white",
              borderTop: "50px",
            }}
          >
            <h3>Service Categories</h3>

            <div className="row">
              <List
                listTemplates={this.state.listTemplates}
                listData={this.state.topCategory}
                //deleteHandler={this.deleteRecord}
                deleteHandler={this.deleteServicess}
              />
              <GenernalForm
                initialValue={{}}
                handleSubmit={this.formSubmit}
                handleOnChange={null}
                formname="add-services"
                formContent={this.state.formBox}
              />
              <Button onClick={this.handleSubmitForm}>Add</Button>
            </div>
          </div>

            
        {this.state.deleteServiceData && !this.state.error && (
        <ModalComponent
          title={"Delete Service"}
          showModel={this.state.modelShow}
          handleSubmit={this.handleCancelSubmit}
          handleClose={this.handleCancelModelClose}
          isErrorHandler={false}
        >
          {" "}
          <GenernalForm
            initialValue={{}}
            handleSubmit={this.formCancelSubmit}
            handleOnChange={null}
            formname="cancel"
            formContent={CommentBox1}
          />
        </ModalComponent>
        )}

        </section></LoginWrapper>
        <FooterComponent />
        {this.state.error && (
          <ModalComponent
            title={"Error Details"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.handleModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.state.error} />
          </ModalComponent>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.allBusinessResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  AllBusinessList: () => dispatch(AllBussinessList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
