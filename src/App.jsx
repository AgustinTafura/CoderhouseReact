
import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBarComponent from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';
import  React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomeContainer from './containers/Home';
import CartContainer from './containers/Cart';
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
                                                { 
                                                console.log(111)
                                                }
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
