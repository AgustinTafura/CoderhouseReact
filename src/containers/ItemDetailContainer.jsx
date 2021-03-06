import React, { useState, useEffect, useContext } from "react";
import ItemDetail from "../components/ItemDetail";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CommercialContext } from "../context/CommercialContext";

const ItemDetailContainer = (props) => {
    
    const {id} = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const {products, numberToPrice} = useContext(CommercialContext)
    const [productSelected, setProductSelected] = useState([])

    useEffect(async () => {

        id && setProductSelected(await products.find(element => element.id == id))
        setIsLoading(true)
        
        setTimeout(() => {
                setIsLoading(false);
                console.log(111)
        }, 1000);
            
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
        console.log(productSelected),
        // console.log(product),
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
                                    <Link to={`/tienda/${productSelected.category}`}>{productSelected.category}</Link>
                                    {/* <a href="index.html">{productSelected.categoryId}</a> */}
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div>
                {console.log(products)}
                {products.length !== 0&&<ItemDetail product={productSelected} numberToPrice={numberToPrice}/>}
                </div> 
            </div>

            
             
        </>
    )
    
}
export default ItemDetailContainer;