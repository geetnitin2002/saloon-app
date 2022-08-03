/** Importing this file was not working, placed it temporarily for filters. Will remove in next MR after moving filters to shared */
import * as React from "react";
import { reduxForm } from "redux-form";

class Form extends React.PureComponent<any> {
  render() {
    const { children, handleSubmit, buttonComponent } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement<any>, {
        change: this.props.change,
        reset: this.props.reset,
        valid: this.props.valid
      })
    );
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        {childrenWithProps}
      </form>
    );
  }
}

export default reduxForm({
  enableReinitialize: true
})(Form);
