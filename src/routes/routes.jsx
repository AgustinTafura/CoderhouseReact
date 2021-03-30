import { Route, Switch } from "react-router"
import HomeContainer from '../containers/HomeContainer';
import ItemDetailContainer from '../containers/ItemDetailContainer';
import ItemListContainer from '../containers/ItemListContainer';
import CartContainer from '../containers/CartContainer';
import CheckoutContainer from '../containers/CheckoutContainer';
import WelcomeContainer from '../containers/WelcomeContainer';
import NotFound from '../components/NotFound';
import {PublicRoute} from './helperRoutes';
import {PrivateRoute} from './helperRoutes';
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Routes = () => {

    const {isAuthenticated} = useContext(UserContext)
    return (
        <Switch>
            <PublicRoute exact path="/" component={HomeContainer}/>
                        
            <PublicRoute path="/booking" >
                PROXIMAMENTE TURNOS ONLINE
            </PublicRoute>
                                
            <PublicRoute exact path="/product/:id" component={ItemDetailContainer} />
                    
            <PublicRoute exact path='/tienda/:categoryId?' component={ItemListContainer}/>
            
            <PublicRoute exact path="/cart" component={CartContainer} />

            <PublicRoute exact path="/checkout" component={CheckoutContainer} />

            {isAuthenticated && <PrivateRoute exact path="/welcome" component={WelcomeContainer}/>}
            <Route path="/**"  component={NotFound}/>
            {/* <Route exact path={"*"} to="/booking"/> */}
        </Switch>
    )
}

export default Routes 