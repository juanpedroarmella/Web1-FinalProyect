/*--- Funciones compartidas por todos los html ---*/
document.addEventListener('DOMContentLoaded', function(){
    "use strict";
    /*--- Mostrar/Ocultar Menú---*/
    document.querySelector("#btn_menu").addEventListener("click",function(){
        document.querySelector(".navigation").classList.toggle("show");
        
    });
});









