import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import WayBill from './routes/WayBill';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route  path="/" component={WayBill} />
      <Route  path="/waybill" component={WayBill} />
    </Router>
  );
};
