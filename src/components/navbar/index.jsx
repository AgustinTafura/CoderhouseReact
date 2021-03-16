import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import ItemNavContainer from '../../containers/ItemNavContainer';
import ItemDropdown from '../../containers/ItemDropdown';
import ListDropdownContainer from '../../containers/ListDropdownContainer';
import CartWidgetComponent from '../CartWidget';
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const NavBar = () => {
    const actualLocation = useLocation()


    document.addEventListener('DOMContentLoaded', function() {

    })

    $('.dropdown-item').on('click', (e)=> console.log(111), $('#navbarsExampleDefault').collapse('hide'))


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
        <nav className={`navbar navbar-expand-md navbar-dark navbar-custom fixed-top popup-with-move-anim ${(actualLocation.pathname !== '/')?'top-nav-collapse':'' }`}>


            <Link className="navbar-brand logo-image" to='/'>
                <img id="logo" src="../images/JPL-0111.svg" alt="alternative"></img>
            </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ml-auto">

                    <ItemNavContainer  href={'/booking'} name={'RESERVAR TURNO'}/>


                        <ListDropdownContainer name={"TIENDA"} href={'/tienda'}>
                            <ItemDropdown href={'/tienda/planes'} name={'PLANES'}/>
                            <div className="dropdown-items-divide-hr"></div>
                            <ItemDropdown href={'/tienda/recetas'} name={'RECETAS'}/>
                            {/* <div className="dropdown-items-divide-hr"></div> */}
                            {/* <ItemDropdown href={'/tienda/turnos'} name={'TURNOS ONLINE'}/> */}
                        </ListDropdownContainer>

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
        
        
 


    
  

        </>
    )
}

export default NavBar
