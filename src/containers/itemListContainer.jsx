import React, { useState, useEffect } from "react";
// import ItemCountComponent from "../components/itemCount"
import ItemList from "../components/itemList"
import productList from '../mock/productList'

    
const ItemListContainer = (props) => {
    

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(productList), 3000)
        })
        
        myPromise.then(
            (result)=>{ 
                setProducts(result);
                setIsLoading(false);
            }
            // (result)=>{console.log(result)}
        )
            
    }, [])

    if(isLoading){
        return (
            <>
            
                <p> Cargando productos </p>    
                <div class="spinner-grow bounce1" role="status">
                    <span class="sr-only">Cargando Productos</span>
                </div>
                <div class="spinner-grow bounce2" role="status">
                    <span class="sr-only">Cargando Productos</span>
                </div>
                <div class="spinner-grow bounce3" role="status">
                    <span class="sr-only">Cargando Productos</span>
                </div>

            </>

        )
    }

    return (
        <>
            <div id="services" className="cards-2">
                <div className="container" style={{textAlign:"center"}}>   
                            <ItemList products={products}/>
                </div> 
            </div> 

        </>
    )
    
}
export default ItemListContainer;