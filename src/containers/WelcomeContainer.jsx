import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import ReactTextRotator from "react-text-rotator";
import { CartContext } from "../context/CartContext";
import { getFireStorage } from "../firebase";
import $ from 'jquery'

const WelcomeContainer = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { cart } = useContext(CartContext)
    const { innerWidth: width, innerHeight: height } = window;

    


    useEffect(() => {

        setIsLoading(true)

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(()=>resolve(true), 1000)
        })

        myPromise.then(
            (result)=>{

                setIsLoading(false);
            }
        )

    }, [])




    if (isLoading) {
        return (
            <>
                {/* <!-- Preloader --> */}
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            </>
        )
    }

    
    return (
        <>

        {/* <!-- Page Wrapper --> */}
            <div id="wrapper" className="pt-5">

                {/* <!-- Sidebar --> */}

                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column pt-5">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container">

                            {/* <!-- Page Heading --> */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Mi perfil</h1>
                                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm bg-principal br-principal"><i
                                        className="fas fa-download fa-sm "></i> Generar Reporte</a>
                            </div>

                            {/* <!-- Content Row --> */}
                            <div className="row">

                                {/* <!--  Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-principal text-uppercase mb-1">
                                                        PRÓXIMO TURNO</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">sin turno</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-principal text-uppercase mb-1">
                                                        compras</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$0,00</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-principal text-uppercase mb-1">Objetivos
                                                    </div>
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col-auto">
                                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="progress progress-sm mr-2">
                                                                <div className="progress-bar " role="progressbar"
                                                                    style={{width: "50%", background:"var(--primary)"}} aria-valuenow="50" aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Pending Requests Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-principal text-uppercase mb-1">
                                                        consultas</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Content Row --> */}

                            <div className="row">

                                {/* <!-- Area Chart --> */}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4">
                                        {/* <!-- Card Header - Dropdown --> */}
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-principal">Últimas mediciones</h6>
                                            <div className="dropdown no-arrow">
                                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Card Body --> */}
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <canvas id="myAreaChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Pie Chart --> */}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="card shadow mb-4">
                                        {/* <!-- Card Header - Dropdown --> */}
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-principal">Composicion Corporal</h6>
                                            <div className="dropdown no-arrow">
                                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Card Body --> */}
                                        <div className="card-body">
                                            <div className="chart-pie pt-4 pb-2">
                                                <canvas id="myPieChart"></canvas>
                                            </div>
                                            <div className="mt-4 text-center small">
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-principal"></i> Direct
                                                </span>
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-principal"></i> Social
                                                </span>
                                                <span className="mr-2">
                                                    <i className="fas fa-circle text-principal"></i> Referral
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Content Row --> */}
                            <div className="row">

                                {/* <!-- Content Column --> */}
                                <div className="col-lg-6 mb-4">

                                    {/* <!-- Project Card Example --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-principal">Composicin Corporal</h6>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="small font-weight-bold">Masa Adiposa <span
                                                    className="float-right">20%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-principal" role="progressbar" style={{width: "20%"}}
                                                    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Masa de Piel <span
                                                    className="float-right">10%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-principal" role="progressbar" style={{width: "10%"}}
                                                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Masa Ósea <span
                                                    className="float-right">20%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-principal" role="progressbar" style={{width: "20%"}}
                                                    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Masa Residual <span
                                                    className="float-right">15%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-principal" role="progressbar" style={{width: "15%"}}
                                                    aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Masa Mucular <span
                                                    className="float-right">40%</span></h4>
                                            <div className="progress">
                                                <div className="progress-bar bg-principal" role="progressbar" style={{width: "40%"}}
                                                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-6 mb-4">

                                    {/* <!-- Illustrations --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-principal">Últimas Recomendaciones</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}}
                                                    src="img/undraw_posting_photo.svg" alt=""/>
                                            </div>
                                            <p>klajdkasjdlkajsdk ajslkdjalksdj aslkd alsdk alskdj; asldk; alskd;al skd;laskd  <a
                                                    target="_blank" rel="nofollow" href="#">lalalal</a>, a
                                                sdfSDFsdfmhsba dgfdsajhg kadjfhg kajdfhvkjzlxckvjzxclkvjhzxlckjv zxkjh !</p>
                                            <a target="_blank" rel="nofollow" href="#">Ver mas &rarr;</a>
                                        </div>
                                    </div>

                                    {/* <!-- Approach --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-principal">Tips Nutricionales</h6>
                                        </div>
                                        <div className="card-body">
                                            <p>zxf,vkjzdfnvlkjxnczvnzdkflbjv nzdkf;jnbzcfbzdf bxzcbz xbcxzvzxv 
                                                xcv xzcv zxcv vxcvxcv bzcx bxcv bxcvbcx vbc xvb 
                                                cvb cxvbcvbxcvbxcvbxcvbxcvbcvb.</p>
                                            <p className="mb-0">dfgvxcbcxv,bmxnvc ,nb vnvbnvcbnvc nvcb nvcbn vbn vbnvbn vbnc vbn vbn 
                                             fcb cxvbcvb xcvb xcvb xcvbxcvbcxvbxcvbcv</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <footer className="sticky-footer bg-white">
                        <div className="my-auto">
                            <div className="copyright text-center my-auto text-white">
                                <span>Copyright &copy; JPL Nutrición 2021</span>
                            </div>
                        </div>
                    </footer>
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            {/* <!-- End of Page Wrapper --> */}
 
        </>
    )
}

export default WelcomeContainer
