import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start the app
const mount = (element) => {
  ReactDOM.render(<App />, element);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRootElement = document.querySelector("#_marketing-dev-root");

  if (devRootElement) {
    mount(devRootElement);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
