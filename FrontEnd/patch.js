function fazPatch(url, body, codigoCliente) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("PATCH", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function atualizaCliente() {
    /* Já temos os dados na página.
       Podemos alterar o nome, a idade e a UF.
    */
    event.preventDefault()

    let codigoCliente = document.getElementById("codigoCliente");
    let nome = document.getElementById("nome");
    let rua = document.getElementById("rua");
    let numero = document.getElementById("numero");
    let cepomplemento = document.getElementById("complemento");
    let bairro = document.getElementById("bairro");
    let cidade = document.getElementById("cidade");
    let uf = document.getElementById("uf");
    let cep = document.getElementById("cep");

    let url = "http://localhost:3000/clientes/" + codigoCliente; 

   
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

    fazPatch(url, body, codigoCliente)

    window.location.href = "index.html";
}
