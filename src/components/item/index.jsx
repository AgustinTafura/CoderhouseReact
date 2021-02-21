import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCountComponent from "../ItemCount";
import {CartContext} from "../../context/CartContext";


const Item = ({product}) => {

    const {addItemToCart,cart, isInCart, quantityItemAdded} = useContext(CartContext)
    const [contador, setContador] = useState(1)
    const [quantityAdded, setQuantityAdded] = useState([])

    const onAdd = (stock) => {

        if (contador < stock) {
            setContador(contador + 1)           
        }
        
    }
    
    const onRemove = (stock) => {
        if (contador > 1) {
            setContador(contador - 1)
        }
    }

    const addToCArt = () => {
        addItemToCart(product.id, contador)
        setQuantityAdded(contador)
    }

   
    useEffect(() => {
        if(isInCart(product.id)) {
            setContador(quantityItemAdded(product.id))
            setQuantityAdded(quantityItemAdded(product.id))
        }

    }, [])

    return (
        <>
            {/* <!-- Card --> */}
                <div  className="card">
                    <div className="card-image">
                        <Link to={`/product/${product.id}`}>
                            <img className="img-fluid" src={`../images/${product.image}`} alt="alternative"></img>
                        </Link>
                            
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p> {product.description} </p>
                        <ul className="list-unstyled li-space-lg">
                            {(product.features)?                         
                            (product.features).map((feature)=>{
                                return (
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">{feature}</div>
                                </li>
                                ) 
                            })                            
                            :null}

                        </ul>
                        <p className="price"><span>$ {product.price}</span></p>
                        <ItemCountComponent isInCart={isInCart(product.id)} product={product} onRemove={onRemove} onAdd={onAdd} contador={contador} quantityAdded={quantityAdded} addToCArt={addToCArt}  />

                    </div>

                </div>
                

        </>
    )
}

export default Item

