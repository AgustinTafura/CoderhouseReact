
import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';
import  React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import {CartProvider} from './context/CartContext';
import {CommercialProvider} from './context/CommercialContext';
import productList from './mock/productList.jsx'
import {getFirestore} from "./firebase";
// var baseDeDatos = getFirestore();
// productList.map((u, i) => { baseDeDatos.collection("products").add(u)})
const App = () => {

    
        return ( 
                <CommercialProvider>
                        <CartProvider>
                                <BrowserRouter>
                                        
                                        <NavBarComponent />
                                
                                        <Switch>

                                                <Route exact path="/">
                                                        <HomeContainer/>    
                                                </Route>

                                                <Route exact path="/booking">
                                                        PROXIMAMENTE TURNOS ONLINE
                                                </Route>

                                                <Route exact path="/checkout">
                                                        <CheckoutContainer/>
                                                </Route>

                                                <Route exact path="/product/:id">
                                                        
                                                        <ItemDetailContainer/>
                                                </Route>

                                                <Route exact path='/tienda/:categoryId?'>
                                                        <ItemListContainer/>
                                                </Route>

                                                <Route exact path="/cart">
                                                        <CartContainer/> 
                                                </Route>

                                                <Route path="*" children={<div>Not found</div>} />

                                        </Switch>
                                </BrowserRouter>
                        </CartProvider>
                </CommercialProvider>

        );
}

export default App;
