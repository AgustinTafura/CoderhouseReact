import { createContext, useState, useEffect} from "react";
import { getFirestore } from "../firebase";

// Creamos el espacio de memoria
export const CommercialContext = createContext();

export const CommercialProvider = ({children}) => {
    const [products, setProducts] = useState([])


    useEffect(() => {

         const getProducts =  async ()=>{

            const db = getFirestore();
            const productCollection = db.collection("products")
    
            const CategoryCollection = db.collection("categories")
    
            const categoryList = await CategoryCollection.get().then(async (value) => {
                return Promise.all(
                    value.docs.map(async (category) => {return {...category.data(), id:category.id}})
                )
            })
            productCollection.get().then(async (value) => {
    
                let productsList = await Promise.all(
    
                    value.docs.map( async (product) => { 
                        
                        
                        let categoryName =  categoryList.find(category => category.id === product.data().categoryId)
    
                        return {...product.data(), id:product.id, category: categoryName.name} 
                        
                        
                    })
                )
    
                
                setProducts(productsList)
    
    
            })
        }
        
        getProducts()

    }, [])

    const numberToPrice = (x) => {

        if(x != undefined) {   return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}


    }

    const getProductById =  (product_id)=>{
        
        return  products.find( element =>  element.id == product_id)
    }
    
    
    return (
        <CommercialContext.Provider value={{products, numberToPrice, getProductById}}>
            {children}
        </CommercialContext.Provider>
    )
}