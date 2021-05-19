import React from "react";
import { InlineWidget,CalendlyEventListener  } from "react-calendly";
import './BookingContainer.scss';
                   
                    
                    
const BookingContainer = (props) => {
    const url = 'https://calendly.com/juampilabollita'
    console.log(url)



    
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
                    styles={{minWidth: '360px', height: '750px',overflow: 'hidden'}}
                    prefill={{}}
                />
                </div> 
            </div>
       

        </>
    )
}

export default BookingContainer