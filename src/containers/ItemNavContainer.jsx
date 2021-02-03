const ItemNavContainer = ({id, href, name, children}) => {

    return (
        <>
            <li className="nav-item">
                <a id={id} className="nav-link page-scroll" href={href}>{name} {children}</a>
            </li>
        </>
    )
    
}
export default ItemNavContainer;