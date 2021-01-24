import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';


const NavBarComponent = () => {

  document.addEventListener('DOMContentLoaded', function() {
    // Dropdown Trigger
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {hover:true, coverTrigger:false});
    
    // Mobile Collapse Button
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  
  return (

    <div>

<nav>
  <div className="container">
    <div className="nav-wrapper">
      <a href="/" className="brand-logo">
        <img src="/images/JPL-022.png" alt="LOGO JPL - Juan Pablo Labollita - Nutrición clínica y deportiva"  style={{width:'2rem'}}/>
      </a>
      <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul id="mobile-demo" className="right hide-on-med-and-down">
        <li><a href="login.html">Login</a></li>
        <li><a href="register.html">Reservar Turno</a></li>
        {/* Dropdown Trigger */}
        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Tienda<i className="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  </div>

  
</nav>
  <ul id="dropdown1" className="dropdown-content">
    <li><a href="#!">Planes</a></li>
    <li><a href="#!">Recetas</a></li>
    <li className="divider"></li>
    <li><a href="#!">Consultas Online</a></li>
  </ul>
    </div>


  );
}

export default NavBarComponent;
