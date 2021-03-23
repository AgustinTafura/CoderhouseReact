import { Link } from "react-router-dom";


const ItemDropdownContainer = ({href, name}) => {

    return (
        <>
            <Link className="dropdown-item" to={href}>
                <span className="item-text">{name}</span>
            </Link>


 
        </>
    )
    
}
export default ItemDropdownContainer;