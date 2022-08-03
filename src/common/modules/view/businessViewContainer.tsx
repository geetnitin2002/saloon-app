import React from "react";
import styled from "styled-components";
import ChooseRoleForm from "../../components/Form/generalForm";
import RoleForm from "./businessViewUtils";

const LoginWrapper = styled.div`
  width: 500px;
  margin: auto;
  padding: 7px;
`;
class BusinessViewContainer extends React.PureComponent<any, any> {
  handleSubmit = () => {};
  handleChange = (value: any) => {
    console.log(value);
  };
  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "70px"
    };
    return (
      <LoginWrapper>
        <div className="wizard clearfix" style={loginStyle}>
          <h3>Please select Role</h3>
          <ChooseRoleForm
            initialValue={{}}
            handleOnChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            formname="roleForm"
            formContent={RoleForm}
          />
        </div>
      </LoginWrapper>
    );
  }
}

export default BusinessViewContainer;
