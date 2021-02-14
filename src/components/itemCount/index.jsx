import './style.scss';
import { Link } from "react-router-dom";

const ItemCountComponent = ({stock, contador, onAdd, onRemove, className, addToCart, isAddToCart, quantityAdded}) => {

    return (
      <>

        <button onClick={() =>{onRemove(stock)}} className={`btn-solid-reg ${className}`}>-</button>
  
        <b>  {contador}  </b>
        
        {(contador < stock) ?
          <button onClick={() =>{onAdd(stock)}} className={`btn-solid-reg ${className}`}>+</button>
          : <button className={`btn-solid-reg disabled ${className}`} >+</button>
        }
        <div>
          {(isAddToCart == false) ?
          ( <button onClick={()=>{addToCart(contador)}}>Agregar a Carrito</button>)
            : (quantityAdded != contador) ? <button onClick={()=>{addToCart(contador)}}>Actualizar Carrito</button> : <Link to={`/cart`}><button ><i className="material-icons">shopping_cart</i></button></Link>}
        </div>
      </>
  
  
    );
  }

  export default ItemCountComponent;