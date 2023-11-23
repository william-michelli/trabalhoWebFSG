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

    txtCodigo.value = cliente[0].id;
    txtNome.value = cliente[0].nome;
    txtRua.value = cliente[0].rua;
    txtNumero.value = cliente[0].numero;
    txtComplemento.value = cliente[0].complemento;
    txtBairro.value = cliente[0].bairro;
    txtCidade.value = cliente[0].cidade;
    txtUf.value = cliente[0].uf;
    txtCep.value = cliente[0].cep;

}

function get() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoCliente = urlParams.get("id");

    let data = fazGetId("http://localhost:3000/clientes/"+codigoCliente);
    let cliente = JSON.parse(data);
    atualizaPagina(cliente);
}



//PRODUTO ///////////////////////////

function atualizaPaginaProduto(produto) {
    let txtCodigo = document.getElementById("codigoProduto");
    let txtDescricao = document.getElementById("descricao");
    let txtPreco = document.getElementById("preco");
    let txtImagem = document.getElementById("url_imagem");

    txtCodigo.value = produto[0].produto_id;
    txtDescricao.value = produto[0].descricao;
    txtPreco.value = produto[0].preco;
    txtImagem.src = produto[0].url_imagem;

}

function getProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoProduto = urlParams.get("id");

    let data = fazGetId("http://localhost:3000/produtos/"+codigoProduto);
    let produto = JSON.parse(data);
    atualizaPaginaProduto(produto);
}
