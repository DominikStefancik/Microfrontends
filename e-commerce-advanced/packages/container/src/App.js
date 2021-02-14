import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";

// lazily load MarketingApp when a user in the location which is processed by the MarketingApp
// NOTE: 'MarketingLazyLoad' is a React component (that's why the capital first letter)
const MarketingLazyLoad = lazy(() => import("./components/MarketingApp"));

// lazily load AuthenticationApp when a user in the location which is processed by the AuthenticationApp
// NOTE: 'AuthenticationLazyLoad' is a React component (that's why the capital first letter)
const AuthenticationLazyLoad = lazy(() =>
  import("./components/AuthenticationApp")
);

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthenticationLazyLoad onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazyLoad} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}
