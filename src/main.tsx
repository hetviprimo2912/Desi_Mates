
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { store } from "./Store/store";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(

  <Provider store={store}>
    <BrowserRouter basename="/admin">
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>
  </Provider>

);