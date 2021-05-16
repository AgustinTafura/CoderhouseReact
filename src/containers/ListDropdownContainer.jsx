import { Link } from "react-router-dom";


const ListDropdownContainer = ({href, name, children }) => {
    const { innerWidth: width, } = window;
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
            {width>=768?
                (<Link className="nav-link dropdown-toggle page-scroll " to={href}  id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false"> 
                        
                        
                    {name}                 
                
                </Link>)
                :   (<div className="nav-link dropdown-toggle page-scroll" id="navbarDropdown" role="button" aria-haspopup="false" aria-expanded="true">    
                  {name}                   
                </div>)
            }

                <div className="dropdown-menu" aria-labelledby="navbarDropdown" onMouseOver={hoverPreviousSibling} onMouseOut={hoverOutPreviousSibling}>
                    
                    {children} 

                </div>
            </li>

        </>
    )
    
}
export default ListDropdownContainer;