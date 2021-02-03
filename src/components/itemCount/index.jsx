import './style.css';


const ItemCountComponent = ({stock, contador, onAdd, onRemove, className}) => {
  
    return (
      <>

        <button onClick={() =>{onRemove(stock)}} className={`btn-solid-reg ${className}`}>-</button>
  
        <b>  {contador}  </b>
        
        {(contador < stock) ?
          <button onClick={() =>{onAdd(stock)}} className={`btn-solid-reg ${className}`}>+</button>
          : null
        }
  
        <div>
          <button >comprar</button>
        </div>

      </>
  
  
    );
  }

  export default ItemCountComponent;