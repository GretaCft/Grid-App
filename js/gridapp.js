let arrNum = [];

function respuesta() {  
    let str = document.getElementById("str").value.trim();
    let arrStr = str.split(","); 
    resultado(arrStr);
};

function limpiar(){
    $("#str").val("");
    $("#respuesta").html("");
    arrNum = [];
}

//Validando entradas

function validar(arrString){
    let intRegex = /^\d+$/;

    for(let i = 0; i < arrString.length; i++){
        let item = arrString[i];
        let int= parseInt(item);

            if(intRegex.test(item) && int >=0 && int <= 99){
                arrNum.push(int);
            }else{    
                arrNum = [];
                break;
            }; 
    };
    if(arrNum.length > 0){ 
        //console.log("Resultado de validar"+ arrNum);
        return arrNum}; 
}

//Ordenar array

function ordenar(arrO){ 
    let ordenado = arrO.sort((a, b) => a - b); 
    return ordenado;
};

//Eliminar repetidos en array

function eliminarRep(arrU){ 
    let unico = arrU.filter ((value, index, array) => { 
    return array.indexOf(value) == index;
  });
    return unico;
};

//Selección de casillas que pueden ser adyacentes cuya diferencia entre ellas es de 1 o 10

function select(arrFilt){
    let res =[];
        for (let j=0; j < arrFilt.length; j++){     
            for (let i=0; i < arrFilt.length; i++){
                if(arrFilt[i] - arrFilt[j] ===1 || arrFilt[i] - arrFilt[j] === 10
                ||arrFilt[i] - arrFilt[j] ===-1 || arrFilt[i] - arrFilt[j] === -10 ){  
                res.push(arrFilt[i]);  
                res.push(arrFilt[j]);                        
                }  
            }
        }
    return res;
};

// Agrupar en varios arrays las casillas adyacentes 

function agrupar(arrayAgrupar){
    let arraySinMax = arrayAgrupar.reduce((prev, act, i, ar) => {
        if (ar[i - 1] + 10 >= act) {
            prev[prev.length - 1].push(act);
        } else {
            prev.push([act]);
        }
        return prev;
    }, []);
    return arraySinMax;
};

//Determinar número máximo de casillas adyacentes

function max(arraySinMax){    
    let arrayMax =[];
    for (let a = 0; a < arraySinMax.length; a++) {
            arrayMax.push(arraySinMax[a].length);
        }
    let maximo = Math.max.apply(null, arrayMax);
    return maximo;
};

//Procesar respuesta
function resultado(array){
        let validado = validar(array);
        if(validado && validado.length > 1){
            let seleccionado = select(validado);
            let eliminarRepe = eliminarRep(seleccionado);
            let ordenadoSelect = ordenar(eliminarRepe);
            let agrupado = agrupar(ordenadoSelect);
            let maximo = max(agrupado);
            $("#respuesta").html(`La cantidad máxima de casillas negras adyacentes es: <br/> ${maximo}`);
        }else if(validado && validado.length == 1){
            $("#respuesta").html("La cantidad máxima de casillas negras adyacentes es: <br/> 1");
        }else{        
        $("#respuesta").html("Introduzca un número válido.");
                    $("#str").val("");
        }
    }

$(function(){
    $("#btnRespuesta").click(respuesta);  
    $("#btnLimpiar").click(limpiar);  
})