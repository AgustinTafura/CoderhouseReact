import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import ReactTextRotator from "react-text-rotator";
import {CartContext} from "../context/CartContext";
import {getFireStorage} from "../firebase";


const HomeContainer = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {cart} = useContext(CartContext)
   
    const content = [
        {
            text: "  PLANIFICACIÓN",
            animation: "fade",
        },  
        {
            text: "  ENTRENAMIENTO",
            animation: "fade",
        },
        {
            text: "  HÁBITOS",
            animation: "fade",
        },
    ];
    


    useEffect(() => {

        // setIsLoading(true)

        // const myPromise = new Promise((resolve, reject) => {
        //     setTimeout(()=>resolve(true), 5000)
        // })
        
        // myPromise.then(
        //     (result)=>{

        //         setIsLoading(false);
        //     }
        // )

    }, [])




    if(isLoading) {
        return (
            <>
                {/* <!-- Preloader --> */}
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>

             {/* <!-- Header --> */}
            <header id="header" className="header" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/images/logo-055.jpg') no-repeat`, backgroundSize:`cover` }}>
            <div className="header-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-container">
                                <h1>NUTRICIÓN     
                                    <span style={{fontFamily: "Mansalva"}}> +  </span> 
                                <ReactTextRotator 
                                    content={content}
                                    time={2000}
                                    startDelay={100}
                                />

                                </h1>
                                <p className="p-heading p-large">Consultas Online, Planes personalizados y Monitoreo de los objetivos alcanzados</p>
                                <Link to="/tienda" className="btn-solid-lg page-scroll"> DESCÚBRE CÓMO</Link>
                            </div>
                        </div> 
                        {/* <!-- end of col --> */}
                    </div> 
                    {/* <!-- end of row --> */}
                </div> 
                {/* <!-- end of container --> */}
            </div> 
            {/* <!-- end of header-content --> */}
        </header> 
        {/* <!-- end of header --> */}
        </>
    )
}

export default HomeContainer