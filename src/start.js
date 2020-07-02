import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import App from './App'

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);



//elem =


let element;
const userIsLoggedIn = location.pathname != '/welcome';

if (!userIsLoggedIn) {
    element = <Welcome />;
} else {
    //element = <Logo />;
    element = (
        <Provider store={store}>
            <App />
        </Provider>
    );;
}

ReactDOM.render(
    element,
    document.querySelector('main')
);



