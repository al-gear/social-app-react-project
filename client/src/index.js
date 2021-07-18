import { render } from "react-dom";
import App from "./App";
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/index";


const store = createStore(reducers, applyMiddleware(thunk))
const root = document.querySelector("#root");



render(
    <Provider store={store} >
        <App />
    </Provider>, root);