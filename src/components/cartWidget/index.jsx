import './style.css';
import { Link } from "react-router-dom";

const CartWidget = ({href}) => {
  
  return (

    <>

      <li className="nav-item">
        <Link to={href} id="cartLogo" className="nav-link page-scroll"> 
            <i className="material-icons">shopping_cart</i>
        </Link>
      </li>

    </>
    

  );
}

export default CartWidget;
