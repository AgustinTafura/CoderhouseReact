import $ from 'jquery'
import './style.scss';
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect} from "react";
import { withRouter, Link } from "react-router-dom";

const OrderBookingDetail = (props) => {
    const bookingInfo = props.order.booking
    const currentProductId = props.currentProductId
    const {history} = props;


    const reschedule = () => {
        $('#orderDetailModal').modal('hide')
        history.push(`/booking?type=reschedulings&code=${bookingInfo[currentProductId].cancelCode}`)
    }

    const cancel = () => {
        $('#orderDetailModal').modal('hide')
        history.push(`/booking?type=cancellations&code=${bookingInfo[currentProductId].cancelCode}`)
    }

    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="orderDetailModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 style={{fontWeight: 'bold'}}>Turno Confirmado</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body justify-content-center">

                        <div data-container="details" className="_1Bb7pCnP06 _3-FM_THD4F">
                            {/* <div className="">
                                <h3 className   ="mb-2">Hemos enviado la informacion de su turno a {props.order.buyer.email}</h3>
                            </div> */}
                            {/* <div data-id="details-highlighted-item" style={{color: 'var(--primary)'}}>
                                <i style={{fontSize: '20px'}} className="far fa-calendar mr-2"/>
                                <span>
                                {day[timeStart.getDay()]}
                                ,
                                {timeStart.getDate()} de {month[timeStart.getMonth()]} de {timeStart.getFullYear()}
                                </span>
                            </div>
                            <div data-id="details-highlighted-item" style={{color: 'var(--primary)'}}>
                                <i style={{fontSize: '20px'}} className="far fa-clock mr-2"/>
                                <span>
                                {timeStart.getHours()}:{timeStart.getMinutes()<10?`0${timeStart.getMinutes()} hs. `:`${timeStart.getMinutes()} hs. `} 
                                </span>
                           </div> */}
                            <div style={{display: "flex"}}>
                                <i className="fas fa-envelope mr-3 h1"/>
                                <span> Hemos enviado la informacion de su turno a {props.order.buyer.email} desde Calendly</span>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer justify-content-center">
                        <button onClick={reschedule} >Reprogramar</button>
                        <button onClick={cancel}  >Cancelar Turno</button>

                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(OrderBookingDetail)

