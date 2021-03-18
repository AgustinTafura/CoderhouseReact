import './style.scss';



const ModalError = () => {
    return (
        <>
           <div id="modalErrorPayment" className="modal fade">
               <div className="modal-dialog modal-confirm">
                   <div className="modal-content">
                       <div className="modal-header">

                               <i className="fas fa-exclamation-circle" ></i>

                           <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                       </div>
                       <div  className="modal-body text-center">
                           <h4>Ooops!</h4>
                           <p>Hubo un error con el pago.</p>
                           <p>No te preocupes, puedes volver a intentarlo.</p>
                           <button className="btn-solid-lg waves-effect waves-light" data-dismiss="modal">Volver a Intentarlo</button>
                           
                       </div>
                   </div>
               </div>
           </div>
        </>
    )
}

export default ModalError

