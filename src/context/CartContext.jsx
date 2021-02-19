import { createContext, useState} from "react";


// Creamos el espacio de memoria
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addItemToCart = (itemId, q) => {
        (isInCart(itemId))? 
        updateItem(itemId, q)
        :   setCart([...cart, {id: itemId, quantity: q}])
        { console.log(cart)}
        
    }
    

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (x) => {

        const index = cart.findIndex( product => product.id === x) 

        return index >= 0? true: false;
    }

    const quantityItemAdded = (itemId) => {
        if(isInCart(itemId)) {

            const itemQuantityItemAdded = cart.find( product => product.id === itemId).quantity
            return itemQuantityItemAdded
        }
        // console.log(itemQuantityItemAdded)
    }

    const updateItem = (itemId, q) => {

        const index = cart.findIndex( product => product.id === itemId)
        const cartUpdated = cart.splice(index, 1, {id: itemId, quantity: q})
    }



    return (
        <CartContext.Provider value={{cart, addItemToCart, isInCart, quantityItemAdded, updateItem}}>
            {children}
        </CartContext.Provider>
    )
}