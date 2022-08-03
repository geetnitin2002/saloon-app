import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ApprovedBussinessList } from "../actionView";
import List from "../../../components/List/list";
import NoResultFound from "../../../components/List/noResultFound";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import ListGroup from 'react-bootstrap/ListGroup';
import {
  disableBusiness,
  getApprovedBusiness,
} from "../../../api/businessApi";
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
class ApprovedBusinessViewList extends React.PureComponent<any, any> {
  state = {
    listTemplates: {
      thead: ["Business Name", "Owner", "Contact Phone", "Address"],
      tbody: ["businessName", "owner", "phone", "address"],
      //link: true,
      actionItems: {
        edit: true,
        delete: true,
        disable: true,
        enable: true,
        
      },
    },
  };
  componentDidMount() {
    this.props.ApprovedBusinessList();
  }
  rowHandler = (id: any, row: any) => {

    if (localStorage.getItem("userDetail")) {
      var userDetails: any = localStorage.getItem("userDetail");
      console.log(JSON.parse(userDetails));
      userDetails = JSON.parse(userDetails);
      if (userDetails.roles.length > 0 && userDetails.roles[0] === "ADMIN") {
        const path = {
          pathname: "/manager-view/" + id.businessId,
          state: { userId: userDetails.userId },
        };
        this.props.history.push(path);
      }
  };
  };
  
  getApprovedBusiness = () => {
      this.handleModelClose();
      getApprovedBusiness();
  }
  disableHandler = (id:any, row: any) => {
    this.handleModelClose();
    disableBusiness(id.businessId, row)
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
  };

  manageHandler = (id:any, row: any ) => {
    this.handleModelClose();
    //manageBusiness(id.businessId, row)
   // alert("Manage Handler");

    if (localStorage.getItem("userDetail")) {
      var userDetails: any = localStorage.getItem("userDetail");
      console.log(JSON.parse(userDetails));
      userDetails = JSON.parse(userDetails);
      if (userDetails.roles.length > 0 && userDetails.roles[0] === "ADMIN") {
        const path = {
          pathname: "/manager-view/" + id.businessId,
          state: { userId: userDetails.userId },
        };
        this.props.history.push(path);
      }

  };
}
  
  handleModelClose = () => {
    this.setState({ error: null });
  };
  render() {
    const loginStyle = {
      background: "white",
      minHeight: "0px",
      top: "150px",
      border: "0px",
    };
    return (
      <section className="create-listing">
        <LoginWrapper1>
        <div className="wrapper" id="mview" style={loginStyle}>
          <h3>Approved and Active Businesses</h3>
          <div className="row">
            <List
              listTemplates={this.state.listTemplates}
              listData={
                this.props.businessListRes && this.props.businessListRes.data
                  ? this.props.businessListRes.data
                  : []
              }
              //rowClick={this.rowHandler}          
              editHandler={this.rowHandler}   
              disableHandler={this.disableHandler}
            />

            <NoResultFound
              list={
                this.props.businessListRes && this.props.businessListRes.data
              }
              text={"No businesses are active !"}
            />            
        </div>
        </div>
        </LoginWrapper1>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.approvedBusinessResponse
});
const mapDispatchToProps = (dispatch: any) => ({
  ApprovedBusinessList: () => dispatch(ApprovedBussinessList()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovedBusinessViewList);
