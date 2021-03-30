
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
import {BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
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
import { isLoggedIn } from './firebase';
import Routes from './routes/routes';

const App = (props) => {

        
        return ( 
                <BrowserRouter>
                <UserProvider>
                <CommercialProvider>
                <CartProvider>
                <MercadoPagoProvider>
        
                        <NavBarComponent />
                        <ToastContainer />

                        <AuthModal/>
                        <Routes/>

                </MercadoPagoProvider>
                </CartProvider>
                </CommercialProvider>
                </UserProvider>
                </BrowserRouter>

        );
}

export default App;
