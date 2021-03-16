
import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';
import  React from 'react';
import {BrowserRouter, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import ThanksContainer from './containers/ThanksContainer';
import {CartProvider} from './context/CartContext';
import {CommercialProvider} from './context/CommercialContext';
import {MercadoPagoProvider} from './context/MercadoPagoContext';
import productList from './mock/productList.jsx'
import {getFirestore} from "./firebase";


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



                                                        <Route exact path="/product/:id">
                                                                
                                                                <ItemDetailContainer/>
                                                        </Route>

                                                        <Route exact path='/tienda/:categoryId?'>
                                                                <ItemListContainer/>
                                                        </Route>

                                                        <MercadoPagoProvider>
                                                                <Route exact path="/cart">
                                                                        <CartContainer/> 
                                                                </Route>

                                                                <Route exact path="/checkout">
                                                                        <CheckoutContainer/>
                                                                </Route>

                                                                <Route exact path="/thankYou">
                                                                        <ThanksContainer/>    
                                                                </Route>
                                                        </MercadoPagoProvider>

                                                        <Route path="*" children={<div style={{marginTop: '100px'}}>Not found</div>} />


                                                </Switch>
                                        </BrowserRouter>
                        </CartProvider>
                </CommercialProvider>

        );
}

export default App;
