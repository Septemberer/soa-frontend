import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from "react-router-dom";
import * as app from "react";
import * as path from "path";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App />
    </Router>
);

app.use(express.static(__dirname));

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});