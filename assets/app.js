var $ = require('jquery');
global.$ = global.jQuery = $;
window.$ = window.jQuery = $
require('bootstrap/dist/js/bootstrap.bundle');

import './styles/app.scss';

// start the Stimulus application
import './bootstrap';
// assets/app.js
import { registerReactControllerComponents } from '@symfony/ux-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './react/components/Home';

// Registers React controller components to allow loading them from Twig
//
// React controller components are components that are meant to be rendered
// from Twig. These component then rely on other components that won't be called
// directly from Twig.
//
// By putting only controller components in `react/controllers`, you ensure that
// internal components won't be automatically included in your JS built file if
// they are not necessary.
registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})
ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));