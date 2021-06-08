import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Product from './components/Pages/Product/Product';
import Sale from './components/Pages/Sale/Sale';
import New from './components/Pages/NewItem/New';
import Accessory from './components/Pages/Accessory/Accessory';
import Men from './components/Pages/Men/Men';
import Women from './components/Pages/Women/Women';
import SignIn from './components/Pages/SignIn/SignIn';
import Cart from './components/Pages/Cart/Cart';
import Payment from './components/Pages/Cart/Payment';
import './App.css';

const App = () => {
  return (
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/sale" component={Sale}/>
            <Route path="/new" component={New}/>
            <Route path="/accessory" component={Accessory}/>
            <Route path="/men" component={Men}/>
            <Route path="/women" component={Women}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/sign" component={SignIn}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/product/:id" component={Product}/>
          </Switch>
        <Redirect to="/"/>
      </BrowserRouter>
  );
}

export default App;
