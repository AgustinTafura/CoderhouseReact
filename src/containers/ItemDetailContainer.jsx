import React, { useState, useEffect } from "react";
import ItemDetail from "../components/itemDetail";
import product from '../mock/product';


const ItemDetailContainer = (props) => {
    
    
    const [isLoading, setIsLoading] = useState(false)
    const [productSelected, setProductSelected] = useState([])

    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(product), 1000)
        })
        
        myPromise.then(
            (result)=>{ 
                setProductSelected(result);
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
                            <ItemDetail product={productSelected}/>
                </div> 
            </div> 
        </>
    )
    
}
export default ItemDetailContainer;