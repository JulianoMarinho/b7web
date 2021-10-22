//callback 
function alertar(){
    alert('opa, tudo bem?');
}

setTimeout(alertar, 2000);

//Promices

function pegarTemperatura() {
    return new Promise(function(resolve, reject) {
        console.log("pegando temperatura...");

        setTimeout(function(){
            resolve('40 na sombra');
        }, 2000);
    });
}

//USANDO a PROMISE
let temp =  pegarTemperatura();
temp.then(function(resultado){
    console.log("TEMPERATURA: "+resultado)
});
temp.catch(function(error){
    console.log("Eita, deu erro");
})