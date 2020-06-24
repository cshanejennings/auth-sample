import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { PrivateRoute } from "./utils";

import Header from "./components/Header/Header.js";

import Home from "./features/home/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Logout from "./features/auth/Logout";

import Dashboard from "./features/dashboard";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
          {this.props.children}
        </main>
      </BrowserRouter>
    );
  }
}
