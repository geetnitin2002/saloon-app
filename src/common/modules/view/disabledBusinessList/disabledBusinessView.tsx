import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { DisabledBussinessList } from "../actionView";
import List from "../../../components/List/list";
import NoResultFound from "../../../components/List/noResultFound";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import ListGroup from 'react-bootstrap/ListGroup'
import {
  enableBusiness,
  getDisabledBusiness,
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
class DisabledBussinessViewList extends React.PureComponent<any, any> {
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
    this.props.DisabledBussinessList();
  }
  rowHandler = (row: any) => {
    const path = {
      pathname: "/business-details",
      state: { businessId: row.businessId },
    };
    this.props.history.push(path);
  };


  
  getDisabledBusiness = () => {
    this.handleModelClose();
    getDisabledBusiness();
  }

  enableHandler = (id:any, row: any) => {
    this.handleModelClose();
    enableBusiness(id.businessId, row)
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
          <h3>Disabled Businesses</h3>
            <List
              listTemplates={this.state.listTemplates}
              listData={
                this.props.businessListRes && this.props.businessListRes.data
                  ? this.props.businessListRes.data
                  : []
              }
              //rowClick={this.rowHandler}   
              editHandler={this.rowHandler}          
              enableHandler={ this.enableHandler}
            />
              
            <NoResultFound
              list={
                this.props.businessListRes && this.props.businessListRes.data
              }
              text={"No businesses are disabled !"}
            />
          </div>
          </LoginWrapper1>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  businessListRes:
    state.businessDetails && state.businessDetails.disabledBusinessResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  DisabledBussinessList: () => dispatch(DisabledBussinessList()),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisabledBussinessViewList);
