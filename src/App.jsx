import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './components/navBar';
import ItemListContainer from './containers/ItemListContainer'

const App = () => {

  return (
    <>
    <NavBarComponent />
    <main>
        <ItemListContainer/>
    </main>




    </>

  );
}

export default App;
