

const ItemListContainer = ({href, name, children}) => {

    return (
        <>
            <li>
                <a href={href}>{name} {children}</a>
            </li>
        </>
    )
    
}
export default ItemListContainer;