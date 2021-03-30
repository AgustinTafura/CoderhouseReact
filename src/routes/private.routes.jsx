import { Switch } from "react-router"
import NotFound from '../components/NotFound';

import WelcomeContainer from '../containers/WelcomeContainer';
import {PrivateRoute} from './helperRoutes'

const PrivateRoutes = (props) => {
    return (
        <Switch>
            <PrivateRoute exact path="/welcome" component={WelcomeContainer}/>
            {/* <PrivateRoute path="/*"  component={NotFound}/> */}
        </Switch>
    )
}

export default PrivateRoutes 