
import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/navBar';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';
import  React from 'react';
import  {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import HomeContainer from './containers/home';

const App = () => {

    
  return (
      
    <BrowserRouter>
                <NavBarComponent />
        <Switch>

            <Route exact path="/">
                <HomeContainer/>    
            </Route>

            <Route exact path="/product/:id">
                    <ItemDetailContainer/>
            </Route>

            <Route exact path='/tienda/:categoryId?'>
                    <ItemListContainer/>
            </Route>

            <Route exact path="/cart">
                    <h1>HOLA CARRITO</h1>
            </Route>

            <Route path="*" children={<div>Not found</div>} />

        </Switch>
    


    </BrowserRouter>

  );
}

export default App;
