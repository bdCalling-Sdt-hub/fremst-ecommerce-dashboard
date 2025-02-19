import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <React.StrictMode>
      <Provider store={store}>
        {/* <LanguageSwitcher /> */}
        {/* <div id="google_translate_element" style={{ display: "none" }}></div> */}

        <App />

        <Toaster />
      </Provider>
    </React.StrictMode>
  </LanguageProvider>
);
