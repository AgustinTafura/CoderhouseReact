import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import ItemListContainer from '../../containers/itemListContainer';


const CartWidgetComponent = () => {
  
  return (

    <>
        < ItemListContainer href="cart.html">
            <i class="material-icons">shopping_cart</i>
        </ItemListContainer>
    </>


  );
}

export default CartWidgetComponent;
