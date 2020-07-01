import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import App from './App'

let element;
const userIsLoggedIn = location.pathname != '/welcome';

if (!userIsLoggedIn) {
    element = <Welcome />;
} else {
    //element = <Logo />;
    element = <App />;
}

ReactDOM.render(
    element,
    document.querySelector('main')
);



