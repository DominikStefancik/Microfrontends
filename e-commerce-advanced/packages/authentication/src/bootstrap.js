import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start the app
const mount = (element, { onNavigate, defaultHistoryObject, initialPath }) => {
  // represents a memory history object which will be used for customised routing inside the Authentication app
  // the 'defaultHistoryObject' is only provided when the Authentication app runs in the development mode and isolation
  const memoryHistoryObject =
    defaultHistoryObject ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    // "memoryHistoryObject.listen" accepts an event listener which is fired when any navigation occurs inside the Authentication app
    memoryHistoryObject.listen(onNavigate);
  }

  ReactDOM.render(<App history={memoryHistoryObject} />, element);

  // we create an object and pass it to the Container app
  // this object contains functions which will be called from the Container app
  // to update the memory history object used in the Authentication app
  return {
    // is called when the Container app navigates to a different location
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = memoryHistoryObject.location;

      // update the history object only if we want to go to a location which is different than the location where we currently are
      if (pathname !== nextPathname) {
        memoryHistoryObject.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRootElement = document.querySelector("#_auth-dev-root");

  if (devRootElement) {
    mount(devRootElement, { defaultHistoryObject: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
