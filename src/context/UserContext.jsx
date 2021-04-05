import { createContext, useEffect, useState, } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { toast } from 'react-toastify';



export const UserContext = createContext();




export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false) 

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {

            if (user) {
                setUser( user)
                setIsAuthenticated(true)
                // console.log(user)
            } else {
                // No user is signed in.
                setUser(false)  
                setIsAuthenticated(false)
                // console.log(user)
            }
    
        });
        //auth listener (keep the user alive)
    }, [])
      
    const createNewUserWithEmailAndPassword = (email,pass) => {

        const newUser =  auth
            .createUserWithEmailAndPassword(email,pass)
            .then(
                (userCredentials)=>{
                    console.log(userCredentials)
                    const user =  userCredentials.user
                   
                    user.sendEmailVerification().then((a)=> {
                        toast("Ingresa a tu email y verifica tu cuenta!", {
                            // autoClose: false,
                            position: "top-right",
                        });
                    }).catch( (error) => {
                        console.log('An error happened.', error)
                    });
                    return user
                }
            ).catch(
                (errors)=> {
                    console.log(errors)
                    if(errors.code == "auth/email-already-in-use") {
                        auth.fetchSignInMethodsForEmail(email).then(function(providers) {
        
                            var msg = providers.length > 0 && providers == "password" ? `Intenta ingresar con email y contraseña`: `Ya existe una cuenta con este Email, intenta ingresando con tu cuenta de ${providers}`
                            toast.error(msg, {
                                // autoClose: false,
                                position: "top-right",
                            });
                        });
                    } else {
                                toast.error("No hemos podido crear a tu cuenta. Intentalo nuevamente!", {
                            // autoClose: false,
                            position: "top-right",
                        });
                    }
                    throw errors
                }
            )
            
        return newUser
    }

    const logInUser = (email,pass) => {
        const user = auth.signInWithEmailAndPassword(email,pass)
        .then((user)=>{setIsAuthenticated(true)})
        .catch((errors)=>{

            
            switch (errors.code) {
                case "auth/user-not-found": toast('No existen cuentas con éste email', {position: "top-right"});
                    break;   
                case "auth/wrong-password": 
                    {
                        auth.fetchSignInMethodsForEmail(email).then(function(providers) {

                            var msg = providers.length > 0 && providers == "password" ? ` Contraseña erronea`: `Intenta ingresando con tu cuenta de ${providers}`
                            toast(msg, {
                                // autoClose: false,
                                position: "top-right",
                            });
                        });
                    }
                    break;
                case "auth/too-many-requests": toast('Has realizado muchos intentos incorrecto, intenta más tarde nuevamente', {position: "top-right"});  
                    break;
            
                default: toast("No hemos podido ingresar a tu cuenta. Intentalo nuevamente!", {position: "top-right"}); 
                    break;
            }

            throw errors
        })
        return user
    }

    const logInWhitGoogle = ()=> {

        const provider = new firebase.auth.GoogleAuthProvider();

       return auth.signInWithPopup(provider)
        .then((user)=>{setIsAuthenticated(true);console.log(1)})
        .catch((errors)=>{
            console.log(errors)
            if(errors.code == "auth/account-exists-with-different-credential") {
                auth.fetchSignInMethodsForEmail(errors.email).then(function(providers) {

                    var msg = providers.length > 0 && providers == "password" ? `Intenta ingresar con email y contraseña`: `Intenta ingresando con tu cuenta de ${providers}`
                    toast.error(msg, {
                        // autoClose: false,
                        position: "top-right",
                    });
                });
            } else {

                toast.error("No hemos podido ingresar a tu cuenta. Intentalo nuevamente!", {
                    // autoClose: false,
                    position: "top-right",
                });
            }
            throw errors
        })

    }

    const logInWhitFacebook = ()=> {
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider)
        .then((user)=>{setIsAuthenticated(true);console.log(1)})
        .catch((errors)=>{
            console.log(errors)
            if(errors.code == "auth/account-exists-with-different-credential") {
                auth.fetchSignInMethodsForEmail(errors.email).then(function(providers) {

                    var msg = providers.length > 0 && providers == "password" ? `Intenta ingresar con email y contraseña`: `Intenta ingresando con tu cuenta de ${providers}`
                    toast.error(msg, {
                        // autoClose: false,
                        position: "top-right",
                    });
                });
            } else {

                toast.error("No hemos podido ingresar a tu cuenta. Intentalo nuevamente!", {
                    // autoClose: false,
                    position: "top-right",
                });
            }
            throw errors
        })
    }

    const logOutUser = () => {
        const notify = () => toast.success("Has cerrado sesión!", {
            // autoClose: false,
            position: "top-right",
        });

        auth.signOut().then( 
            setTimeout(() => {
                notify()
            }, 1500) 
        )

        setIsAuthenticated(false)

    }
    


    return (
        <UserContext.Provider value={{ logInUser, logInWhitGoogle, logInWhitFacebook, createNewUserWithEmailAndPassword , user, logOutUser, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

