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

    let nome = document.getElementById("nome").value;
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let uf = document.getElementById("uf").value;
    let cep = document.getElementById("cep").value;


    body = {
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



function cadastraProduto() {
    event.preventDefault()
    let url = "http://localhost:3000/produtos"

    let descricao = document.getElementById("descricao").value;
    let preco = document.getElementById("preco").value;
    let imagem = document.getElementById("imagem").value;


    body = {
        "descricao": descricao,
        "preco": preco,
        "url_imagem": imagem,
    }

    fazPost(url, body)

    window.location.href = "index.html";
}



function finalizarCompra() {
    event.preventDefault()
    var date = new Date;

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();

    let aleatorio = Math.floor(Math.random() * 999) + 1;
    aleatorio += "" + seconds + minutes + hour
    aleatorio = aleatorio / 10000


    let total = document.getElementById('total-compra').textContent
    
    //COLOCA EM TODOS OS PEDIDOS
    let url = "http://localhost:3000/todospedidos"

    body = {
        "pedido_id": aleatorio,
        "cliente_id": 3,//PRECISA ALTERAR DEPOIS TA SEMPRE ENVIANDO PELO CLIENTE 3
        "total": total,
    }

    fazPost(url, body)

    //COLOCA EM TODOS EM ITEM PEDIDO
    url = "http://localhost:3000/pedidos"

    let sequencial = 1
    novoCarrinho.forEach(item => {
    
        body = {
            "pedido_id": aleatorio,
            "sequencial": sequencial,
            "produto_id": item.produto_id,
            "qtd": item.quantidade,
        }
        sequencial++
        fazPost(url, body)
    })
    ////////////////////////////////////////////
    
    novoCarrinho = []
    carrinho = []
    localStorage.clear()

    window.location.href = "index.html";
}




// function finalizarCompra() {
//     event.preventDefault()
//     let url = "http://localhost:3000/pedidos"

//     console.log(novoCarrinho)

//     novoCarrinho.forEach(item => {
//         body = {
//             "pedido_id": pedidoID,
//             "cliente_id": 3,//PRECISA ALTERAR DEPOIS TA SEMPRE ENVIANDO PELO CLIENTE 3
//             "produto_id": item.produto_id,
//             "valor_final": item.preco * item.quantidade,
//             "qtd": item.quantidade,
//         }

//         fazPost(url, body)
//     })


//     novoCarrinho = []
//     carrinho = []
//     localStorage.clear()

//     window.location.href = "index.html";
// }