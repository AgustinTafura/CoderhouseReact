const ListDropdownContainer = ({href, name, children }) => {

    return (
        <>

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle page-scroll" href={href} id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">{name}</a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    
                    {children} 

                </div>
            </li>

        </>
    )
    
}
export default ListDropdownContainer;