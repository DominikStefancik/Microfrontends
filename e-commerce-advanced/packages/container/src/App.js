import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";

// lazily load MarketingApp when a user in the location which is processed by the MarketingApp
// NOTE: 'MarketingLazyLoad' is a React component (that's why the capital first letter)
const MarketingLazyLoad = lazy(() => import("./components/MarketingApp"));

// lazily load AuthenticationApp when a user in the location which is processed by the AuthenticationApp
// NOTE: 'AuthenticationLazyLoad' is a React component (that's why the capital first letter)
const AuthenticationLazyLoad = lazy(() =>
  import("./components/AuthenticationApp")
);

// lazily load DashboardApp when a user in the location which is processed by the DashboardApp
// NOTE: 'DashboardLazyLoad' is a Vue component (that's why the capital first letter)
const DashboardLazyLoad = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const containerHistory = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // the function inside the 'useEffect' runs everytime the value of the 'isSignedIn' changes
  useEffect(() => {
    // a user just signed in
    if (isSignedIn) {
      containerHistory.push("/dashboard"); // redirect to dashboard
    }
  }, [isSignedIn]);

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={containerHistory}>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthenticationLazyLoad onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazyLoad />
              </Route>
              <Route path="/" component={MarketingLazyLoad} />
            </Switch>
          </Suspense>
        </Router>
      </StylesProvider>
    </div>
  );
}
