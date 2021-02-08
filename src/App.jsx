import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './components/navBar';
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer';

const App = () => {

  return (
    <>
    
    <NavBarComponent />
    <main>
        <ItemDetailContainer/>
        <ItemListContainer/>
    </main>
    {/* <!-- Header --> */}
    <header id="header" className="header" >
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-container">
                            <h1>BUSINESS <span id="js-rotating">TEMPLATE, SERVICES, SOLUTIONS</span></h1>
                            <p className="p-heading p-large">Aria is a top consultancy company specializing in business growth using online marketing and conversion optimization tactics</p>
                            <a className="btn-solid-lg page-scroll" href="#intro">DISCOVER</a>
                        </div>
                    </div> 
                    {/* <!-- end of col --> */}
                </div> 
                {/* <!-- end of row --> */}
            </div> 
            {/* <!-- end of container --> */}
        </div> 
        {/* <!-- end of header-content --> */}
    </header> 
    {/* <!-- end of header --> */}
    
    {/* <!-- end of header --> */}



    </>

  );
}

export default App;
