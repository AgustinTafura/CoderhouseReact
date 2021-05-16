
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/NavBar';
import AuthModal from './components/AuthModal';
import  React from 'react';
import {BrowserRouter } from 'react-router-dom';
import {CartProvider} from './context/CartContext';
import {UserProvider} from './context/UserContext';
import {CommercialProvider} from './context/CommercialContext';
import {MercadoPagoProvider} from './context/MercadoPagoContext';
import { ToastContainer } from 'react-toastify';
import Routes from './routes/routes';
import { OrderProvider } from './context/OrderContext';
import ScrollToTop from './components/ScrollToTop'

const App = (props) => {

        
        return ( 
                <BrowserRouter>
                <ScrollToTop/>
                <UserProvider>
                <CommercialProvider>
                <CartProvider>
                <OrderProvider>
                <MercadoPagoProvider>
        
                        <NavBarComponent />
                        <ToastContainer limit={1} />

                        <AuthModal/>
                        <Routes/>

                </MercadoPagoProvider>
                </OrderProvider>      
                </CartProvider>
                </CommercialProvider>
                </UserProvider>
                </BrowserRouter>

        );
}

export default App;
