import { createContext, useState, useEffect} from "react";
import { getFirestore } from "../firebase";

// Creamos el espacio de memoria
export const CommercialContext = createContext();

export const CommercialProvider = ({children}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const db = getFirestore();
        const productCollection = db.collection("products")
        productCollection.get().then((value) => {
            const productsList = value.docs.map(element => { return {...element.data(), id:element.id}})
            console.log('consume')

            setProducts(productsList)
        })
 
    }, [])


    // console.log(products)
    
    return (
        <CommercialContext.Provider value={{products}}>
            {children}
        </CommercialContext.Provider>
    )
}