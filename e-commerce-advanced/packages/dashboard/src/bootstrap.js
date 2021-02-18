import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start the app
const mount = (element) => {
  const app = createApp(Dashboard);
  app.mount(element);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRootElement = document.querySelector("#_dashboard-dev-root");

  if (devRootElement) {
    mount(devRootElement);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
