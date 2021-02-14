import $ from "jquery";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomeContainer = () => {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(true), 5000)
        })
        
        myPromise.then(
            (result)=>{
                console.log(result)
                setIsLoading(false);
            }
        )
            
    }, [])

    // document.addEventListener("DOMContentLoaded", function(event) {
    //     /* Preloader */
    //     var preloaderFadeOutTime = 500;
    //     var preloader = $('.spinner-wrapper');    
    //     setTimeout(function() {
    //         preloader.fadeOut(preloaderFadeOutTime);
    //     }, 1000);
    // });


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
                                <h1>NUTRICIÓN + <span id="js-rotating">PLANIFICACIÓN, ENTRENAMIENTO, HÁBITOS</span></h1>
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
