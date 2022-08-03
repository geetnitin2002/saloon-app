import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { EditedBussinessList } from "../actionView";
import List from "../../../components/List/list";
import NoResultFound from "../../../components/List/noResultFound";
import GenernalForm from "../../../components/Form/generalForm";
import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import ListGroup from 'react-bootstrap/ListGroup';
import {
  getEditedBusiness,
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
class EditedBusinessViewList extends React.PureComponent<any, any> {
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
    this.props.EditedBusinessList();
  }
  rowHandler = (row: any) => {
    const path = {
      pathname: "/business-details",
      state: { businessId: row.businessId },
    };
    this.props.history.push(path);
  };
  getEditedBusiness = () => {
    this.handleModelClose();
    getEditedBusiness();
  } 
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
          <h3>Edited Businesses</h3>
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
              //disableHandler={this.disableHandler}
            />

            <NoResultFound
              list={
                this.props.businessListRes && this.props.businessListRes.data
              }
              text={"No edited business is waiting for approval  !"}
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
    state.businessDetails && state.businessDetails.editedBusinessResponse
});
const mapDispatchToProps = (dispatch: any) => ({
  EditedBusinessList: () => dispatch(EditedBussinessList()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditedBusinessViewList);
