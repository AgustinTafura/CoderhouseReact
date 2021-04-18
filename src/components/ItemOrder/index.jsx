import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount";



const ItemOrder = ({product, downloadFile, openBookingPopUp}) => {




   
    useEffect(() => {


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
                    <div className="card-body" style={{textAlign:"center"}}>
                        <h3 className="card-title" >{product.name}</h3>
                        <p>{product.id}</p>
                        {product.allowDownload&&<button onClick={()=>downloadFile(product.fileToDownload)}>Descargar</button>}
                        {product.allowBooking&&<button  onClick={()=>openBookingPopUp(product)}>Solictar Turno</button>}
                    </div>
                </div>
                

        </>
    )
}

export default ItemOrder

