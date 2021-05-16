import React from "react";
import { Link } from "react-router-dom";




const ItemOrder = ({ product, downloadFile, openBookingPopUp, order, reschedule, cancel}) => {


   


    return (
        <>
            {/* <!-- Card --> */}
                <div className="card">
                    <div className="card-image">
                        <Link to={`/product/${product.id}`}>
                            <img className="img-fluid" src={`../images/${product.image}`} alt="alternative"></img>
                        </Link>
                            
                    </div>
                    <div className="card-body" style={{textAlign:"center"}}>
                        <h3 className="card-title" >{product.name}</h3>
                        {/* {product.id} */}
                        {product.allowDownload&&<button onClick={()=>downloadFile(product.fileToDownload)}>Descargar</button>}
                        {product.allowBooking&&
                            (order.booking === undefined || order.booking.length === 0?
                                <button  onClick={()=>openBookingPopUp(product.id)}>Solictar Turno</button>
                            : order.booking[product.id] === undefined?
                                <button  onClick={()=>openBookingPopUp(product.id)}>Solictar Turno</button>
                                :   
                                // <div className="modal-footer justify-content-center border-0">
                                    <button className="px-lg-3 px-xl-4"onClick={()=>(cancel(product.id, order.booking[product.id].cancelCode))}  >Datos de mi Turno</button>
                                //     <button className="px-lg-3 px-xl-4"onClick={()=>(reschedule(product.id, order.booking[product.id].cancelCode))} >Reprogramar Turno</button>
                                // </div>
                            )
                        }   

                    </div>
                </div>
                

        </>
    )
}

export default ItemOrder

