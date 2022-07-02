import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Room from "../components/room";
import ConversationsList from '../components/conversationsList';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ ConversationsList } />
      <Route exact path="/room" component={ Room } />
      <Route exact path="/chat" component={ ConversationsList } />
      <Route exact path="*" component={() => <h2>A página que vc tento acessar não foi encontrada :( </h2>} />

    </Switch>
  </BrowserRouter>
);

export default Routes;