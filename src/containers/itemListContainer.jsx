import React, { useState, useEffect, useContext } from "react";
import productList from '../mock/productList'
import Item from '../components/Item';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFirestore } from "../firebase";
import { CommercialContext } from "../context/CommercialContext";

const ItemListContainer = (props) => {
    
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    // const [products, setProducts] = useState([])
    const {products} = useContext(CommercialContext)
    
    useEffect(() => {

        setIsLoading(true)

        // const db = getFirestore();
        // const productCollection = db.collection("products")
        // productCollection.get().then((value) => {
            
        //     const productsList = value.docs.map(element => { return {...element.data(), id:element.id}})
        //     // console.log('consume')

        //     setProducts(productsList)
            
        // })
        
        // console.log(products)
        
        setTimeout(() => {
                setIsLoading(false);
            
        }, 2000);
            
    }, [])


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
                        <div className="section-title">{categoryId?categoryId:'TIENDA'}</div>
                        <h2>Elige el plan ideal que mejor<br></br> se adapte a tus objetivos</h2>
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
                                        {/* <a href="index.html">{productSelected.categoryId}</a> */}
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

                            products.map((product, index)=>{
                                return (
                                    <Item key={index}  
                                        product={product}
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