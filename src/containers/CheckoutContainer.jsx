import { MercadoPagoContext } from "../context/MercadoPagoContext";
import React, { useContext, useEffect, useState } from "react";
import { CommercialContext } from "../context/CommercialContext";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ModalError from "../components/ModalError"
import $ from 'jquery'; 


const CheckoutContainer = (props) => {
    
    let location = useLocation()
    let location_params = new URLSearchParams(location.search)
    
    // location_params.get('status') != null && console.log(location_params.get('collection_status'))
    // location_params.get('status') === 'rejected' && console.log('error')

    const [errorPayment, setErrorpayment] = useState(false)
    const {payOnMP} = useContext(MercadoPagoContext)
    const {products, numberToPrice} = useContext(CommercialContext)
    const {cart, subtotalCart, totalCart, promotionalDiscount, addDiscount} = useContext(CartContext)
    const { register, handleSubmit, errors, watch } = useForm();
    const onSubmit = data => {

        localStorage.setItem('formCheckout', JSON.stringify(data))

        const itemsDetail = 
            cart.map(product => { return { 
                title: product.name, 
                description: product.category,
                quantity: product.quantity,
                currency_id: product.currency,
                unit_price: product.unitPrice
             } })
        

        const dataToPayment = {
            items: itemsDetail,
            payer: {
                name: data.name ,
                surname: data.surname ,
                email: data.email ,
                phone:  {
                    number: data.mobile 
                },
                identification:  {
                    number: data.id 
                },
                address:  {
                    street_name: `${data.address} ${data.address2}`,
                    street_number: null,
                    zip_code: data.cp 
                }
            },
            external_reference: `${data.email}`


        }
        // console.log('buyer = ', data,", subtotal = ", subtotalCart, ", discount = ", promotionalDiscount.mount, ", total = ", subtotalCart - promotionalDiscount.mount);
        payOnMP(dataToPayment)
    }


    const isEmpty = (e) => {
        if(e.value.trim().length >0) {
            console.log('a')
            e.classList.contains("errorData") && e.classList.remove("errorData")
            e.classList.add("notEmpty") 

        } else {
            console.log('b')
            e.classList.contains("notEmpty") && e.classList.remove("notEmpty")

        }  
        
    }

    useEffect(() => {
        
        let elements = watch()
        Object.keys(elements).map(elementName => {
            let element = document.getElementsByName(elementName)
            
            errors[elementName] === undefined ? element[0].classList.remove('errorData') : element[0].classList.add('errorData')
            
            
            if (location_params.get('status') == 'rejected' && JSON.parse(localStorage.getItem('formCheckout'))[elementName]){
                element[0].setAttribute('value', JSON.parse(localStorage.getItem('formCheckout'))[elementName] )
                isEmpty(element[0]) 
                console.log(8888)
                
            }
            
        })


        location_params.get('status') == 'rejected' && $('#modalErrorMayment').modal('show')

    }, [errors, location_params])




    // console.log(watch());


    if(products.length == 0){
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

        <div id="services" className="cards-2">
            <div className="container" style={{ textAlign: "center" }}>

                <section>
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="card-body mb-2"
                                style={{borderBottomLeftRadius:" 0", borderBottomRightRadius:"0", borderTopLeftRadius:'0.375rem', borderTopRightRadius:'0.375rem'}}>
                                <h3 className="mb-5">Facturación y Pago</h3>


                                <form className="row" id="checkoutForm" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-12 col-lg-6">

                                        <div className='row'>
                                            <div className="form-group col-6">
                                                <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} className="form-control-input" type="text" id="name" name="name" ref={register({required: true, minLength: 3, maxLength: 80})} />
                                                <label className="label-control" htmlFor="name">
                                                    Nombre
                                                    {errors.name? <small className="text-muted"> - Debe contener 3 letras o más  </small> : null }
                                                    </label>
                                            </div>

                                            <div className="form-group col-6">
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)}  className="form-control-input" type="text" id="surname" name="surname" ref={register({required: true, minLength: 3, maxLength: 80})} />
                                            <label className="label-control" htmlFor="surname">
                                                Apellido 
                                                {errors.name? <small className="text-muted"> - Debe contener 3 letras o más  </small> : null }
                                                </label>
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} className="form-control-input" id="id" type="text" name="id" ref={register({required: true, minLength: 8, maxLength: 11, pattern: /[0-9]/i})} />
                                            <label className="label-control" htmlFor="id">DNI / CUIT
                                            {errors.id? <small className="text-muted"> - Debe contener al menos 8 números  </small> : null }
                                            </label>
                                        </div>

                                        <div className="form-group">
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="email" name="email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
                                            <label className="label-control" htmlFor="email">Email
                                            {errors.email? <small className="text-muted"> - Con formato ejemplo@mail.com  </small> : null }
                                            </label>
                                        </div>

                                        
                                        <div className="row">

                                        <div className="form-group col-12 col-sm-6 col-md-4">
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="tel"  className="form-control-input" id="mobile" name="mobile" ref={register({required: true, minLength: 8})} />
                                            <label className="label-control" htmlFor="mobile">Telefono celular
                                            {errors.mobile? <small className="text-muted"> - Solo números  </small> : null }
                                            </label>
                                        </div>
                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                                <select onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} className="form-control-input" id="country" name="country" ref={register({ required: true })}>
                                                    <option value=""></option>
                                                    <option value="Argentina">Argentina</option>
                                                    <option value="Brasil">Brasil</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="Peru">Peru</option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Venezuela">Venezuela</option>
                                                </select>
                                                <label className="label-control" htmlFor="country">País
                                                {errors.country? <small className="text-muted"> - Seleccione una opción  </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                                <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="state" name="state" ref={register({required: true, min: 3})} />
                                                <label className="label-control" htmlFor="state">Provincia
                                                {errors.state? <small className="text-muted"> - Seleccione una opción  </small> : null }
                                                </label>
                                            </div>

                                            <div className="form-group col-12 col-sm-6 col-md-4">
                                                <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="city" name="city" ref={register({required: true, min: 3})} />
                                                <label className="label-control" htmlFor="city">Ciudad
                                                {errors.city? <small className="text-muted"> - Seleccione una opción  </small> : null }
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group ">
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="address" name="address" ref={register({required: true})} />
                                            <label className="label-control" htmlFor="address">Calle y número
                                            {errors.address? <small className="text-muted"> - No puede estas vacío  </small> : null }
                                            </label>
                                        </div>
                                        <div className="row">

                                            <div className="form-group col-7 col-sm-8">
                                                <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="address2" name="address2" ref={register} />
                                                <label className="label-control" htmlFor="address2">Piso, depto, etc.(opcional)
                                                </label>
                                            </div>

                                            <div className="form-group col-5 col-sm-4">
                                                <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="text"  className="form-control-input" id="cp" name="cp" ref={register({required: true, min: 4})} />
                                                <label className="label-control" htmlFor="cp">CP
                                                {errors.cp? <small className="text-muted"> - Min. 3 carácteres   </small> : null }
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <div className="card-body">
                                            <h5 className="mb-3">Detalle    </h5>
                                            <ul className="list-group list-group-flush">
                                            {
                                                
                                                
                                                cart.map((item, index) => {
                                                    return (<li key={index} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    {item.name} 
                                                    <span> $ {numberToPrice(item.unitPrice)}</span>
                                                    </li>)
                                                })


                                            }

                                            </ul>
                                                <hr className="mb-1"></hr>
                                            <ul className="list-group list-group-flush">
                                                <li
                                                    style={{fontWeight: "500"}}
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Subtotal<span>$ {numberToPrice(subtotalCart)}</span></li>
                                                {
                                                    promotionalDiscount?
                                                    <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-left">
                                                        Descuento  {promotionalDiscount.discount}% (código {promotionalDiscount.code})<span> (${numberToPrice(promotionalDiscount.mount)})</span></li>
                                                    :null
                                                }
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Envío<span>Gratis</span></li>
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div><strong>Monto Total</strong><strong>
                                                            
                                                        </strong></div><span><strong>${promotionalDiscount?numberToPrice(subtotalCart-promotionalDiscount.mount):numberToPrice(subtotalCart)}</strong></span>
                                                </li>
                                            </ul>
                                            <input onBlur={(e) => isEmpty(e.target)}  onChange={(e) => isEmpty(e.target)} type="submit" value="COMPRAR"className="btn-solid-lg waves-effect waves-light btn-block"/>
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
