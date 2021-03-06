import React, { useState, useEffect, useContext } from "react";

import Item from '../components/Item';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { CommercialContext } from "../context/CommercialContext";

const ItemListContainer = (props) => {
    
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const {products, numberToPrice} = useContext(CommercialContext)

    
    useEffect(() => {
        setIsLoading(true)
        
        setTimeout(() => {
                setIsLoading(false);
            
        }, 1000);
        
        return () => {
                setIsLoading(false);
        }
            
    }, [categoryId])



    if(isLoading || products.length === 0){
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
                        <div className="section-title">{categoryId?categoryId:'TIENDA'}</div>
                        <h2>Elige la opción ideal que mejor<br></br> se adapte a tus objetivos</h2>
                    </div> 
                </div> 

                {categoryId?
                    ( <>
                    
                    <div className="ex-basic-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumbs">
                                        <Link to="/tienda"> Tienda </Link>
                                        {/* <a href="index.html">Tienda</a> */}
                                        <i className="fa fa-angle-double-right"></i>
                                        {categoryId?<Link to={`/tienda/${categoryId}`}>{categoryId}</Link>:null}
                                        {/* <a href="index.html">{productsSelected.categoryId}</a> */}
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div>
                    </>
                    ) :null 
                }
                
                <div className="row">
                    <div className="col-lg-12">

                        {products.length !== 0?
                            (categoryId?
                                products.map((product, index)=>{
                                    if(product.category === categoryId){

                                        return (
                                            <Item key={index}  
                                                product={product}
                                                numberToPrice={numberToPrice}
                                            />
                                        )
                                    }
                                })
                                :products.map((product, index)=>{
                                    return (
                                        <Item key={index}  
                                            product={product}
                                            numberToPrice={numberToPrice}
                                        />
                                    )
                                })
                            )
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