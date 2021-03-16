import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ThanksContainer = (props) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const {clearCart, setPromotionalDiscount} = useContext(CartContext)
    const location = useLocation()
    const location_params = new URLSearchParams(location.search)
    
    if (location_params.get('status')== null) {
        window.location.href =  '/';
    } 

    localStorage.removeItem("cart")
    sessionStorage.getItem("promotionalDiscount") !== null && sessionStorage.setItem('promotionalDiscount', '')
    

    
    useEffect(() => {
     
        
        setIsLoading(false) 
        
        setTimeout(()=>setIsLoading(false), 3000)
        

        
    }, [])
    
    
    if(isLoading){
        return (
            <>
               <div className='loadingComponent'>
                   <p> Estamos procesando su compra </p>
                   <div className="spinner-grow bounce1" role="status">
                       <span className="sr-only"></span>
                   </div>
                   <div className="spinner-grow bounce2" role="status">
                       <span className="sr-only"></span>
                   </div>
                   <div className="spinner-grow bounce3" role="status">
                       <span className="sr-only"></span>
                   </div>
               </div>
        
           </>
    
        )
    }
    
    return (

        <>
            <div id="services" className="counter">
                <div className="container" style={{textAlign:"center"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 style={{ fontFamily: "Montserrat-Bold", fontSize: '5rem' }}>¡Gracias</h1>
                            <h1 style={{ fontFamily: "Montserrat-Bold", fontSize: '4.5rem' }} >    
                            <span style={{ fontFamily: "Mansalva" }}>por su </span> compra!</h1>
                            
                            <h5 className='mt-5'>
                                En breve  te llegará un mail a <b className="p-0">{location_params.get('external_reference')}</b> con la información de tu compra. 
                            </h5>

                            <h5 className='mt-3 mt-lg-5'>Tu <b className="p-0">orden de pago</b> es:
                                <br/>
                            <span style={{ fontFamily: "Montserrat-Bold", color: '#14bf98'}}>{location_params.get('payment_id')}</span>
                            </h5>
                            
                            <h5 className='mt-3 '>Tu <b className="p-0" >número  de seguimiento</b> es:
                                <br/>
                            <span style={{ fontFamily: "Montserrat-Bold", color: '#14bf98'}}>{location_params.get('preference_id')}</span>
                            </h5>
                            

                            <div className='justify-content-center align-items-center mt-5 pt-3'>
                                <h6 className="col-12">Seguíme y enterate todos mis tips nutricionales</h6>
                                <div className='d-flex justify-content-center'>
                                    <div className="px-3"><a className="social-icon" href="https://www.instagram.com/juampilabollita/"><i className="fab fa-instagram fa-2x" aria-hidden="true"></i></a></div>
                                    <div className="px-3"><a className="social-icon" href="https://www.facebook.com/juanpablo.labollita"><i className="fab fa-facebook-f fa-2x" aria-hidden="true"></i></a></div>

                                </div>


                            </div>

                        </div> 
                    </div> 
    

    
                    {/* {products.length !== 0&&<ItemDetail product={productSelected} numberToPrice={numberToPrice}/>} */}
    
    
                </div> 
            </div>
        </>

    )
    
    
}
export default ThanksContainer;