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
                    styles={{minWidth: '360px', height: '1000px',overflow: 'hidden'}}
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