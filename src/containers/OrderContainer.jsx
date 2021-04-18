import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { CommercialContext } from "../context/CommercialContext";
import { useParams } from "react-router-dom";
import ItemOrder from '../components/ItemOrder';
import EmailConfirmModal from '../components/EmailConfirmModal';
import $ from 'jquery';
import { toast } from "react-toastify";
import {getFileFromDB} from '../firebase'

const OrderContainer = (props) => {
    const {numberToPrice, getProductById} = useContext(CommercialContext)
    const {getOrderById} = useContext(OrderContext)
    const {order_id} = useParams()
    const [order, setOrder] = useState()
    const [emailConfirmation, setEmailConfirmation] = useState()
    const modal = $('#EmailConfirmModal')

    

    const openBookingPopUp = () =>{
        console.log(emailConfirmation)
        emailConfirmation === undefined?
        modal.modal('show')
        
        :   (

            console.log('booking')
        )
    }
    
    const downloadFile = (fileName) =>{
        console.log(emailConfirmation)
        emailConfirmation === undefined?
        modal.modal('show')
        
        :   (
            getFileFromDB(fileName)
        )
    }


    
    useEffect( () => {
        
        const getOrderData =  async ()=>{
            

            getOrderById(order_id)
            .then(order=>{
                setOrder(order)

                const form = document.getElementById('emailConfirmation-form')
                form.addEventListener("submit", (e) => {
                    e.preventDefault()
                    e.stopImmediatePropagation()
                    var email = document.getElementById('email-confirmation').value
                    if(email == order.buyer.email){
                        $('#EmailConfirmModal').modal('hide')
                        setEmailConfirmation(email)
                        toast.success('Ahora puedes descargar tu contenido, intentalo nuevamente!', {
                            position: "top-right",
                            autoClose: 3000,
                            
                        });
                    } else {

                        toast.error('El Email no coincide con el utilizado en ésta compra', {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    }                    
                })

            })
        }

        getOrderData()



        
        }, [])

    return (

      <>
            <div id="services" className="cards-2">
                <div className="container">

                    <h2 style={{ fontFamily: "Montserrat-Bold", textAlign:"left"}}><span
                            style={{ fontFamily: "Mansalva",fontSize:'3rem'}}>Mis </span> productos
                    </h2>

                    <div className="row">
                        <div className="col-lg-12">
                            {(order == undefined)?

                            (
                            <>

                                <div className='loadingComponent' style={{top:'25vh'}}>
                                    <p> Cargando productos </p>
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
                            :
                            (order.items.map( (item,index)=>{

                            var product = getProductById(item.id)
                            if(product != undefined){
                                return(
                                    <>
                                        <ItemOrder key={index} product={product} downloadFile={downloadFile} openBookingPopUp={openBookingPopUp} />
                                    </>
                                )
                            }
                            }))


                            }
                        </div>

                    </div>
                </div>
            </div>

       <EmailConfirmModal/>                
         
                            
    </>

  )
}

export default OrderContainer
