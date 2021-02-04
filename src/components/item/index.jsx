import React, { useState, useEffect } from "react";
import ItemCountComponent from "../../components/itemCount"



const Item = ({name, features, price, description, image}) => {
    const [contador, setContador] = useState(1)

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

    return (
        <>
            {/* <!-- Card --> */}
                <div  className="card">
                    <div className="card-image">
                        <img className="img-fluid" src={`images/${image}`} alt="alternative"></img>
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
                        <ItemCountComponent stock={12} onRemove={onRemove} onAdd={onAdd} contador={contador} />

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

