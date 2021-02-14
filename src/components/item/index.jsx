import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCountComponent from "../../components/itemCount"



const Item = ({id, name, features, price, description, image, stock }) => {

    const [contador, setContador] = useState(1)
    const [isAddToCart, setIsAddToCart] = useState(false)
    const [quantityAdded, setQuantityAdded] = useState([])

    const onAdd = (stock) => {

        if (contador < stock) {
            console.log('isAddToCart', isAddToCart)
            setContador(contador + 1)           
        }
        

    }
    
    const onRemove = (stock) => {
        if (contador > 1) {
            setContador(contador - 1)
        }

    }

    const addToCart = (x) => {

        setQuantityAdded(x)
        setIsAddToCart(true)


    }

    useEffect(() => {
        

    }, [isAddToCart, contador])

    return (
        <>
            {/* <!-- Card --> */}
                <div  className="card">
                    <div className="card-image">
                        <Link to={`/product/${id}`}>
                            <img className="img-fluid" src={`../images/${image}`} alt="alternative"></img>
                        </Link>
                            
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{name}</h3>
                        <p> {description} </p>
                        <ul className="list-unstyled li-space-lg">
                            {(features)?                         
                            features.map((feature)=>{
                                return (
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">{feature}</div>
                                </li>
                                ) 
                            })                            
                            :null}

                        </ul>
                        <p className="price"><span>$ {price}</span></p>
                        <ItemCountComponent stock={stock} onRemove={onRemove} onAdd={onAdd} contador={contador} isAddToCart={isAddToCart}  addToCart={addToCart} quantityAdded={quantityAdded}  />

                    </div>

  
                    {/* <div className="button-container">
                        <a className="btn-solid-reg page-scroll" href="#callMe">DETAILS</a>
                    </div>  */}
                </div>
                
            {/* <!-- end of card --> */}
        </>
    )
}

export default Item

