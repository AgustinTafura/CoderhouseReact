import { createContext, useState, useEffect} from "react";


// Creamos el espacio de memoria
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [quantityproductsInCart, setQuantityproductsInCart] = useState(0)

    const addItemToCart = (itemId, q) => {

        if(isInCart(itemId)){

            updateItem(itemId, q)

        } else{
            setCart([...cart, {id: itemId, quantity: q}])
        }
                
    }

    const removeItemCart = (itemId) => {

        if(isInCart(itemId)){

            const index = cart.findIndex( product => product.id === itemId)
            const newCart = [...cart];
            newCart.splice(index, 1)
            setCart(newCart)

        } 
                
    }
    
    const quantityproductsAdded = () => {
        let quantity = 0
        cart.forEach(product => {
            quantity += quantityItemAdded(product.id)
        })

        setQuantityproductsInCart(quantity)
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

    }



    const updateItem = (itemId, q) => {
        const index = cart.findIndex( product => product.id === itemId)
        const newCart = [...cart];
        newCart.splice(index, 1, {id: itemId, quantity: q})
        setCart(newCart)

    }

    useEffect(() => {

        localStorage.getItem("cart") !== null && setCart(JSON.parse(localStorage.getItem("cart")))

    }, [])

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart))
        quantityproductsAdded()
    }, [cart])
    

    return (
        <CartContext.Provider value={{cart, addItemToCart, isInCart, quantityItemAdded, updateItem, quantityproductsInCart, removeItemCart}}>
            {children}
        </CartContext.Provider>
    )
}