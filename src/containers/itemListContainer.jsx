import React, { useState, useEffect } from "react";
// import ItemCountComponent from "../components/itemCount"
import ItemList from "../components/itemList"
import productList from '../mock/productList'

    
const ItemListContainer = (props) => {
    


    const [products, setProducts] = useState([])

    useEffect(() => {

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(productList), 2000)
        })
        
        myPromise.then(
            (result)=>{ setProducts(result)},
            // (result)=>{console.log(result)}
        )
            
    })
    return (
        <>
            <div id="services" className="cards-2">
                <div className="container" style={{textAlign:"center"}}>   
                            <ItemList products={products}/>
                </div> 
            </div> 

            {/* <ItemCountComponent stock={12} onRemove={onRemove} onAdd={onAdd} contador={contador} /> */}
        </>
    )
    
}
export default ItemListContainer;