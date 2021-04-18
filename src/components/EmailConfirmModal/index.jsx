import $ from 'jquery'
import './style.scss';
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect} from "react";
import { withRouter, useLocation } from "react-router-dom";


const AuthModal = (props) => {
    const {history} = props;
    const { logInUser, createNewUserWithEmailAndPassword, logOutUser, logInWhitGoogle, logInWhitFacebook } = useContext(UserContext)
    const [errors, setErrors] = useState({})
    const location = useLocation()
    const signInForm = document.querySelector("#login-form");

    //check empty inputs
    const checkErrors = (e) => {
        if(e.value.trim().length >0) {
            console.log(1)
            setErrors({}) 
            !e.classList.contains("notEmpty") && e.classList.add("notEmpty")
        } else {
            return e.classList.contains("notEmpty") && e.classList.remove("notEmpty")
        }  
        e.classList.add("notEmpty")
    }

        
 
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="EmailConfirmModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5>Ingrese el Email utilizado para ésta compra</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form id="emailConfirmation-form" >

                        <div className="form-group">
                            <input onFocus={(e)=>checkErrors(e.target)} onBlur={(e)=>checkErrors(e.target)} type="email"  className={`form-control-input ${errors.email ? 'notEmpty errorData':''} `} id="email-confirmation" name="email-confirmation" required />
                            <label className="label-control" htmlFor="email">Email
                                {errors.email? <small className="text-muted"> -  {errors.email}  </small> : null }
                            </label>
                        </div>
                        
                        
                        <button id="emailConfirmationButtonSubmit" className="btn-solid-lg btn-block">Continuar</button> 

                    </form>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AuthModal)

