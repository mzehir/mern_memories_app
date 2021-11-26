import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./bootstrap.min.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import memoriesReducer from "./reducers/memoriesReducer";

const reducer = combineReducers({
  memories: memoriesReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
