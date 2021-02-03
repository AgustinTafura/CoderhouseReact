import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import ItemNavContainer from '../../containers/ItemNavContainer';
import ItemDropdown from '../../containers/ItemDropdown';
import ListDropdownContainer from '../../containers/ListDropdownContainer';
import CartWidgetComponent from '../cartWidget';


const NavBarComponent = () => {
    
    document.addEventListener('DOMContentLoaded', function() {
        // "use strict"; 
	
        /* Preloader */
        $(window).on('load', function() {
            var preloaderFadeOutTime = 500;
            function hidePreloader() {
                var preloader = $('.spinner-wrapper');
                setTimeout(function() {
                    preloader.fadeOut(preloaderFadeOutTime);
                }, 500);
            }
            hidePreloader();
        });
    
        
    //     /* Navbar Scripts */
        // jQuery to collapse the navbar on scroll
        $(window).on('scroll load', function() {
            if ($(".navbar").offset().top > 20) {
                $(".fixed-top").addClass("top-nav-collapse");
            } else {
                $(".fixed-top").removeClass("top-nav-collapse");
            }
        });
    
 

    })
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
        {/* <!-- end of preloader --> */}
        <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top popup-with-move-anim">
            {/* <!-- Text Logo - Use this if you don't have a graphic logo --> */}
            {/* <!-- <a className="navbar-brand logo-text page-scroll" href="index.html">Aria</a> --> */}

            {/* <!-- Image Logo --> */}
            <a className="navbar-brand logo-image" href="index.html">
                <img id="logo" src="images/JPL-0111.svg" alt="alternative"></img>
            </a>
            
            {/* <!-- Mobile Menu Toggle Button --> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>
            {/* <!-- end of mobile menu toggle button --> */}

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ml-auto">
                    
                    <ItemNavContainer  href={'login.html'} name={'LOGIN'}>
                        <span className="sr-only">(current)</span>
                    </ItemNavContainer>
                    <ItemNavContainer  href={'booking.html'} name={'RESERVAR TURNO'}/>

                        {/* <!-- Dropdown Menu -->           */}
                        <ListDropdownContainer name={"TIENDA"}>
                            <ItemDropdown href={'plans.html'} name={'PLANES'}/>
                            <div className="dropdown-items-divide-hr"></div>
                            <ItemDropdown href={'recipes.html'} name={'RECETAS'}/>
                            <div className="dropdown-items-divide-hr"></div>
                            <ItemDropdown href={'recipes.html'} name={'TURNOS ONLINE'}/>
                        </ListDropdownContainer>
                        {/* <!-- end of dropdown menu --> */}

                        {/* <!-- Cart Widget -->           */}
                    <CartWidgetComponent />
                    
                </ul>
                
                <span className="nav-item social-icons">
                    <span className="fa-stack">
                        <a href="https://www.instagram.com/juampilabollita/">
                            <span className="hexagon"></span>
                            <i className="fab fa-instagram fa-stack-1x"></i>
                        </a>
                    </span>
                    <span className="fa-stack">
                        <a href="https://www.facebook.com/juanpablo.labollita">
                            <span className="hexagon"></span>
                            <i className="fab fa-facebook-f fa-stack-1x"></i>
                        </a>
                    </span>
                </span>
            </div>
        </nav>
        {/* <!-- end of navbar --> */}
        
        
 


    
  

        </>
    )
}

export default NavBarComponent
