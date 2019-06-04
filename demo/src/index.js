import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import DesignerPage from './Designer';

ReactDOM.render(
  <Router>
    <Route path="/designer" component={DesignerPage} />
  </Router>,
  document.getElementById('root'),
);
