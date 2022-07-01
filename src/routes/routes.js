import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ChatMessage from "../components/chatMessage";
import Room from "../components/room";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ ChatMessage } />
      <Route exact path="/room" component={ Room } />
      <Route exact path="*" component={() => <h2>A página que vc tento acessar não foi encontrada :( </h2>} />

    </Switch>
  </BrowserRouter>
);

export default Routes;