import React, { Component, Fragment, Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

//Component Imports
import Authentication from "./Core/Authentication";
import Routes from "./Core/Routes";

//Lazy Imports
const Login = React.lazy(() => import("./Components/Login/Login"));
const Home = React.lazy(() => import("./Components/Home/Home"));

const ProtectedRoute = () => {
  const routes = [
    {
      path: "/home",
      component: Home,
      exact: true,
    },
  ];
  return (
    <>
      <Suspense fallback={<>Please wait.....</>}>
        <Routes routes={routes} redirectTo="/" />
      </Suspense>
    </>
  );
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Suspense fallback={<div>Loader Component</div>}>
            <Switch>
              <Route path="/" component={Login} exact />
              <Authentication>
                <ProtectedRoute />
              </Authentication>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Router>
      </Fragment>
    );
  }
}

export default App;
