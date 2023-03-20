import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production") disableReactDevTools();

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
