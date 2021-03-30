import $ from 'jquery'
import './style.scss';
import { UserContext } from "../../context/UserContext";
import { useContext} from "react";
import { withRouter } from "react-router-dom";
import { auth } from '../../firebase';

const AuthModal = (props) => {
    const {history} = props;
    const { logInUser, createNewUserWithEmailAndPassword, logOutUser, logInWhitGoogle, logInWhitFacebook } = useContext(UserContext)



    window.addEventListener("load", ()=>{

        //SignUp
        const registerButton = document.querySelector(".registerModal");
        const signUpForm = document.querySelector("#signup-form");
    
        registerButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopImmediatePropagation();
            $('#signinModal').modal("hide");
            $('#signupModal').modal("show");
        })

        signUpForm.addEventListener("submit", (e) => {
            e.stopImmediatePropagation();
            const email = signUpForm["signup-email"].value;
            const password = signUpForm["signup-password"].value;
            
            createNewUserWithEmailAndPassword(email,password).then((userCredential) => {
                console.log(userCredential)
                // userCredential.sendEmailVerification().then(function(a) {
                //     console.log('Email sent.', a)
                // }).catch(function(error) {
                //     console.log('An error happened.', error)
                // });
                $('#signupModal').modal("hide");
                // clear the form
                signUpForm.reset();

              });
        })
    
        //SignIn with Email and Pass
        const signInForm = document.querySelector("#login-form");
        
        signInForm.addEventListener("submit",  (e) => {
            e.preventDefault();
            e.stopImmediatePropagation()
            const email = signInForm["login-email"].value.toString();
            const password = signInForm["login-password"].value;
            console.log(777, typeof email, email)


            logInUser(email,password)
            .then((user)=>
                {
                    signInForm.reset()
                    $("#signinModal").modal("hide");
                    console.log(user)

                })
            .catch(error=>console.log(error))

    
        })
        

        // Login with Google
        const googleButton = document.querySelector("#googleLogin");

        googleButton.addEventListener("click", (e) => {

        e.stopImmediatePropagation();
        signInForm.reset();
        $("#signinModal").modal("hide");

        logInWhitGoogle()
        });

        
        // Login with Facebook
        const facebookButton = document.querySelector("#facebookLogin");

        facebookButton.addEventListener("click", (e) => {

        e.stopImmediatePropagation();
        signInForm.reset();
        $("#signinModal").modal("hide");
        logInWhitFacebook().then((user)=>console.log(user)).catch(error=>console.log(error))
        });
    
        
    })
    
    const logout = ()=>{
        logOutUser();
        $('#logoutModal').modal("hide");
        history.push("/")

    }


    return (
        <>
                        {/* <!-- Modal --> */}
            <div className="modal fade" id="signupModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>Crear una nueva cuenta</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form id="signup-form">
                        <div className="form-group">
                        <input type="text" id="signup-email" className="form-control" placeholder="Mail" required/>
                        </div>
                        <div className="form-group">
                        <input type="password" id="signup-password" className="form-control" placeholder="Contrseña" required/>
                        </div>
                        <button type="submit" className="btn-solid-lg">Registrarse</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <div className="modal fade" id="signinModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalSignin" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>Ingresar</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form id="login-form">
                        <div className="form-group">
                        <input type="text" id="login-email" className="form-control" placeholder="Mail" required/>
                        </div>
                        <div className="form-group">
                        <input type="password" id="login-password" className="form-control" placeholder="Contraseña" required/>
                        </div>
                        <button type="submit" className="btn-solid-lg btn-block">Entrar</button>
                        <button type="button" className="btn-solid-lg btn-block" id="googleLogin">Ingresar con tu cuenta de Google</button>
                        <button type="button" className="btn-solid-lg btn-block" id="facebookLogin">Ingresar con tu cuenta de Facebook</button>
                        <div className="nav-item logged-out justify-content-center ml-3 mt-2">
                            <span >No tienes una cuenta?</span> <a className="mx-2 registerModal" href="#" >Registrarse</a>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

                {/* <!-- Logout Modal--> */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Estas seguro que desas salir?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {/* <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div> */}
                        <div className="modal-footer">
                            <button className="btn-solid-lg btn-light" type="button" data-dismiss="modal">Cancel</button>
                            <a onClick={()=>{logout() }} className="btn-solid-lg " id="logOutButton">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AuthModal)

