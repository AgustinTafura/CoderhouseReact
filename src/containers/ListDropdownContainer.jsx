import { Link } from "react-router-dom";

const ListDropdownContainer = ({href, name, children }) => {

    return (
        <>

            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle page-scroll" to={href} id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false"> {name} </Link>
                
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    
                    {children} 

                </div>
            </li>

        </>
    )
    
}
export default ListDropdownContainer;