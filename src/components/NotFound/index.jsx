import './style.scss';
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import $ from 'jquery'

const NotFound = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { innerWidth: width, innerHeight: height } = window;
    const history = useHistory() 
    
    
    
    
    document.addEventListener('DOMContentLoaded', function() {
      (function ($) {
        $(function () {
          $().ready(function () {
            (function () {
              var requestAnimationFrame =
                window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
              window.requestAnimationFrame = requestAnimationFrame;
            })();
            var canvas = document.getElementById("canvas-404");
            if (canvas === null) return;
            setTimeout(function () {
              $(".js-toaster_lever").delay(200).animate({ top: 30 }, 100);
              $(".js-toaster_toast")
                .removeClass("js-ag-hide")
                .addClass("js-ag-animated js-ag-bounce-in-up");
            }, 800);
            var ctx = canvas.getContext("2d"),
              loading = true;
      
            canvas.height = 210;
            canvas.width = 300;
      
            var parts = [],
              minSpawnTime = 100,
              lastTime = new Date().getTime(),
              maxLifeTime = Math.min(6000, (canvas.height / (1.5 * 60)) * 1000),
              emitterX = canvas.width / 2 - 50,
              emitterY = canvas.height - 10,
              smokeImage = new Image();
      
            function spawn() {
              if (new Date().getTime() > lastTime + minSpawnTime) {
                lastTime = new Date().getTime();
                parts.push(new smoke(emitterX, emitterY));
              }
            }
            function render() {
              if (loading) {
                load();
                return false;
              }
              var len = parts.length;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              while (len--)
                if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
                  parts.splice(len, 1);
                } else {
                  parts[len].update();
                  ctx.save();
                  var offsetX = -parts[len].size / 2,
                    offsetY = -parts[len].size / 2;
                  ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
                  ctx.rotate((parts[len].angle / 180) * Math.PI);
                  ctx.globalAlpha = parts[len].alpha;
                  ctx.drawImage(
                    smokeImage,
                    offsetX,
                    offsetY,
                    parts[len].size,
                    parts[len].size
                  );
                  ctx.restore();
                }
              spawn();
              requestAnimationFrame(render);
            }
            function smoke(x, y, index) {
              this.x = x;
              this.y = y;
              this.size = 1;
              this.startSize = 60;
              this.endSize = 69;
              this.angle = Math.random() * 359;
              this.startLife = new Date().getTime();
              this.lifeTime = 0;
              this.velY = -1 - Math.random() * 0.5;
              this.velX = Math.floor(Math.random() * -6 + 3) / 10;
            }
            smoke.prototype.update = function () {
              this.lifeTime = new Date().getTime() - this.startLife;
              this.angle += 0.2;
              var lifePerc = (this.lifeTime / maxLifeTime) * 100;
              this.size =
                this.startSize + (this.endSize - this.startSize) * lifePerc * 0.1;
              this.alpha = 1 - lifePerc * 0.01;
              this.alpha = Math.max(this.alpha, 0);
              this.x += this.velX;
              this.y += this.velY;
            };
            smokeImage.src = document.getElementsByTagName("img")[1].src;
            console.log(smokeImage.src)
            smokeImage.onload = function () {
              loading = false;
            };
            function load() {
              if (loading) {

                setTimeout(load, 1000);
              } else {

                render();
              }
            }
      
            render();
          });
        });
      })($);

    })            
    
    
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
            <div className="ag-page-404">
                <h5 className="text-center" style={{fontFamily: "Montserrat"}} >PÁGINA NO ENCONTRADA</h5>
                <div className="ag-toaster-wrap">
                    <div className="ag-toaster">
                        <div className="ag-toaster_back"></div>
                        <div className="ag-toaster_front">
                            <div className="js-toaster_lever ag-toaster_lever"></div>
                        </div>
                        <div className="ag-toaster_toast-handler">
                            <div className="ag-toaster_shadow"></div>
                            <div className="js-toaster_toast ag-toaster_toast js-ag-hide"></div>
                        </div>
                    </div>

                    <canvas id="canvas-404" className="ag-canvas-404"></canvas>
                    <img className="ag-canvas-404_img"
                        src="/images/smoke.png"/>
                </div>
            </div>

            <div className="container mt-5" >
              <div className="row  justify-content-center justify-content-md-around">
              <Link className="btn btn-solid-lg btn-dark d-md-inline-block d-sm-block  col-8 col-md-3 " to='#' onClick={history.goBack} >Volver</Link>
              <Link className="btn btn-solid-lg btn-dark d-md-inline-block d-sm-block  mt-3 mt-md-0 col-8 col-md-3" to='/'>Ir al Inicio</Link>

              </div>

            </div>
        </>
    )
}

export default NotFound
