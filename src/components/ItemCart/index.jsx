import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCountComponent from "../ItemCount";
import {CartContext} from "../../context/CartContext";


const ItemCart = ({product, numberToPrice}) => {


    const {updateItem,removeItemCart, isInCart, quantityItemAdded} = useContext(CartContext)

    const [contador, setContador] = useState(1)
    const [quantityAdded, setQuantityAdded] = useState([])
    const showButton = false

    const onAdd = (stock) => {

        if (contador < stock) {
            setContador(contador + 1)           
            updateItem(product.id, contador + 1, product.price)
        }
        
    }
    
    const onRemove = (stock) => {

        if (contador > 1) {
            setContador(contador - 1)
            updateItem(product.id, contador - 1,product.price)
        }
    }

    const addToCart = () => {

    }

    const removeFromCart = (e) => {
        let element = document.getElementById(product.id)
        element.classList.add('animate__bounceOut') 
        element.addEventListener('animationend', () => {
            removeItemCart(product.id)
            element.classList.remove('animate__bounceOut') 
          });
    }

   
    useEffect(() => {
        if(isInCart(product.id)) {
            setContador(quantityItemAdded(product.id))
            setQuantityAdded(quantityItemAdded(product.id))
        }

    }, [])


    return (
        <>

            <div id={`${product.id}`} className="row mb-4 no-gutters ">
                <div className="col-12 col-lg-3">
                    <div className="image-container">
                        <Link to={`/product/${product.id}`}>
                            <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt="alternative"/> 
                        </Link>                      
                    </div>
                </div>
                <div className="col-12 col-lg-9 rounded-right card-text row no-gutters">
                    <div className="col-12 col-lg-4">
                        <h4 className="card-title">{product.name}</h4>
                        {(product.features)?                         
                            (product.features).map((feature, index)=>{
                                
                                return (
                                    <p  key={index} className="mb-0 text-muted text-uppercase small">{feature}</p> 

                                ) 
                            })                            
                        :null}

                    </div>
                    <div className="col-12 col-lg-5" style={{alignSelf: 'center'}}>
                    <ItemCountComponent showButton={showButton} isInCart={isInCart(product.id)} product={product} onRemove={onRemove} onAdd={onAdd} contador={contador} quantityAdded={quantityAdded} addToCart={addToCart}  />
                    </div>
                    <div className="col-12 col-lg-3" style={{alignSelf: 'center'}}>
                        <div style={{justifyContent:'space-between'}} className="d-flex  ">
                            <div onClick={(e) => {removeFromCart(e)}}>
                                <a href="#!" type="button"
                                    className="card-link-secondary small text-uppercase mr-3"
                                    style={{color:'var(--primary)'}}
                                    >
                                    <i className="fas fa-trash-alt mr-1" aria-hidden="true"></i>
                                        Quitar
                                </a>
                            </div>
                            <p className="mb-0"><span><strong>$ {numberToPrice(product.price * contador)}</strong></span></p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-4"></hr>                

        </>
    )
}

export default ItemCart

