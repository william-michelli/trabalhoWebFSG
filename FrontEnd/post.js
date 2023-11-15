function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function cadastraCliente() {
    event.preventDefault()
    let url = "http://localhost:3000/clientes"

    let codigoCliente = document.getElementById("codigoCliente");
    let nome = document.getElementById("nome");
    let rua = document.getElementById("rua");
    let numero = document.getElementById("numero");
    let cepomplemento = document.getElementById("complemento");
    let bairro = document.getElementById("bairro");
    let cidade = document.getElementById("cidade");
    let uf = document.getElementById("uf");
    let cep = document.getElementById("cep");


    body = {
        "codigo" : codigoCliente,
        "nome": nome,
        "rua": rua,
        "numero": numero,
        "complemento": complemento,
        "bairro": bairro,
        "cidade": cidade,
        "uf": uf,
        "cep": cep
    }

    fazPost(url, body)

    window.location.href = "index.html";
}