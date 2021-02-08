import React, { useState, useEffect } from "react";
import ItemCountComponent from "../../components/itemCount"

const ItemList = ({product}) => {

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
        <div className="row">
            <div className="col-lg-12">

            {/* <!-- Card --> */}
            <div  className="row no-gutters">
                    <div className="col-6">
                        <img className="img-fluid rounded-left" src={`images/${product.image}`} alt="alternative"></img>
                    </div>
                    <div className="col-6 rounded-right">
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
                        <ItemCountComponent stock={12} onRemove={onRemove} onAdd={onAdd} contador={contador} />

                    </div>

  
                    {/* <div className="button-container">
                        <a className="btn-solid-reg page-scroll" href="#callMe">DETAILS</a>
                    </div>  */}
                </div>

                
             {/* <!-- end of card --> */}

            </div> 
        </div> 

        </>
    )
}

export default ItemList