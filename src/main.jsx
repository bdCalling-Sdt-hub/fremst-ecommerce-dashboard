import i18next from "i18next";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.jsx";
import global_en from "./Translation/en/en.global.json";
import global_es from "./Translation/es/es.global.json";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        {/* <LanguageSwitcher /> */}
        {/* <div id="google_translate_element" style={{ display: "none" }}></div> */}
        <LanguageProvider>
          <App />
        </LanguageProvider>
        <Toaster />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
