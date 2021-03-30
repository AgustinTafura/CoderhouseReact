import { Switch } from "react-router"
import HomeContainer from '../containers/HomeContainer';
import ItemDetailContainer from '../containers/ItemDetailContainer';
import ItemListContainer from '../containers/ItemListContainer';
import CartContainer from '../containers/CartContainer';
import CheckoutContainer from '../containers/CheckoutContainer';
import NotFound from '../components/NotFound';
import {PublicRoute} from './helperRoutes'

const PublicRoutes = () => {
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

        </Switch>
    )
}

export default PublicRoutes 