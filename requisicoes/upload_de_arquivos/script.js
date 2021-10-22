async function enviar() {
    let arquivo = document.getElementById('arquivo').files[0];

    //para enviar arquivos, temos que usar o formData
    let body = new FormData();
    body.append('title', 'bla bla bla');
    body.append('arquivo', arquivo);

    //para fazer upload do arquivo
    let req = await fetch('https://www.meusite.com.br/upload', {
        method: 'POST',
        body: body,
        //por estarmos enviando arquivos, precisamos mudar o content tipe
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    });
}