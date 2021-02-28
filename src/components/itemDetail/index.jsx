import React, { useState, useEffect, useContext } from "react";
import ItemCount from "../ItemCount"
import {CartContext} from "../../context/CartContext";

const ItemDetail = ({product}) => {

    const {addItemToCart, isInCart, quantityItemAdded} = useContext(CartContext)
    
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
        <div className="row">
            <div className="col-lg-12">

            {/* <!-- Card --> */}
            <div  className="row no-gutters">
                    <div className="col-12 col-lg-6">
                    <div className="image-container">
                        <img className="img-fluid" src={`../images/${product.image}`} alt="alternative"></img>
                    </div> 
                    </div>
                    <div className="col-12 col-lg-6 rounded-right card-text">
                        <h1 className="card-title">{product.name}</h1>
                        <h3> {product.description} </h3>
                        <ul className="list-unstyled li-space-lg">
                            {/* {(product.features)?                         
                            features.map((feature)=>{
                                return (
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">{feature}</div>
                                </li>
                                ) 
                            })                            
                            :null} */}

                        </ul>
                        <p className="price"><span>${product.price}</span></p>
                        <ItemCount isInCart={isInCart(product.id)} product={product} onRemove={onRemove} onAdd={onAdd} contador={contador} quantityAdded={quantityAdded} addToCArt={addToCArt}   />

                    </div>

                </div>

            </div> 
        </div> 

        
         </>
    )
}

export default ItemDetail