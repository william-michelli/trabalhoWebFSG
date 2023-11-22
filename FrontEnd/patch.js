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
    event.preventDefault()

    let codigoCliente = document.getElementById("codigoCliente").value;
    let nome = document.getElementById("nome").value;
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let uf = document.getElementById("uf").value;
    let cep = document.getElementById("cep").value;

    let url = "http://localhost:3000/clientes/" + codigoCliente; 

   
    body = {
        "id" : codigoCliente,
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
