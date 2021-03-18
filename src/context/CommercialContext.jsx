import { createContext, useState, useEffect} from "react";
import { getFirestore } from "../firebase";

// Creamos el espacio de memoria
export const CommercialContext = createContext();

export const CommercialProvider = ({children}) => {
    const [products, setProducts] = useState([])


    useEffect(async () => {
        const db = getFirestore();
        const productCollection = db.collection("products")

        const CategoryCollection = db.collection("categories")

        const categoryList = await CategoryCollection.get().then(async (value) => {
            return Promise.all(
                value.docs.map(async (category) => {return await {...category.data(), id:category.id}})
            )
        })
        productCollection.get().then(async (value) => {

            let productsList = await Promise.all(

                value.docs.map( async (product) => { 
                    
                    
                    // console.log(product.data().categoryId)
                    // console.log()
                    let categoryName =  categoryList.find(category => category.id === product.data().categoryId)

                    return {...product.data(), id:product.id, category: categoryName.name} 
                    
                    
                })
            )

            
            setProducts(productsList)


        })
        

    }, [])

    const numberToPrice = (x) => {

            return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


    }
    
    
    return (
        <CommercialContext.Provider value={{products, numberToPrice}}>
            {children}
        </CommercialContext.Provider>
    )
}