import $ from 'jquery'
import './style.scss';
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect} from "react";
import { withRouter, useLocation } from "react-router-dom";


const AuthModal = (props) => {

    const [errors, setErrors] = useState({})

    const checkErrors = (e) => {
        if(e.value.trim().length >0) {
            setErrors({}) 
            !e.classList.contains("notEmpty") && e.classList.add("notEmpty")
        } else {
            return e.classList.contains("notEmpty") && e.classList.remove("notEmpty")
        }  
        e.classList.add("notEmpty")
    }

        
 
    return (
        <>

            <div className='d-flex justify-content-center'>
                <div className="d-inline-flex text-center">
                    <form id="emailConfirmation-form" >
                        <h5>Ingrese el Email utilizado para ésta compra</h5>

                        <div className="form-group">
                            <input onFocus={(e)=>checkErrors(e.target)} onBlur={(e)=>checkErrors(e.target)} type="email"  className={`form-control-input ${errors.email ? 'notEmpty errorData':''} `} id="email-confirmation" name="email-confirmation" required />
                                <label className="label-control" htmlFor="email">Email
                            </label>
                        </div>
                        
                        
                        <button type='submit'  id="emailConfirmationButtonSubmit" className="btn-solid-lg btn-block">Continuar</button> 

                    </form>
                </div>
            </div>

        </>
    )
}

export default withRouter(AuthModal)

