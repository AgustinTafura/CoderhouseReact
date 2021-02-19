import { Link } from "react-router-dom";

const ListDropdownContainer = ({href, name, children }) => {

    const hoverPreviousSibling = (e) => {
        let previousSibling = document.getElementById('navbarDropdown');
        previousSibling.style.color = '#fff';
        previousSibling.style.backgroundSize = '100% 37%'; 
    }

    const hoverOutPreviousSibling = (e) => {
        let previousSibling = document.getElementById('navbarDropdown');
        previousSibling.style.color = '';
        previousSibling.style.backgroundSize = ''; 
    }

    return (
        <>

            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle page-scroll " to={href} id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false"> 
                    
                    
                    {name}                 
                    
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" onMouseOver={hoverPreviousSibling} onMouseOut={hoverOutPreviousSibling}>
                    
                    {children} 

                </div>
            </li>

        </>
    )
    
}
export default ListDropdownContainer;