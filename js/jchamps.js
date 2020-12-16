    /*--- Tabla Dinámica ---*/
document.addEventListener("DOMContentLoaded",function(){
    "use strict";
    let url="https://web-unicen.herokuapp.com/api/groups/112armellagonzalez/coleccion";
    /*--- Capcha---*/
    showrandom();
    document.querySelector("#send").addEventListener("click",function(){
        let capcha=document.querySelector("#capcha").innerHTML;
        let userinput=document.querySelector("#inputcapcha").value;
        if (userinput===capcha)
            document.querySelector("#isvalid").innerHTML="Capcha válido,formulario enviado";
        else
            document.querySelector("#isvalid").innerHTML="Capcha inválido,formulario no enviado";
        showrandom();
    });
    function showrandom(){
        let inumber=Math.random().toString(36).substr(2, 7);
        document.querySelector("#capcha").innerHTML=inumber;
    }
    /*--Carga de elementos desde la api---*/
    loadata();
    function loadata(){
        fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(json) {
            for(let i=0;i<json.coleccion.length;i++){
                addchamp(json.coleccion[i].thing);
            }

            document.querySelector("#statusvalid").innerHTML="Tabla cargada correctamente"
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexión";
        })
    }
    function addchamp(arr){
        /*--Genera los elementos del tbody---*/
        let table= document.querySelector("#bodytable");
        for(let i=0;i<arr.length;i++){
            let tr= document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let a1,href1;
            if (arr[i].link!=null){
                a1= document.createElement("a"); 
                href1=document.createAttribute("href");
            }
            /*--Extrae datos del champ---*/
            if (arr[i].link!=null){
                a1.innerText = arr[i].name;
                href1.value= arr[i].link;
            }else
                td1.innerText = arr[i].name;
            td2.innerText = arr[i].type;
            td3.innerText = arr[i].difficulty;
            td4.innerText = arr[i].price;
            
            /*---Modifica el html---*/
            if (arr[i].link!=null){
                tr.appendChild(td1);
                a1.setAttributeNode(href1); 
                td1.appendChild(a1); /*-- <td><a1 href="../html/example.html">Name<a1><td> --*/
            }else
            {
                tr.appendChild(td1);
            }
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);


            table.appendChild(tr);
            /* Colorea si es un champ dificil*/
            if (arr[i].difficulty=="Dificil")
                td3.classList.add("hard");
        }
        
            
    }
    /* Generar Campeon Rapidamente */
    document.querySelector("#btn_quickchamp").addEventListener("click",function(){
        let randominfo1 = {
            "thing":[
                {         
                    "name":"Gnar",
                    "type":"Luchador",
                    "difficulty":"Dificil",
                    "price":6300,
                }
            ]
        };
        let randominfo2 = {
            "thing":[    
                {
                    "name":"Diana",
                    "type":"Asesino",
                    "difficulty":"Facil",
                    "price":4800,
                }
            ]
        };
        let randominfo3 = {
            "thing":[
                {
                    "name":"Kai Sa",
                    "type":"Tirador",
                    "difficulty":"Facil",
                    "price":6300,
                }
            ]
        };
        fetch(url,{
            "method":"POST",
            "mode":"cors",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(randominfo1)
        })
        .then(function(r){
            fetch(url,{
            "method":"POST",
            "mode":"cors",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(randominfo2)
            })
            .then(function(r){
                fetch(url,{
                "method":"POST",
                "mode":"cors",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(randominfo3)
                })
                .then(function(r){
                    addchamp(randominfo1.thing);
                    addchamp(randominfo2.thing);
                    addchamp(randominfo3.thing);
                    document.querySelector("#statusvalid").innerHTML="Campeones generados correctamente"
                })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexión del tercer agregado";
                });
            })
            .catch(function(e){
                document.querySelector("#statusvalid").innerHTML="Error de conexión del segundo agregado";
            });
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexión del primer agregado";
        });
        
    });
    /* Borrar Tabla */
    document.querySelector("#btn_delete").addEventListener("click",function(){
        fetch(url)
        .then(function(r){
            return r.json();    
        })
        .then(function(json){
            for(let i=0;i<json.coleccion.length;i++){
                fetch(url + "/" + json.coleccion[i]._id,{
                    "method":"DELETE",
                    "mode":"cors",
                    "headers": { "Content-Type": "application/json" },
                })
                .then(function(r){
                    let table= document.querySelector("#bodytable");
                    let last =table.childElementCount;
                    for (let i=0; i<last;i++)
                        table.removeChild(table.firstElementChild);
                    document.querySelector("#statusvalid").innerHTML="Tabla borrada correctamente"
                })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexión";
                })
            }  
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexión";
        })
    })
    /* Crear Campeon */
    document.querySelector("#send").addEventListener("click",function(){
        let champ={
            "thing":[{
                "name":document.querySelector("#name").value,
                "type":document.querySelector("#type").value,
                "difficulty":document.querySelector("#difficulty").value,
                "price":document.querySelector("#price").value,
            }]
        };
        let validation=document.querySelector("#isvalid").innerHTML;
        if (validation==="Capcha válido,formulario enviado"){
            fetch(url,{
                "method":"POST",
                "mode":"cors",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(champ)
                })
                .then(function(r){
                    addchamp(champ.thing);
                    document.querySelector("#statusvalid").innerHTML="Campeón agregado correctamente"
                })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexión";
            });
        }
            
    })
    /* Eliminar fila determinada */
    document.querySelector("#btndeleteone").addEventListener("click",function(){
        fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(json) {
            let arr_id=[];
            for(let i=0;i<json.coleccion.length;i++){
                let id=json.coleccion[i]._id;
                arr_id.push(id);
            }
            let fila=document.querySelector("#inputdelete").value;
            let table=document.querySelector("#bodytable");
            if (fila>0 && fila<=table.childElementCount){
                document.querySelector("#statusvalid").innerHTML=""
                fetch(url + arr_id[fila-1],{
                        "method":"DELETE",
                        "mode":"cors",
                        "headers": { "Content-Type": "application/json" },
                    })
                .then(function(r){
                        table.removeChild(table.childNodes[fila]);
                        document.querySelector("#statusvalid").innerHTML="Fila eliminada con éxito"
                    })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexión";
                })
            } 
            else{
                    document.querySelector("#statusvalid").innerHTML="Fila inválida"
                }
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexión";
        })
        
    })
    /* Editar filas*/
    document.querySelector("#btn_editar").addEventListener("click",function(){
        fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(json) {
            //Guardo todos los ids actuales en un arreglo
            let arr_id=[];
            for(let i=0;i<json.coleccion.length;i++){
                let id=json.coleccion[i]._id;
                arr_id.push(id);
            }
            let fila=document.querySelector("#input_edit").value;
            let table=document.querySelector("#bodytable");
            if (fila>=0 && fila<=table.childElementCount){
                let edit={
                    "thing":[{
                        "name":document.querySelector("#name_edit").value,
                        "type":document.querySelector("#type_edit").value,
                        "difficulty":document.querySelector("#difficulty_edit").value,
                        "price":document.querySelector("#price_edit").value,
                    }]
                }
                fetch(url + "/" + arr_id[fila-1],{
                        "method":"PUT",
                        "mode":"cors",
                        "headers": { "Content-Type": "application/json" },
                        "body": JSON.stringify(edit)
                    })
                .then(function(r){
                    editarfila(fila,table,edit);
                    document.querySelector("#statusvalid").innerHTML="Fila editada con éxito"
                })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexión";
                })
            } 
            else{
                    document.querySelector("#statusvalid").innerHTML="Fila inválida"
                }
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexión"
        })
        
    })
    function editarfila(fila,table,edit){
        table.childNodes[fila].childNodes[0].innerHTML=edit.thing[0].name;
        table.childNodes[fila].childNodes[1].innerHTML=edit.thing[0].type;
        table.childNodes[fila].childNodes[2].innerHTML=edit.thing[0].difficulty;
        table.childNodes[fila].childNodes[3].innerHTML=edit.thing[0].price;
    }
    /*Filtrar*/
    document.querySelector("#btn_filtrar_campeon").addEventListener("click",function(){
        let inputuser=document.querySelector("#input_filtrar_campeon").value;
        let colum=0;
        filtrar(inputuser,colum);
    });
    document.querySelector("#btn_filtrar_tipo").addEventListener("click",function(){
        let inputuser=document.querySelector("#input_filtrar_tipo").value;
        let colum=1;
        filtrar(inputuser,colum);
    });
    document.querySelector("#btn_filtrar_dificultad").addEventListener("click",function(){
        let inputuser=document.querySelector("#input_filtrar_dificultad").value;
        let colum=2;
        filtrar(inputuser,colum);
    });
    document.querySelector("#btn_filtrar_precio").addEventListener("click",function(){
        let inputuser=document.querySelector("#input_filtrar_precio").value;
        let colum=3;
        filtrar(inputuser,colum);
    });
    function filtrar(inputuser,colum){
        let table=document.querySelector("#bodytable");
        for(let i=1;i<=table.childElementCount;i++){
            if (inputuser!=table.childNodes[i].childNodes[colum].innerText){
                table.removeChild(table.childNodes[i]);
                i--;
            }
                
        }
    }
/*Volver a agregar los datos predeterminados*/
    document.querySelector("#btn_predet").addEventListener("click",function(){
        let data1 = {
            "thing": [{
                    "name": "Ashe",
                    "type": "Tirador",
                    "difficulty": "Facil",
                    "price": 150,
                    "link": "../html/ashe.html",
            }]
        };
        let data2 = {
            "thing": [{
                    "name": "Veigar",
                    "type": "Mago",
                    "difficulty": "Normal",
                    "price": 1350,
                    "link": "../html/veigar.html",
            }]
        };
        let data3 = {
            "thing": [{
                    "name": "Darius",
                    "type": "Luchador",
                    "difficulty": "Dificil",
                    "price": 4800,
                    "link": "../html/darius.html",
            }]
        }
        let data4 = {
            "thing": [{
                    "name": "Amummu",
                    "type": "Tanque",
                    "difficulty": "Dificil",
                    "price": 450,
                    "link": "../html/ammumu.html"
            }]
        };
        fetch(url,{
            "method":"POST",
            "mode":"cors",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(data1)
        })
        .then(function(r){
            fetch(url,{
                "method":"POST",
                "mode":"cors",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data2)
            })
            .then(function(r){
                fetch(url,{
                    "method":"POST",
                    "mode":"cors",
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(data3)
                })
                .then(function(r){
                    fetch(url,{
                        "method":"POST",
                        "mode":"cors",
                        "headers": { "Content-Type": "application/json" },
                        "body": JSON.stringify(data4)
                    })
                    .then(function(r){
                        document.querySelector("#statusvalid").innerHTML="Elementos predeterminados cargados correctamente";
                        loadata();
                    })
                    .catch(function(e){
                        document.querySelector("#statusvalid").innerHTML="Error de conexion"
                    });
                })
                .catch(function(e){
                    document.querySelector("#statusvalid").innerHTML="Error de conexion"
                });
            })
            .catch(function(e){
                document.querySelector("#statusvalid").innerHTML="Error de conexion" 
            });
        })
        .catch(function(e){
            document.querySelector("#statusvalid").innerHTML="Error de conexion"
        });
        
    });
    /*Restaurar tabla*/
    document.querySelector("#btn_restaurar").addEventListener("click",function(){
        let table=document.querySelector("#bodytable");
        let frontera=table.childElementCount;
        for (let i=0; i<frontera;i++)
            table.removeChild(table.firstElementChild);
        loadata();
    });

    /*--- Mostrar/Ocultar formulario---*/
    document.querySelector("#buttonform").addEventListener("click",function(){
        document.querySelector("form").classList.toggle("hideform");
        document.querySelector("form").classList.toggle("select");
        
    });

});
    