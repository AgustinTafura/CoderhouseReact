import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import ItemNavContainer from '../../containers/ItemNavContainer';
import ItemDropdown from '../../containers/ItemDropdown';
import ListDropdownContainer from '../../containers/ListDropdownContainer';
import CartWidgetComponent from '../cartWidget';
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const NavBarComponent = () => {
    const actualLocation = useLocation()
    document.addEventListener('DOMContentLoaded', function() {
        // "use strict"; 

        })
            
            useEffect(() => {

            const efectNav = () => {
                if ($(".navbar").offset().top > 20) {
                    $(".fixed-top").addClass("top-nav-collapse");

                } else {
                    $(".fixed-top").removeClass("top-nav-collapse");

                }
            }

            if(actualLocation.pathname === '/'){
                
                /* Navbar Scripts */
                // jQuery to collapse the navbar on scroll
                $(window).on('scroll load',efectNav);
            }

            return () => {
                $(window).off('scroll load',efectNav);
            }
        }, [actualLocation])

    
 

    return (
        <>


        {/* <!-- end of preloader --> */}
        <nav className={`navbar navbar-expand-md navbar-dark navbar-custom fixed-top popup-with-move-anim ${(actualLocation.pathname !== '/')?'top-nav-collapse':'' }`}>
            {/* <!-- Text Logo - Use this if you don't have a graphic logo --> */}
            {/* <!-- <a className="navbar-brand logo-text page-scroll" href="index.html">Aria</a> --> */}

            {/* <!-- Image Logo --> */}
            <Link className="navbar-brand logo-image" to='/'>
                <img id="logo" src="../images/JPL-0111.svg" alt="alternative"></img>
            </Link>
            
            {/* <!-- Mobile Menu Toggle Button --> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>
            {/* <!-- end of mobile menu toggle button --> */}

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ml-auto">
                    
                    {/* <ItemNavContainer  href={'login.html'} name={'LOGIN'}>
                        <span className="sr-only">(current)</span>
                    </ItemNavContainer> */}
                    <ItemNavContainer  href={'/booking'} name={'RESERVAR TURNO'}/>

                        {/* <!-- Dropdown Menu -->           */}
                        <ListDropdownContainer name={"TIENDA"} href={'/tienda'}>
                            <ItemDropdown href={'/tienda/plan'} name={'PLANES'}/>
                            <div className="dropdown-items-divide-hr"></div>
                            <ItemDropdown href={'/tienda/receta'} name={'RECETAS'}/>
                            <div className="dropdown-items-divide-hr"></div>
                            <ItemDropdown href={'/tienda/turnos'} name={'TURNOS ONLINE'}/>
                        </ListDropdownContainer>
                        {/* <!-- end of dropdown menu --> */}

                        {/* <!-- Cart Widget -->           */}
                    <CartWidgetComponent href={'/cart'}/>
                    
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
