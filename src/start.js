import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';

let element;
const userIsLoggedIn = location.pathname != '/welcome';

if (!userIsLoggedIn) {
    element = <Welcome />;
} else {
    element = <h1>I will be the Main Page!!!</h1>;
}

ReactDOM.render(
    element,
    document.querySelector('main')
);



