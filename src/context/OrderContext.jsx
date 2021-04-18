import { createContext, useContext, useState } from "react";
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
    const db = getFirestore()
    
    /** 
     * Creat new order
     * @param {object} buyer 
    */
    const createNewOrder = async (buyer)=>{
        const orders = db.collection("orders")
        const discount = promotionalDiscount? promotionalDiscount.mount: 0;


        const newOrder = {
            user: user ? 'true' : 'false',
            buyer: buyer,
            items: cart,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            subtotal:subtotalCart,
            discount: discount,
            total: subtotalCart - discount,
            payment:'pending',
        }

        try {
            const { id } = await orders.add(newOrder);
            console.log('orderId', id);
            return id;
        } catch (errors) {
            console.log('errores al crear tu orden:', errors);
            throw errors;
        }

    }

      /** 
     * Creat new order
     * @param {string} orderId 
      * @param {object} dataToUpdate 
    */
    const updateOrder = async (orderId, dataToUpdate)=>{
        const docRef = db.collection("orders").doc(orderId);
        
        try {
            await docRef.update(dataToUpdate);
            return ;
        } catch (e) {
            return ;
        }
    }

          /** 
     * Creat new order
     * @param {string} orderId 
      * @param {object} dataToUpdate 
    */
        const getOrderById =  (orderId)=>{
            const docRef = db.collection("orders").doc(orderId)
            return docRef.get().then((doc) => {
                if (doc.exists) {
                      return doc.data();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            
        }

    return (
        <OrderContext.Provider value={{ createNewOrder, updateOrder, getOrderById}}>
            {children}
        </OrderContext.Provider>
    )
}