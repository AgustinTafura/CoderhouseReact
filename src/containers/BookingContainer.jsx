import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { withRouter, useLocation } from "react-router-dom";
import { openPopupWidget,InlineWidget,CalendlyEventListener  } from "react-calendly";
import './BookingContainer.scss';
// const data  = {
    // const   url = 'https://calendly.com/juampilabollita'
    // const prefill = null
    // const pageSettings = null
    // const utm = null
    function isCalendlyEvent(e) {
        return e.data.event &&
        e.data.event.indexOf('calendly') === 0;
    };
    
    window.addEventListener(
          'message',
          function(e) {
                if (isCalendlyEvent(e)) {
                      if(e.data.event == "calendly.date_and_time_selected"){
                    
                              var button = document.getElementsByTagName("iframe")
                              // var button = document.getElementsByClassName("_1vty3-psjP _3jd0brMbl7 _1-Q37xqIVF _3NUf4XXPRW _6zb5ZygPrI _16lJIvga5w _26bxlZFZ4O _3jdvikh0KV _1NKUM54h_1 _3NimS-g7Hg")
                    
                    
                    
                    
                          }
                        }
                      }
                    );
                    
                    
                    
const BookingContainer = (props) => {
    const {updateOrder} = useContext(OrderContext)
    const {history} = props;
    const location = useLocation()
    const location_params = new URLSearchParams(location.search)
    const paramsData = JSON.parse('{"' + location_params.toString().replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key ===""? value : decodeURIComponent(value) })
    // const orderId = JSON.parse(localStorage.getItem('currentOrderBookingUpdated')).order_id
    // const bookingIdToUpdated = JSON.parse(localStorage.getItem('currentOrderBookingUpdated')).bookingIdUpdated
    // const order = JSON.parse(localStorage.getItem('currentOrderBookingUpdated')).order
    
    // order.booking[bookingIdToUpdated].data = bookingData
    const url = `https://calendly.com/${paramsData.type}/${paramsData.code}?primary_color=14bf98`
    console.log(url)
    useEffect(() => {
       
        // updateOrder(orderId,  {booking:order.booking})
    }, [])



    
    return (
        <>
            <div id="services" className="counter">
                <div className="container" style={{textAlign:"center"}}>
                <CalendlyEventListener 
                    onDateAndTimeSelected={(e)=>console.log(1,e)}
                    onEventScheduled={(e)=> {e.preventDefault(); console.log(2,e)}}
                    onEventTypeViewed={(e)=>console.log(3,e)}
                    onProfilePageViewed={(e)=>console.log(4,e)}
                />
                <InlineWidget
                
                    url={url}   
                    styles={{minWidth: '360px', height: '280px',overflow: 'hidden'}}
                    prefill={{
                        email: 'test@test.com',
                        firstName: 'Jon',
                        lastName: 'Snow',
                        name: 'Jon Snow',
                        customAnswers: {
                          a1: 'a1',
                          a2: 'a2',
                          a3: 'a3',
                          a4: 'a4',
                          a5: 'a5',
                          a6: 'a6',
                          a7: 'a7',
                          a8: 'a8',
                          a9: 'a9',
                          a10: 'a10'
                        }
                      }}
                />
                </div> 
            </div>
       

        </>
    )
}

export default BookingContainer