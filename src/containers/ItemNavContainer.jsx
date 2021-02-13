import { Link } from "react-router-dom";

const ItemNavContainer = ({id, href, name, children}) => {
    return (
        <>
            <li className="nav-item">
                <Link id={id} className="nav-link page-scroll" to={href}> {name} {children} </Link>
            </li>
        </>
    )
    
}
export default ItemNavContainer;