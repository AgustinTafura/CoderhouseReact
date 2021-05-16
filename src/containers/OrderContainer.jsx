import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { CommercialContext } from "../context/CommercialContext";
import { useParams } from "react-router-dom";
import ItemOrder from '../components/ItemOrder';
import EmailConfirmModal from '../components/EmailConfirmModal';
import $ from 'jquery';
import { toast } from "react-toastify";
import {getFileFromDB} from '../firebase'
import { openPopupWidget, CalendlyEventListener } from "react-calendly";
import './OrderContainer.scss';


const OrderContainer = (props) => {
    const {getProductById} = useContext(CommercialContext)
    const {getOrderById, updateOrder} = useContext(OrderContext)
    const {order_id} = useParams()
    const [order, setOrder] = useState()
    const [currentProductId, setCurrentProductId] = useState()
    const [emailConfirmation, setEmailConfirmation] = useState()
    

    const reschedule = (productId, code) => {
            openBookingPopUp(productId, 'reschedulings', code)
    }

    const cancel = (productId, code) => {
        openBookingPopUp(productId, 'cancellations', code)
    }

    const openBookingPopUp = (product_id,type, code) =>{
        
        const modal = $('#EmailConfirmModal')
        setCurrentProductId(product_id)
        emailConfirmation === undefined?
        modal.modal('show')
        
        :   (
            code?
            openPopupWidget({ url:`https://calendly.com/${type}/${code}?primary_color=14bf98`,style:{minWidth: '360px', height: '1000px',overflow: 'hidden'}})
            :openPopupWidget({ url:"https://calendly.com/agustintafura/15min?primary_color=14bf98",style:{minWidth: '360px', height: '1000px',overflow: 'hidden'}})
            )
    }
    
    const downloadFile = (fileName) =>{
        const modal = $('#EmailConfirmModal')
        emailConfirmation === undefined?
        modal.modal('show')
        
        :   (
            getFileFromDB(fileName)
        )
    }

    const getOrderData =  async ()=>{
        
        
        getOrderById(order_id)
        .then(order=>{
            setOrder(order)
            
            const form = document.getElementById('emailConfirmation-form')
            form&&(
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                e.stopImmediatePropagation()
                var email = document.getElementById('email-confirmation').value
                if(email === order.buyer.email){
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
)
        })
    }
    
    useEffect(() => {
        
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
                            {
                                emailConfirmation === undefined?
                                    <EmailConfirmModal />
                                : (
                                    (order === undefined)?

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
                                            if(product !== undefined){
                                                return(
                                                    <ItemOrder 
                                                        key={index} product={product} 
                                                        downloadFile={downloadFile} 
                                                        openBookingPopUp={openBookingPopUp} 
                                                        order={order} 
                                                        cancel={cancel}
                                                        reschedule={reschedule} 
                                                    />
                                                )
                                            }
                                        })
                                    )
            
            
                                        
                                )
                            }
                            
                        </div>

                    </div>
                </div>
            </div>


           
            {order !== undefined&&(
                <>                  
                    <CalendlyEventListener 

                        onEventScheduled={(e)=> {
                            e.preventDefault();

                            const eventLink =  e.data.payload.event.uri.toString()
                            const invitee = e.data.payload.invitee.uri
                            const eventCode = eventLink.substring(eventLink.lastIndexOf('scheduled_events/') + 17, eventLink.length)
                            const inviteeCode = invitee.substring(invitee.lastIndexOf('invitees/') + 9, invitee.length)

                            if(order.booking === undefined){
                                order.booking = {}
                            }
                            order.booking[currentProductId] = {
                                    eventCode: eventCode,
                                    eventLink: eventLink,
                                    cancelCode: inviteeCode,
                                    cancelLink: `https://calendly.com/cancellations/${inviteeCode}`,
                                    rescheduleLink: `https://calendly.com/reschedulings/${inviteeCode}`
                                }

                            
                            console.log(11, order)
                            updateOrder(order_id,  {booking:order.booking})
                            .then((e)=>{
                                // localStorage.setItem('currentOrderBookingUpdated', JSON.stringify({order:order, order_id:order_id, orderB:order.booking, bookingIdUpdated:currentProductId}));
                                getOrderData()
                                })
                        }}
                    />
                </>
            )}
       
                            
        </>

  )
}

export default OrderContainer
