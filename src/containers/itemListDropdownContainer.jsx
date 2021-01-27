

const ItemListDropdownContainer = ({classNameA, nameA, classNameI, nameI, dataTarget}) => {

    return (
        <>
            <li>
                <a className={classNameA}  data-target={dataTarget}>
                    {nameA}
                    <i className={classNameI}> {nameI}</i>
                </a>
            </li>
        </>
    )
    
}
export default ItemListDropdownContainer;