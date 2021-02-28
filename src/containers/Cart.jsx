import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { CommercialContext } from "../context/CommercialContext";
import { CartContext } from "../context/CartContext";
import ItemCart from "../components/ItemCart";


const CartContainer = (props) => {

    const {products} = useContext(CommercialContext)
    const {cart} = useContext(CartContext)
    return (
        <>

            <div id="services" className="cards-2">
                <div className="container" style={{ textAlign: "center" }}>

                    {/* <!--Section: Block Content--> */}
                    <section>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="">
                                    <div className="card-body mb-2" style={{borderBottomLeftRadius:" 0", borderBottomRightRadius:"0", borderTopLeftRadius:'0.375rem', borderTopRightRadius:'0.375rem'}}>
                                        <h5 className="mb-5">Carrito de Compras (<span>{cart.length}</span> items)</h5>
                    
                                        {cart.length !== 0?
                                                cart.map((productAdded, index)=>{
                                                    console.log(products)
                                                    const product = products.find( product => product.id === productAdded.id)
                                                    console.log(products)
                                                    return (
                                                        <ItemCart key={index}  
                                                            product={product}
                                                        />
                                                    )
                                                }
                                                
                                                )
                                                :<>
                                                    <div className="mb-5">
                                                        <h4 className="mb-5">Tu carrito está vacío</h4>
                                                        <Link to="/tienda" className="btn-solid-lg page-scroll">Ir a la TIENDA</Link>
                                                    </div>
                                                </>

                                        }

                                            {/* <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1"
                                                    aria-hidden="true"></i> Do not delay the purchase, adding items to your
                                                cart does not mean booking them.</p> */}
                                    </div>
                                </div>
                            </div>

                            {cart.length !== 0 &&
                            
                            <div className="col-lg-12">
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="mb-3">The total amount of</h5>
                                        <ul className="list-group list-group-flush">
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Temporary amount<span>$25.98</span></li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping<span>Gratis</span></li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div><strong>The total amount of</strong><strong>
                                                        <p className="mb-0">(including VAT)</p>
                                                    </strong></div><span><strong>$53.98</strong></span>
                                            </li>
                                        </ul>
                                        <div className="">
                                            <div className="card-text"><a
                                                    className="dark-grey-text d-flex justify-content-between collapsed"
                                                    data-toggle="collapse" href="#collapseExample1"
                                                    aria-expanded="false" aria-controls="collapseExample1">Add a
                                                    discount code (optional)<span><i className="fas fa-chevron-down pt-1"
                                                            aria-hidden="true"></i></span></a>
                                                <div className="collapse" id="collapseExample1" >
                                                    <div className="mt-3">
                                                        <div className="md-form md-outline mb-0"><input type="text"
                                                                id="discount-code1"
                                                                className="form-control font-weight-light"
                                                                placeholder="Enter discount code"></input></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><button type="button"
                                            className="btn btn-primary btn-block waves-effect waves-light">go to
                                            checkout</button>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </section>
                    {/*
                    <!--Section: Block Content--> */}

                        </div>
                    </div>
                        {/* <!--Section: Block Content--> */}

        </>
    )
}

export default CartContainer
