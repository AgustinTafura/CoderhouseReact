import { createContext, useContext, useEffect } from "react";
import { getFirestore } from "../firebase";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import firebase from "firebase/app";
import "@firebase/firestore";
// Creamos el espacio de memoria
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    
    const { user  } = useContext(UserContext)
    const { cart, subtotalCart, totalCart, promotionalDiscount, } = useContext(CartContext)
    
    
    /** 
     * Creat new order
     * @param {object} buyer 
    */
    const createNewOrder = async (buyer)=>{
        const db = getFirestore()
        const orders = db.collection("orders")
        const discount = promotionalDiscount? promotionalDiscount.mount: 0;


        const newOrder = {
            user: user ? true : false,
            buyer: user ? user : buyer,
            items: cart,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            subtotal:subtotalCart,
            discount: discount,
            total: subtotalCart - discount,
            payment:'pending',
        }

        try {
            const { id } = await orders.add(newOrder);
            console.log('id', id);
            return id;
        } catch (errors) {
            console.log('errores en nueva orden:', errors);
            throw errors;
        }

    }

      /** 
     * Creat new order
     * @param {string} orderId 
      * @param {object} dataToUpdate 
    */
    const updateOrder = async (orderId, dataToUpdate)=>{
        const db = getFirestore()
        const docRef = db.collection("orders").doc(orderId);
        
        try {
            await docRef.update(dataToUpdate);
            return ;
        } catch (e) {
            return ;
        }
    }

    return (
        <OrderContext.Provider value={{ createNewOrder, updateOrder }}>
            {children}
        </OrderContext.Provider>
    )
}