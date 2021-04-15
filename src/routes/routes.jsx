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
import ThanksContainer from "../containers/ThanksContainer";
import BookingContainer from "../containers/BookingContainer";
import EmailContainer from "../containers/EmailContainer";
import OrderContainer from "../containers/BookingContainer";

const Routes = () => {

    const {isAuthenticated} = useContext(UserContext)
    return (
        <Switch>
            <PublicRoute exact path="/" component={HomeContainer}/>
                        
            <PublicRoute path="/booking" >
                <BookingContainer/>
            </PublicRoute>

            <PublicRoute path="/mail" >
                <EmailContainer/>
            </PublicRoute>
                                
            <PublicRoute exact path="/product/:id" component={ItemDetailContainer} />
                    
            <PublicRoute exact path='/tienda/:categoryId?' component={ItemListContainer}/>
            
            <PublicRoute exact path="/cart" component={CartContainer} />

            <PublicRoute exact path="/checkout" component={CheckoutContainer} />

            <PublicRoute exact path="/thankyou" component={ThanksContainer} />

            <PublicRoute exact path="/compras/:order_id?" component={OrderContainer} />

            {isAuthenticated && <PrivateRoute exact path="/welcome" component={WelcomeContainer}/>}
            <Route path="/**"  component={NotFound}/>
            {/* <Route exact path={"*"} to="/booking"/> */}
        </Switch>
    )
}

export default Routes 