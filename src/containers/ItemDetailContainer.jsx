import React, { useState, useEffect } from "react";
import ItemDetail from "../components/ItemDetail";
import productList from '../mock/productList';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ItemDetailContainer = (props) => {
    
    const {id} = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [productSelected, setProductSelected] = useState([])

    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(productList), 1000)
        })
        
        myPromise.then(
            (result)=>{
                result.filter( product => {
                   return product.id.toString() === id? setProductSelected(product) : null;                 
                })
                setIsLoading(false);
            }
        )
            
    }, [id])

    if(isLoading){
        return (
            <>
            
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
            <div id="services" className="counter">
                <div className="container" style={{textAlign:"center"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">Plan de Alimentación</div>
                            <h2>Elige la opción ideal que mejor<br></br> se adapte a tus objetivos</h2>
                        </div> 
                    </div> 

                    <div className="ex-basic-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs">
                                    <Link to="/tienda"> Tienda </Link>
                                    {/* <a href="index.html">Tienda</a> */}
                                    <i className="fa fa-angle-double-right"></i>
                                    <Link to={`/tienda/${productSelected.categoryId}`}>{productSelected.categoryId}</Link>
                                    {/* <a href="index.html">{productSelected.categoryId}</a> */}
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div>
                    <ItemDetail product={productSelected}/>
                </div> 
            </div>

            
             
        </>
    )
    
}
export default ItemDetailContainer;