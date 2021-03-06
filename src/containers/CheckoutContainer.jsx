import { MercadoPagoContext } from "../context/MercadoPagoContext";
import React, { useContext, useEffect, useState } from "react";
import { CommercialContext } from "../context/CommercialContext";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ModalError from "../components/ModalError"
import $ from 'jquery';
import { OrderContext } from "../context/OrderContext";
import { toast } from "react-toastify";
import {encryptData, decryptData } from './../utils/data';

const CheckoutContainer = (props) => {

const location = useLocation()
const location_params = new URLSearchParams(location.search)


const {createNewOrder} = useContext(OrderContext)
const {payOnMP} = useContext(MercadoPagoContext)
const {products, numberToPrice} = useContext(CommercialContext)
const {cart, subtotalCart,  promotionalDiscount} = useContext(CartContext)
const { register, handleSubmit, errors, watch } = useForm();

const [states, setStates] = useState(false)







const onSubmit = data => {

    
    //Encrypt data
    const encryptedData = encryptData(data, process.env.REACT_APP_ENCRYPT_SECRET_KEY);
    //setLocalStorage
    localStorage.setItem('formCheckout', encryptedData)

    const itemsDetail =
        cart.map(product => { return {
            title: product.name,
            description: product.category,
            quantity: product.quantity,
            currency_id: product.currency,
            unit_price: product.unitPrice
        } 
    })

    const payer = {
        fullName: `${data.name} ${data.surname}`,
        name: data.name ,
        surname: data.surname ,
        email: data.emailCheckout ,
        phone: {
        number: data.mobile
        }
    }



    createNewOrder(payer)
    .then((orderId)=>{
        const dataToPayment = {
            booking: {},
            items: itemsDetail,
            payer: payer,
            name: data.name ,
            surname: data.surname ,
            email: data.emailCheckout ,
            phone: {
                number: data.mobile
            },
            identification: {
                number: data.id
            },
            address: {
                street_name: `${data.address} ${data.address2}`,
                street_number: null,
                zip_code: data.cp
            },
            external_reference: {
                email: data.emailCheckout,
                order_id: orderId,
                name: data.name,
                surname: data.surname ,
            }
        }

        payOnMP(dataToPayment)

    })
    .catch((errors)=>{
        console.log(errors)
        toast.error('tuvimos un inconveniente, intente nuevamente', {
            // autoClose: false,
            position: "top-right",
        });
    })
}


const isEmpty = (e) => {
    if(e.value.trim().length >0) {
        errors[e.name] === undefined && e.classList.contains("errorData") && e.classList.remove("errorData")
        e.classList.add("notEmpty")
    } else {
        e.classList.contains("notEmpty") && e.classList.remove("notEmpty")
    }
}





useEffect(() => {
    !states && fetch('https://apis.datos.gob.ar/georef/api/provincias?')
    .then(res => res.json())
    .catch(error => error)
    .then(response => setStates(response.provincias))

    let formCheckoutLocalDataEncripted = localStorage.getItem('formCheckout');
  
    let elements = watch()
    Object.keys(elements).map(elementName => {

        let element = document.getElementsByName(elementName)

        element[0].addEventListener('change', (e)=>{
            e.stopImmediatePropagation();
            e.preventDefault();
            isEmpty(e.target)
        })

        if(errors[elementName] === undefined) {
            element[0].classList.remove('errorData') 
        }   else {

            element[0].classList.add('errorData')
        }
   
        if (location_params.get('status') === 'rejected' || location_params.get('status') === 'null') {
            let formCheckoutLocalData = formCheckoutLocalDataEncripted && decryptData(formCheckoutLocalDataEncripted, process.env.REACT_APP_ENCRYPT_SECRET_KEY);
            if(formCheckoutLocalData != null && formCheckoutLocalData[elementName]) {
            
                element[0].type === 'select-one' ?
                element[0].value = formCheckoutLocalData[elementName]
                : element[0].setAttribute('value', formCheckoutLocalData[elementName] )
                            
            }
            $('#modalErrorPayment').modal('show')
            isEmpty(element[0])

        }
    })

    return()=>{
        $('#modalErrorPayment').on('hidden.bs.modal',function(e){
        $(this).remove()
        });
    }


}, [location_params])


if(products.length === 0){
    return (
        <>
            <div className='loadingComponent'>
                <p> Cargando productos </p>
                <div className="spinner-grow bounce1" role="status">
                    <span className="sr-only">Cargando Productos</span>
                </div>
                <div className="spinner-grow bounce2" role="status">
                    <span className="sr-only">Cargando Productos</span>
                </div>
                <div className="spinner-grow bounce3" role="status">
                    <span className="sr-only">Cargando Productos</span>
                </div>
            </div>
        </>
    )
}

return (
<>
    {/* ModalError */}
    <ModalError></ModalError>

    <div id="checkout" className="cards-2">
        <div className="container" style={{ textAlign: "center" }}>

            <section>
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card-body mb-2"
                            style={{borderBottomLeftRadius:" 0", borderBottomRightRadius:"0", borderTopLeftRadius:'0.375rem', borderTopRightRadius:'0.375rem'}}>
                            <h3 className="mb-5">Facturación y Pago</h3>


                            <form className="row" id="checkoutForm" onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-12 col-lg-6">
                                    <div className="card-body">
                                        <h4 className="mb-3">Ingrese sus datos </h4>
                                        <div className='row'>
                                            <div className="form-group col-6">
                                                <input className="form-control-input checkout-input" type="text" id="name" name="name"
                                                    ref={register({required: true, minLength: 3, maxLength: 50})} />
                                                <label className="label-control" htmlFor="name">
                                                    Nombre
                                                    {errors.name? <small className="text-muted"> - Incluir 3 letras o
                                                        más </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-6">
                                                <input className="form-control-input checkout-input" type="text" id="surname"
                                                    name="surname" ref={register({required: true, minLength: 3, maxLength:
                                                    80})} />
                                                <label className="label-control" htmlFor="surname">
                                                    Apellido
                                                    {errors.surname? <small className="text-muted"> - Incluir 3 letras
                                                        o más </small> : null }
                                                </label>
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <input type="text" className="form-control-input checkout-input " id="emailCheckout" name="emailCheckout"
                                                ref={register({required: true, pattern: /^\S+@\S+$/i})} />
                                            <label className="label-control" htmlFor="emailCheckout">Email
                                                {errors.emailCheckout? <small className="text-muted"> - Con formato
                                                    ejemplo@mail.com </small> : null }
                                            </label>

                                        </div>

                                        <div className="row">

                                            <div className="form-group col-12 col-sm-6 col-md-6">
                                                <input className="form-control-input checkout-input" id="id" type="text" name="id"
                                                    ref={register({required: true, minLength: 8, maxLength: 8,
                                                    pattern: /[0-9]/i})} />
                                                <label className="label-control" htmlFor="id">DNI
                                                    {errors.id? <small className="text-muted"> - Incluir solo 8
                                                        números </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-12 col-sm-6 col-md-6">
                                                <input type="tel" className="form-control-input checkout-input" id="mobile" name="mobile"
                                                    ref={register({required: true, minLength: 6})} />
                                                <label className="label-control" htmlFor="mobile">Telefono celular
                                                    {errors.mobile? <small className="text-muted"> - Solo números </small> :
                                                    null }
                                                </label>
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                                <select className="form-control-input checkout-input" id="country" name="country"
                                                    ref={register({ required: true })}>
                                                    <option value=""></option>
                                                    <option value="Argentina">Argentina</option>
                                                    {/* <option value="Brasil">Brasil</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="Peru">Peru</option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Venezuela">Venezuela</option> */}
                                                </select>
                                                <label className="label-control" htmlFor="country">País
                                                    {errors.country? <small className="text-muted"> - Seleccione
                                                    </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                            <select className="form-control-input checkout-input" id="state" name="state"
                                                    ref={register({ required: true })}>
                                                    <option value=""></option>
                                                    {
                                                    states && (
                                                        states.map(state=>{
                                                            return (
                                                                <option key={state.id} value={state.id}>{state.nombre}</option>
                                                            )
                                                        })
                                                    )    
                                                    }
                                                        
                                                    
                                                    {/* {states.map((state)=>{
                                                        return(
                                                            <option key={state.id} value={state.id}>{state.nombre}</option>
                                                        )
                                                    })} */}
                                                </select>
                                               
                                                {/* <input type="text" className="form-control-input checkout-input" id="state" name="state"
                                                    ref={register({required: true, minLength: 3})} /> */}
                                                <label className="label-control" htmlFor="state">Provincia
                                                    {errors.state? <small className="text-muted"> - Seleccione
                                                    </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                                <input type="text" className="form-control-input checkout-input" id="city" name="city"
                                                    ref={register({required: true, minLength: 3})} />
                                                <label className="label-control" htmlFor="city">Ciudad
                                                    {errors.city? <small className="text-muted"> - Seleccione
                                                    </small> : null }
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group ">
                                            <input type="text" className="form-control-input checkout-input" id="address" name="address"
                                                ref={register({required: true})} />
                                            <label className="label-control" htmlFor="address">Calle y número
                                                {errors.address? <small className="text-muted"> - No puede estas vacío
                                                </small> : null }
                                            </label>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-7 col-sm-8 mb-0">
                                                <input type="text" className="form-control-input checkout-input" id="address2"
                                                    name="address2" ref={register} />
                                                <label className="label-control" htmlFor="address2">Piso, depto,
                                                    etc.(opcional)
                                                </label>
                                            </div>

                                            <div className="form-group col-5 col-sm-4 mb-0">
                                                <input type="text" className="form-control-input checkout-input" id="cp" name="cp"
                                                    ref={register({required: true, minLength: 4})} />
                                                <label className="label-control" htmlFor="cp">CP
                                                    {errors.cp? <small className="text-muted"> - Min. 4 carácteres </small>
                                                    : null }
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="card-body">
                                        <h5 className="mb-3">Detalle </h5>
                                        <ul className="list-group list-group-flush">
                                            {


                                            cart.map((item, index) => {
                                            return (<li key={index}
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                {item.name}
                                                <span> $ {numberToPrice(item.unitPrice)}</span>
                                            </li>)
                                            })


                                            }

                                        </ul>
                                        <hr className="mb-1">
                                        </hr>
                                        <ul className="list-group list-group-flush">
                                            <li style={{fontWeight: "500"}}
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Subtotal<span>$ {numberToPrice(subtotalCart)}</span></li>
                                            {
                                            promotionalDiscount?
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-left">
                                                Descuento {promotionalDiscount.discount}% (código
                                                {promotionalDiscount.code})<span>
                                                    (${numberToPrice(promotionalDiscount.mount)})</span></li>
                                            :null
                                            }
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Envío<span>Gratis</span></li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div><strong>Monto Total</strong><strong>

                                                    </strong></div>
                                                <span><strong>${promotionalDiscount?numberToPrice(subtotalCart-promotionalDiscount.mount):numberToPrice(subtotalCart)}</strong></span>
                                            </li>
                                        </ul>
                                        
                                        <div className="accordion" id="accordionExample" style={{textAlignLast: "center", height: 'auto'}}>
                                            <div className="" style={{marginBottom: "17px"}}>
                                                <div className="btn btn-link btn-block text-left collapsed card-header collapsed" id="headingOne" type="div"
                                                    data-toggle="collapse" data-target="#collapseOne"
                                                    aria-expanded="false" aria-controls="collapseOne" style={{
                                                        fontSize: "13px",
                                                        fontFamily: 'Montserrat',
                                                        background: '#8f989612',
                                                        color: "black"}}>
                                                        Te redireccionaremos al sitio de Mercado Pago 
                                                    <div className="text-center m-bottom method-logo-wrapper">
                                                        <img alt="Mercado Pago" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/redirect-gateway.svg" className="img-large" style={{width: "60px"}}/>
                                                        <img alt="Mercado Pago" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/mercadopago.svg" className="img-large" style={{width: "60px"}}/>
                                                    </div>
                                                </div>
                                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                                    data-parent="#accordionExample" >
                                                    <div className="checkout-method">
                                                        <div className="row">
                                                            <div className="col p-all text-center mb-2"><span>Podrás elegir uno de los medios de pago debajo.</span>
                                                                <div className="m-top payment-brands">
                                                                    <div className="m-bottom-quarter">Tarjeta de crédito/Débito</div>
                                                                    <img alt="visa" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/visa.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="mastercard" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/mastercard.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="amex" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/amex.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="dinersclub" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/dinersclub.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="cabal" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/cabal.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="argencard" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/argencard.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="tarjeta-naranja" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/tarjeta-naranja.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="nativa" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/nativa.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="tarjeta-shopping" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/tarjeta-shopping.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="cencosud" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/cencosud.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="cabaldebit" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/cabaldebit.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="visadebit" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/visadebit.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="maestro" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/maestro.svg" style={{height: "18px", marginRight: "0px"}}/>
                                                               </div>
                                                                <div className="m-top payment-brands">
                                                                    <div className="m-bottom-quarter">Efectivo</div>
                                                                    <img alt="pagofacil" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/pagofacil.svg" style={{height: "18px", marginRight: "5px"}}/>
                                                                    <img alt="rapipago" src="https://d1zxmlch3z83cq.cloudfront.net/production/2.1.82/_next/server/static/img/brands/rapipago.svg" style={{height: "18px", marginRight: "0px"}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" value="COMPRAR" className="btn-solid-lg waves-effect waves-light btn-block" >
                                          <span>PAGAR A TRAVÉS DE MERCADO PAGO</span>
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>

                    </div>



                </div>
            </section>



        </div>
    </div>


</>

)
}

export default CheckoutContainer