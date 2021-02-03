

const ItemDropdown = ({href, name}) => {

    return (
        <>

            <a className="dropdown-item" href={href}>
                <span className="item-text">{name}</span>
            </a>

 
        </>
    )
    
}
export default ItemDropdown;