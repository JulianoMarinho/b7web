//Usando fetch


/*O fetch tem 2 parâmetros, o primeiro é a URL, o segundo parâmetro é opcional
poe la um objeto, e nesse objeto vc poe as configurações da requisição, no caso
o metodo, post ou get, por exemplo. Se vc nao por esse parametro, ele vai fazer a 
requisição get (pega as informações e dê elas)*/

//fetch padrao:

/*function loadPosts() {
    document.getElementById("posts").innerHTML = 'Carregando...';

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(resultado) {
            //essa função do fetch retorna uma promice, entao precisa ter outro then
            return resultado.json();
        })
        .then(function(json){
            montarBlog(json);

            //document.getElementById("posts").innerHTML = json.length+ ' posts';
        })
        .catch(function(error){
            console.log('Deu problema');
        });

}

function montarBlog(lista) {
    let html = '';

    for(let i in lista){
        html += '<h3>' +lista[i].title+ '</h3>';
        html += lista[i].body+ '<br/>';
        html += '<hr/>';
    }
    document.getElementById("posts").innerHTML = html;
}*/

//Async e Await
//este async no nome da funcao vai dizer que, dentro da funcao, vamos estar usando o await
async function loadPosts() {
    document.getElementById("posts").innerHTML = 'Carregando...';
    //fez a requisicao
    let req = await fetch('https://jsonplaceholder.typicode.com/posts');
    //transformou em json (executa, para a requisicao)
    let json = await req.json();

    //enviou para a funcao montar blog
    montarBlog(json);
   
}

function montarBlog(lista) {
    let html = '';

    for(let i in lista){
        html += '<h3>' +lista[i].title+ '</h3>';
        html += lista[i].body+ '<br/>';
        html += '<hr/>';
    }
    document.getElementById("posts").innerHTML = html;
}