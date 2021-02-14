import React, { useState, useEffect } from "react";
import productList from '../mock/productList'
import Item from '../components/item';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ItemListContainer = (props) => {
    
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    
    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(productList), 3000)
        })
        
        myPromise.then(
            (result)=>{
                if (categoryId) {
                    const categoryProductList = result.filter(product => product.categoryId === categoryId)
                    setProducts(categoryProductList)
                    setIsLoading(false);
                    
                } else {
                    setProducts(result);
                    setIsLoading(false);
                }
                
            }
        )
            
    }, [categoryId])


    if(isLoading){
        return (
            < >
                <div className='loadingComponent'>
                    <p > Cargando productos </p>    
                    <div className="spinner-grow bounce1" role="status">
                        <span className="sr-only">Cargando Productos</span>
                    </div>
                    <div className="spinner-grow bounce2" role="status">
                        <span className="sr-only">Cargando Productos</span>
                    </div>
                    <div className="spinner-grow bounce3" role="status">
                        <span className="sr-only">Cargando Productos</span>
                    </div>
                </div>

            </>

        )
    }

    return (
        <>
            <div id="services" className="cards-2">
                <div className="container" style={{textAlign:"center"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">TIENDA</div>
                            <h2>Elige el plan ideal que mejor<br></br> se adapte a tus objetivos</h2>
                        </div> 
                    </div> 
                        <div className="row">
                            <div className="col-lg-12">

                                {products.length !== 0?

                                    products.map((product, index)=>{
                                        return (
                                            <Item key={index}  
                                                id={product.id} 
                                                name={product.name} 
                                                features={product.feature} 
                                                price={product.price} 
                                                description={product.description} 
                                                image={product.image}
                                                stock={product.stock}
                                            />
                                        )
                                    })
                                    :<>
                                        <h4>No hemos encontrado productos para ésta categoría</h4>
                                        <Link to="/tienda" className="btn-solid-lg page-scroll">VER OTROS PRODUCTOS</Link>
                                    </>

                                }

                            </div> 
                        </div> 
                </div> 
            </div>
       </>
    )
    
}
export default ItemListContainer;