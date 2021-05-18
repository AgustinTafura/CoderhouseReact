import { Link, } from "react-router-dom";
import React, { useState, useEffect } from "react";
import $ from 'jquery'
import './HomeContainer.scss'

const HomeContainer = () => {

    const [isLoading, setIsLoading] = useState(true)
    // const { innerWidth } = window;
    const [width, setWidth] = useState(false) 

    useEffect(() => {
        
        window.addEventListener('load', ()=>{
            setWidth(window.innerWidth)

            $.fn.extend({ 
                rotaterator: function(options) {
         
                    var defaults = {
                        fadeSpeed: 100,
                        pauseSpeed: 1000,
                        child:null
                    };
                     
                    var options = $.extend(defaults, options);
                 
                    return this.each(function() {
                          var o =options;
                          var obj = $(this);                
                          var items = $(obj.children(), obj);
                          items.each(function() {$(this).hide();})
                          if(!o.child){var next = $(obj).children(':first');
                          }else{var next = o.child;
                          }
                          $(next).fadeIn(o.fadeSpeed, function() {
                                $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                                    var next = $(this).next();
                                    if (next.length == 0){
                                            next = $(obj).children(':first');
                                    }
                                    $(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
                                })
                            });
                    });
                }
            });
            $(document).ready(function() {
                $('#rotate').rotaterator({fadeSpeed:1500, pauseSpeed:200});
         });
         setIsLoading(false);
        })

        window.addEventListener('resize', ()=>{
            setWidth(window.innerWidth)
        })

        // setIsLoading(true)

        // const myPromise = new Promise((resolve, reject) => {
        //     setTimeout(()=>resolve(true), 1200)
        // })

        // myPromise.then(
        //     (result)=>{

        //         setIsLoading(false);
        //     }
        // )


    }, [])




    if (isLoading) {
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
            <header id="header" className="header" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), ${width>=768?`url('${process.env.PUBLIC_URL}/images/logo-0566.jpg')`:`url('${process.env.PUBLIC_URL}/images/logo-0566.jpg')`}  no-repeat`, backgroundSize: `cover`,  backgroundPositionY: `center`}}>
                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-container">

                                <div id='title' className='col-12 col-sm-10 col-md-8 col-lg-6' >
                                    <div className='line-one'>
                                        <span className='col-5'>Plan</span>
                                        <div className="linea col-7"></div>
                                    </div>
                                    <div className='line-two '>
                                        <span style={{ fontFamily: "Mansalva" }}>de </span> 
                                        
                                        <span id="rotate"> 
                                            <span>alimentación</span> 
                                            <span>entrenamiento</span> 
                                            <span>hábitos</span>
                                        </span> 
                                                
                                    </div>
                                    <div className='line-three '>
                                        <div className="linea col-4"></div>
                                        <span className='col-2'>MP2445 - MN6831</span>                                    
                                    </div>
                                </div>

                                    {/* <h1>
                                    <span> NUTRICIÓN </span> 
                                    <span style={{ fontFamily: "Mansalva" }}> +  </span>

                                        <ReactTextRotator
                                            content={content}
                                            time={3000}
                                            startDelay={1000}
                                        />




                                    </h1> */}
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

            <div id='about-me' >
                <div className={`${width > 768 ? 'container-fluid':''} ${width > 992 ? 'container':''}`}>
                    <div className={`${width > 768 ? 'row':''}`}>

                            <div className='section section-one col-md-6'>
                                <h1>
                                    <span>Soy </span>
                                    Juan Pablo Labollita
                                </h1>
                                <div className=''>
                                    
                                    <b>Licenciado en Nutrición y Personal Trainer.</b>
                                    <p>
                                        Busco en la nutrición, el entrenamiento y los deportes  el cuidado de la salud y de la estética corporal. 
                                        <br/>
                                        Quienes me conocen saben que es el estilo de vida que elijo todos los días y el que le propongo a mis pacientes.
                                    </p> 
                                    <p>Mi misión es ayudarte a que logres tus objetivos. Y que lo hagas, sin prohibiciones, disfrutando el proceso para lograr hábitos saludables que se  sostengan el tiempo.</p>
                                    <p>Tengo en cuenta tu contexto: gustos, creencias, emociones y  factores de riesgo para crear, en común acuerdo,  el plan de alimentación que se ajuste a tus objetivos.</p>
                                    <p>Soy feliz en este camino y lo comparto, porque eso es parte de mi felicidad.</p>

                                </div>

                            </div>
                        {/* </div> */}

                        <div className={`section section-two ${width > 768 ? 'col-md-6':''}`}>
                            <img src={`${process.env.PUBLIC_URL}/images/IMG_9447.jpg`} alt="" style={{width:'100%'}} />                    
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeContainer
