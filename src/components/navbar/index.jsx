import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import ItemNavContainer from '../../containers/ItemNavContainer';
import ItemDropdown from '../../containers/ItemDropdown';
import ListDropdownContainer from '../../containers/ListDropdownContainer';
import CartWidgetComponent from '../CartWidget';
import { Link, useLocation } from "react-router-dom";
import React, { useEffect,useContext } from "react";
import { UserContext } from "../../context/UserContext";


const NavBar = () => {

    const { user } = useContext(UserContext)
    
    const actualLocation = useLocation()


    document.addEventListener('DOMContentLoaded', function() {

    })

    $('.dropdown-item, #cartLogo').on('click', (e)=> $('#navbarsExampleDefault').collapse('hide'))


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
                <img id="logo" src={`${process.env.PUBLIC_URL}/images/JPL-0111.svg`} alt="alternative"></img>
            </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-awesome fas fa-bars"></span>
                <span className="navbar-toggler-awesome fas fa-times"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ml-auto">

                    {!user&&
                        (
                                <li className="nav-item logged-out">
                                    <a className="nav-link" href="/change" data-toggle="modal" data-target="#signinModal">INGRESAR</a>
                                </li>
                        )

                    }
                    <ItemNavContainer  href={'/booking'} name={'RESERVAR TURNO'}/>

                    <ListDropdownContainer name={"TIENDA"} href={'/tienda'}>
                        {/* <ItemDropdown href={'/tienda/planes'} name={'PLANES'}/>
                        <div className="dropdown-items-divide-hr"></div>
                        <ItemDropdown href={'/tienda/recetas'} name={'RECETAS'}/> */}
                        {/* <div className="dropdown-items-divide-hr"></div> */}
                        {/* <ItemDropdown href={'/tienda/turnos'} name={'TURNOS ONLINE'}/> */}
                    </ListDropdownContainer>


                    <CartWidgetComponent href={'/cart'}/>
                   {user?
                            (<li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="/change"
                                    id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 text-uppercase">{user.email}</span>
                                        {/* <img className="img-profile rounded-circle" src="img/undraw_profile.svg"/> */}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in text-uppercase" aria-labelledby="userDropdown">
                                        <Link className="dropdown-item" to="/welcome">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" aria-hidden="true"></i>
                                            <span className="item-text">MIS DATOS</span>
                                        </Link>
                                        <a className="dropdown-item" href="/change">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" aria-hidden="true"></i>
                                            <span className="item-text">CONFIGURACIÓN</span>
                                        </a>
                                        <a className="dropdown-item" href="/change">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" aria-hidden="true"></i>
                                            <span className="item-text">MI ACTIVIDAD</span>
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/change" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" aria-hidden="true"></i>
                                            <span className="item-text">CERRAR SESIÓN</span>
                                        </a>
                                </div>
                            </li>)
                        :   
                            (
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
                            )
                    } 

                </ul>
                
            </div>
        </nav>
        
  

        </>
    )
}

export default NavBar
