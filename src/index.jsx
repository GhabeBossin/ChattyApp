// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));

// ok, I wasn't sure, I've never used one before. It's giving me an error?

//oh hang on a sec that's JSHint
// it's supposed to be ESLint
//get rid of your JSHintrc

// check your file directory
// .jshintrc in this project directory
//in vagrant? in this project?kk

// if you have the jshint extension installed you should disable it as well

