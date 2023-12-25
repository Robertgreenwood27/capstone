// Layout.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from '../decks/Home';
import Study from '../decks/Study';
import CreateDeck from '../decks/CreateDeck';
import Deck from '../decks/Deck';
import EditDeck from '../decks/EditDeck';
import AddCard from '../decks/AddCard';
import EditCard from '../decks/EditCard';
import NotFound from './NotFound';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/decks/new" component={CreateDeck} />
          <Route exact path="/decks/:deckId" component={Deck} />
          <Route path="/decks/:deckId/study" component={Study} />
          <Route path="/decks/:deckId/edit" component={EditDeck} />
          <Route path="/decks/:deckId/cards/new" component={AddCard} />
          <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
