function fazGetId(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function atualizaPagina(cliente) {

    let txtCodigo = document.getElementById("codigoCliente");
    let txtNome = document.getElementById("nome");
    let txtRua = document.getElementById("rua");
    let txtNumero = document.getElementById("numero");
    let txtComplemento = document.getElementById("complemento");
    let txtBairro = document.getElementById("bairro");
    let txtCidade = document.getElementById("cidade");
    let txtUf = document.getElementById("uf");
    let txtCep = document.getElementById("cep");

    txtCodigo.value = cliente.codigo;
    txtNome.value = cliente.nome;
    txtRua.value = cliente.rua;
    txtNumero.value = cliente.numero;
    txtComplemento.value = cliente.complemento;
    txtBairro.value = cliente.bairro;
    txtCidade.value = cliente.cidade;
    txtUf.value = cliente.uf;
    txtCep.value = cliente.cep;

}

function get() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoCliente = urlParams.get("codigo");

    let data = fazGetId("http://localhost:3000/clientes/"+codigoCliente);
    let cliente = JSON.parse(data);
    atualizaPagina(cliente);
}
