import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import Logo from './logo';

let element;
const userIsLoggedIn = location.pathname != '/welcome';

if (!userIsLoggedIn) {
    element = <Welcome />;
} else {
    element = <Logo />;
}

ReactDOM.render(
    element,
    document.querySelector('main')
);



