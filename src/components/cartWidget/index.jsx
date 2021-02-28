import './style.css';
import {useContext} from 'react';
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const CartWidget = ({href}) => {
  const {quantityproductsInCart} = useContext(CartContext)
  

  return (

    <>

      <li className="nav-item">
        <Link to={href} id="cartLogo" className="nav-link page-scroll"> 
            <i className="material-icons">shopping_cart</i>
            <span className='quantityItems'> {quantityproductsInCart>0 && quantityproductsInCart}</span>
        </Link>
      </li>

    </>
    

  );
}

export default CartWidget;
