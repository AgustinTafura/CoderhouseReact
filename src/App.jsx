
import logo from './logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/NavBar';
import AuthModal from './components/AuthModal';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';
import  React, { useContext } from 'react';
import {BrowserRouter, Switch, Route, useLocation, Redirect} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import ThanksContainer from './containers/ThanksContainer';
import WelcomeContainer from './containers/WelcomeContainer';
import {CartProvider} from './context/CartContext';
import {UserProvider} from './context/UserContext';
import {CommercialProvider} from './context/CommercialContext';
import {MercadoPagoProvider} from './context/MercadoPagoContext';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound';

const App = () => {
        return ( 
                <UserProvider>
                <CommercialProvider>
                        <CartProvider>
                                <MercadoPagoProvider>
                                                        <BrowserRouter>
        
                                                                <NavBarComponent />
                                                                <ToastContainer />

                                                                <AuthModal/>

                                                        
                                                                <Switch>

                                                                        <Route exact path="/">
                                                                                <HomeContainer/>    
                                                                        </Route>

                                                                        <Route exact path="/booking">
                                                                                PROXIMAMENTE TURNOS ONLINE
                                                                        </Route>

                                                                        
                                                                        <Route exact path="/welcome">
                                                                                <WelcomeContainer/>     
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

                                                                        <Route exact path="/checkout">
                                                                                <CheckoutContainer/>
                                                                        </Route>

                                                                        <Route exact path="/thankYou">
                                                                                <ThanksContainer/>    
                                                                        </Route>
                                                                        
                                                                        <Route path="*">
                                                                                <NotFound/>
                                                                        </Route>



                                                                </Switch>
                                                        </BrowserRouter>
                                </MercadoPagoProvider>
                        </CartProvider>
                </CommercialProvider>
                </UserProvider>

        );
}

export default App;
