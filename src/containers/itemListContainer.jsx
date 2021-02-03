import React, { useState } from "react";
import ItemCountComponent from "../components/itemCount"

const ItemListContainer = (props) => {

    const [contador, setContador] = useState(1)

    const onAdd = (stock) => {
        if (contador < stock) {
            setContador(contador + 1)
        }
    }

    const onRemove = (stock) => {
        if (contador > 1) {
            setContador(contador - 1)
        }
    }

    return (
        <>
            <ItemCountComponent stock={12} onRemove={onRemove} onAdd={onAdd} contador={contador} />
        </>
    )
    
}
export default ItemListContainer;