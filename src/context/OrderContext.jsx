import { createContext, useContext } from "react";
import { getFirestore } from "../firebase";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import firebase from "firebase/app";
import "@firebase/firestore";
// Creamos el espacio de memoria
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    
    const { user  } = useContext(UserContext)
    const { cart, subtotalCart, promotionalDiscount, } = useContext(CartContext)
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

            return id;
        } catch (errors) {
            throw errors;
        }

    }

      /** 
     * Update new order
     * @param {string} orderId 
      * @param {object} dataToUpdate 
    */
    const updateOrder = async (orderId, dataToUpdate)=>{
        const docRef = db.collection("orders").doc(orderId);

        try {
            await docRef.update(dataToUpdate);
            return ;
        } catch (e) {
            console.log('hubo un error', e)
            return ;
        }
    }

    



    /** 
     * Get Order by Id
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

                }
            }).catch((error) => {

            });
            
        }

    return (
        <OrderContext.Provider value={{ createNewOrder, updateOrder, getOrderById}}>

            {children}
        </OrderContext.Provider>
    )
}