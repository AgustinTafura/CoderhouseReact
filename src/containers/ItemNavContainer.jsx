import { Link } from "react-router-dom";

const ItemNavContainer = ({id, href, name, datatoggle, datatarget, children}) => {
    return (
        <>
            <li className="nav-item">
                <Link 
                    id={id} className="nav-link page-scroll" to={href} {...datatoggle && {dataToggle:`${datatoggle}`}} {...datatarget && {dataTarget:datatarget}}>
                         {name} {children} 
                </Link>
            </li>
        </>
    )
    
}
export default ItemNavContainer;