import { createContext, useState, useEffect } from "react";
import { getFirestore } from "../firebase";

// Creamos el espacio de memoria
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState([])
    const [quantityproductsInCart, setQuantityproductsInCart] = useState(0)
    const [subtotalCart, setSubtotalCart] = useState(0)
    const [promotionalDiscount, setPromotionalDiscount] = useState('')
    const [totalCart] = useState()
    const [promocodes, setPromocodes] = useState([])
    
 

    const addDiscount = (e) => {
        let code = e.target.value
        let today = Date.now()
        promocodes.filter(promocode => {
            if (promocode.code === code) {

                if (today > promocode.start.toMillis() && today < promocode.end.toMillis()) {
                    setPromotionalDiscount({ code: promocode.code, discount: promocode.discountRate, mount: subtotalCart * (promocode.discountRate) / 100 })
                    sessionStorage.setItem('promotionalDiscount', JSON.stringify({ code: promocode.code, discount: promocode.discountRate, mount: subtotalCart * (promocode.discountRate) / 100 }))
                } else {
                    alert(`¡El cupón «${code}» ya venció!`)
                }

            } else {
                setPromotionalDiscount('')
            }
        })
    }

    const addItemToCart = (itemId, q, p, c, n) => {

        if (isInCart(itemId)) {

            updateItem(itemId, q, p, c, n)

        } else {
            setCart([...cart, { id: itemId, quantity: q, unitPrice: p, category: c, currency: "ARS", name: n }])
        }

    }

    const removeItemCart = (itemId) => {

        if (isInCart(itemId)) {

            const index = cart.findIndex(product => product.id === itemId)
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

        const subtotal = cart.reduce(function (subtotal, element) {
            return subtotal += element.unitPrice * element.quantity;
        }, 0);

        setSubtotalCart(subtotal)
    }


    const clearCart = () => {
        cart.length !== 0 && setCart([])
    }

    const isInCart = (x) => {

        const index = cart.findIndex(product => product.id === x)

        return index >= 0 ? true : false;
    }

    const quantityItemAdded = (itemId) => {
        if (isInCart(itemId)) {

            const itemQuantityItemAdded = cart.find(product => product.id === itemId).quantity
            return itemQuantityItemAdded
        }
        
    }



    const updateItem = (itemId, q, p, c , n) => {
        const index = cart.findIndex(product => product.id === itemId)
        const newCart = [...cart];
        newCart.splice(index, 1, { id: itemId, quantity: q, unitPrice: p, category: c, currency: "ARS", name: n })
        setCart(newCart)

    }
    
    useEffect(() => {
        const db = getFirestore();
        console.log('CartContext - promocode')
        const promocodeCollection = db.collection("promocode")
        promocodeCollection.get().then((value) => {
            const promocodeList = value.docs.map(element => { return { ...element.data() } })

            setPromocodes(promocodeList)
        })

        localStorage.getItem("cart") !== null && localStorage.getItem("cart").length !== 0  && setCart(JSON.parse(localStorage.getItem("cart")))
        sessionStorage.getItem("promotionalDiscount") != null && setPromotionalDiscount(JSON.parse(sessionStorage.getItem("promotionalDiscount")))
    }, [])


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
        quantityproductsAdded()
    }, [cart])



    return (
        <CartContext.Provider value={{clearCart, cart, subtotalCart, totalCart, promotionalDiscount, addDiscount, addItemToCart, isInCart, quantityItemAdded, updateItem, quantityproductsInCart, removeItemCart }}>
            {children}
        </CartContext.Provider>
    )
}