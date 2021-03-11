import { createContext, useState, useEffect } from "react";
// import { getFirestore } from "../firebase";

// Creamos el espacio de memoria
export const MercadoPagoContext = createContext();

export const MercadoPagoProvider = ({ children }) => {
    
    console.log(888888888888888)


    return (
        <MercadoPagoContext.Provider value={{  }}>
            {children}
        </MercadoPagoContext.Provider>
    )
}