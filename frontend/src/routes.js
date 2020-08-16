import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./pages/main/"
import Regiter from "./pages/register/"
import Dashboard from "./pages/dashboard/"

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={Regiter} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
