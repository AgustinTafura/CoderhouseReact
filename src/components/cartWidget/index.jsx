import './style.css';
import { Link } from "react-router-dom";

const CartWidgetComponent = ({href}) => {
  
  return (

    <>

      <li className="nav-item">
        <Link to={href} id="cartLogo" className="nav-link page-scroll" href="cart.html"> 
            <i className="material-icons">shopping_cart</i>
        </Link>
      </li>

    </>
    

  );
}

export default CartWidgetComponent;
