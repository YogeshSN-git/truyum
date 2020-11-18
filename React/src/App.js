import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Menuitemsadmin from './components/Menuitemsadmin';
import Menuitemsuser from './components/Menuitemsuser';
import Addmenuitem from './components/Addmenuitem';
import Editmenuitem from './components/Editmenuitem';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/menuitemsadmin" component={Menuitemsadmin} />
        <Route exact path="/menuitemsuser" component={Menuitemsuser} />
        <Route exact path="/addmenuitem" component={Addmenuitem} />
        <Route exact path="/editmenuitem/:menuid" component={Editmenuitem} />
        <Route exact path="/cart/:userid" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
