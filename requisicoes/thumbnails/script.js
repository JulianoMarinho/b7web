//metodo sincrono

function mostrar() {
    let imagem = document.getElementById("imagem").files[0];
    
    let img = document.createElement('img'); //gerar a partir dele uma url
    img.src = URL.createObjectURL(imagem); //passando um file para dentro da tag
    img.width = 200; //diminuir o tamanho da imagem

    document.getElementById("area").appendChild(img);
}

//metodo assincrono

function mostrar2() {
    let reader = new FileReader();
    let imagem = document.getElementById("imagem2").files[0];

    
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            img.width = 200;

            document.getElementById('area2').appendChild(img);
        }
   
 
        reader.readAsDataURL(imagem); //usa o reader para ler a imagem
    
}