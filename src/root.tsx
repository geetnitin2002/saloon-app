import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./layout";

const oAuth = () => {
  return process.env.NODE_ENV === "development"
    ? true
    : !!localStorage.getItem("userToken");
};

const ProtectedRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props =>
      // pass the sub-routes down to keep nesting
      oAuth() ? (
        <route.component {...props} routes={route.routes} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
const PublicRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

class Root extends React.Component<any> {
  render() {
    return (
      <Switch>
        {publicRoutes &&
          publicRoutes.map((route: any, i) => (
            <PublicRoutes key={i} {...route} />
          ))}
        {protectedRoutes &&
          protectedRoutes.map((route: any, i: any) => (
            <ProtectedRoutes key={i} {...route} />
          ))}
      </Switch>
    );
  }
}

export default Root;
