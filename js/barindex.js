/*--- Buscador para index (lo hicimos separado por un tema de rutas)---*/
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector("#search").addEventListener("click",function(){
        let elem=document.querySelector("#bar").value;
        switch (elem){
        case "ashe":
        case "Ashe":
            window.location.href = "html/ashe.html";
        break;
        case "darius":
        case "Darius":
            window.location.href = "html/darius.html";
        break;
        case "veigar":
        case "Veigar":
            window.location.href = "html/veigar.html";
        break;
        case "amummu":
        case "Amummu":
            window.location.href = "html/amummu.html";
        break;
        default:
            document.querySelector("#bar").value="Campeon inválido!";
        }

    })
})