import $ from "jquery";
import { Link } from "react-router-dom";

const HomeContainer = () => {

    /* Preloader */
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        setTimeout(function() {
            preloader.fadeOut(preloaderFadeOutTime);
        }, 200);
    }
    $(window).on('load', function() {
        hidePreloader();
        
    });

    return (
            /* <!-- Header --> */
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
        /* <!-- end of header --> */
    )
}

export default HomeContainer
