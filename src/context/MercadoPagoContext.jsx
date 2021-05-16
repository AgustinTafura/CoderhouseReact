import { createContext } from "react";

// import { getFirestore } from "../firebase";


// Creamos el espacio de memoria
export const MercadoPagoContext = createContext();


export const MercadoPagoProvider = ({ children }) => {



    const payOnMP = (data) => {

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
                    success: 'http://localhost:3000/thankYou',
                    pending: 'http://localhost:3000/thankYou',
                    failure: 'http://localhost:3000/checkout',
                },
                statement_descriptor: "JPL NUTRICIÓN",
                auto_return: 'approved',

            }
            
        ),

        }).then(result=>{
            return result.json();
        }).then(value=>{
            localStorage.setItem('payer', JSON.stringify(value.payer))
            // const linkToMP = value.init_point

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