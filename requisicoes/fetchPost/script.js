async function inserirPost () {
    document.getElementById("posts").innerHTML = 'Carregando...';

    let req = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', //fazer uma requisicao do tipo post
        body: JSON.stringify({
            title: 'Titulo de teste',
            body: 'corpo de teste',
            userID: 4
        }),
        headers: {
            'Content-Type': 'application/json'
        } //enviando estes dados aqui
    });
    let json = await req.json();

    console.log(json);
}