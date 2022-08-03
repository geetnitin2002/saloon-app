import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./root";
import { Beforeunload } from "react-beforeunload";
interface ISessionProps {
  userSetting?: any;
}
class App extends React.Component<ISessionProps> {
  // constructor(props: any) {
  //   super(props);
  //   // if (process.env.NODE_ENV !== "development") {
  //   //   // const sessionAPI = new SessionHandlerService();
  //   //   // sessionAPI.initListener();
  //   //   // sessionAPI.setInitialInterval(this.props.refreshToken);
  //   // }
  // }

  componentDidMount() {
    // this.props.getUserSetting();
  }
  onReload = (e: any) => {
    // return "You'll lose your data!";
    if (window.location.pathname !== "/business-registration") {
      e.stopPropagation();
    }
  };
  render() {
    return (
      <Router>
        <Beforeunload onBeforeunload={(e) => this.onReload(e)}>
          <Root {...this.props} />
        </Beforeunload>
      </Router>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   refreshToken: () => dispatch(refreshToken())
// });
const mapStateToProps = (state: any) => ({
  userSetting: state.UserSetting,
});
export default connect(mapStateToProps, null)(App);
