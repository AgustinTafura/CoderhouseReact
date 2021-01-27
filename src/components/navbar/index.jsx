import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './style.css';
import ItemListContainer from '../../containers/itemListContainer';
import ItemListDropdownContainer from '../../containers/itemListDropdownContainer';
import CartWidgetComponent from './../../components/cartWidget';
  

const NavBarComponent = () => {

  document.addEventListener('DOMContentLoaded', function() {
    // Dropdown Trigger
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {hover:true, coverTrigger:false});
    
    // Mobile Collapse Button
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, {});
  });

  
  return (

    <>
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              <img src="/images/JPL-022.png" alt="LOGO JPL - Juan Pablo Labollita - Nutrición clínica y deportiva"  style={{width:'2rem'}}/>
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="mobile-demo" className="right hide-on-med-and-down">

              <ItemListContainer  href={'login.html'} name={'Login'}/>
              <ItemListContainer  href={'booking.html'} name={'Reservar Turno'}/>

              {/* Dropdown Trigger */}
              <ItemListDropdownContainer classNameA={"dropdown-trigger"} dataTarget="dropdown1" nameA="Tienda" classNameI="material-icons right" nameI="arrow_drop_down" />
              <CartWidgetComponent />
            </ul>
          </div>
        </div>
      </nav>
      <ul id="dropdown1" className="dropdown-content">
        <ItemListContainer href={'plans.html'} name={'Planes'}/>
        <ItemListContainer  href={'recipes.html'} name={'Recetas'}/>
        <li className="divider"></li>
        <ItemListContainer  href={'booking.html'} name={'Consultas Online'}/>

      </ul>
    </>


  );
}

export default NavBarComponent;
