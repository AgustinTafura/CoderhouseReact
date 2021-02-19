import React, { useState, useEffect, useContext } from "react";
import './style.scss';
import { Link } from "react-router-dom";

const ItemCountComponent = ({contador, product,  onAdd, onRemove, className, quantityAdded, addToCArt, isInCart}) => {


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
          (quantityAdded !== contador) ? <button onClick={()=>{addToCArt()}}>Actualizar Carrito</button> : <Link to={`/cart`}><button ><i className="material-icons">shopping_cart</i></button></Link>
            : ( <button onClick={()=>{addToCArt()}}>Agregar a Carrito</button>)}
        </div>
      </> 
    );
  }

  export default ItemCountComponent;