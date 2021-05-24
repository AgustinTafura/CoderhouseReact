import { createContext } from "react";
import {encryptData } from './../utils/data';
// import { getFirestore } from "../firebase";


// Creamos el espacio de memoria
export const MercadoPagoContext = createContext();


export const MercadoPagoProvider = ({ children }) => {

    

    const payOnMP = (data) => {
        console.log(111)
        fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST', 
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_MP_API_TEST_PK_ATOKEN}`
            },
            body: JSON.stringify({
                items: data.items,
                payer: data.payer,
                external_reference: data.external_reference,       
                back_urls: {
                    success: `${window.location.origin}/JPL-React/thankYou`,
                    pending: `${window.location.origin}/JPL-React/thankYou`,
                    failure: `${window.location.origin}/JPL-React/checkout`,
                },
                statement_descriptor: "JPL NUTRICIÓN",
                auto_return: 'approved',

            }
            
        ),

        }).then(result=>{
            console.log(222)
            return result.json();
        }).then(value=>{

            //Encrypt data
            const encryptedData = encryptData(value.payer, process.env.REACT_APP_ENCRYPT_SECRET_KEY);
            //setLocalStorage
            localStorage.setItem('payer', encryptedData)

            // const linkToMP = value.init_point
            console.log(333)
            console.log('value', value)
            console.log('value.init', value.init)
            window.location.href = value.init_point

            return  value
        }).catch(function() {
          alert("Error al generar la Preference");

      });
    }



    return (
        <MercadoPagoContext.Provider value={{ payOnMP }}>
            {children}
        </MercadoPagoContext.Provider>
    )
}