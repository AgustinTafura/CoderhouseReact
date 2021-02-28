import React, { } from "react";
import './style.scss';
import { Link } from "react-router-dom";

const ItemCount = ({contador, product,  onAdd, onRemove, className, quantityAdded, addToCart, isInCart, showButton}) => {


    return (
      <>

        <button onClick={() =>{onRemove(product.stock)}} className={`btn-solid-reg ${className}`}>-</button>
  
        <b>  {contador}  </b>
        
        {(contador < product.stock) ?
          <button onClick={() =>{onAdd(product.stock)}} className={`btn-solid-reg ${className}`}>+</button>
          : <button className={`btn-solid-reg disabled ${className}`} >+</button>
        }
        <div>
          {isInCart?
          (quantityAdded !== contador) ? <button className={!showButton?'d-none':null} onClick={()=>{addToCart()}}>Actualizar Carrito</button> : <Link className={!showButton?'d-none':null} to={`/cart`}><button ><i className="material-icons">shopping_cart</i></button></Link>
            : ( <button onClick={()=>{addToCart()}}>Agregar a Carrito</button>)}
        </div>
      </> 
    );
  }

  export default ItemCount;