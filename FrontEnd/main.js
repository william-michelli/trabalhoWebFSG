var usuarioLogado = "ADMIN"

var carrinho = [
    
]

var novoCarrinho

const clientes = async function(){
    let res = await fetch(`http://localhost:3000/clientes`)
    let data = await res.json()

    let tabelaClientes = document.getElementById("tabelaClientes")

    data.forEach(clientes => {
        let linha = `<tr>
                        <td>${clientes.id}</td>
                        <td>${clientes.nome}</td>
                        <td>${clientes.rua}</td>
                        <td>${clientes.numero}</td>
                        <td>${clientes.complemento}</td>
                        <td>${clientes.bairro}</td>
                        <td>${clientes.cidade}</td>
                        <td>${clientes.uf}</td>
                        <td>${clientes.cep}</td>
                        <td><a href="atualizarCliente.html?id=${clientes.id}">ATUALIZAR<a></td>
                        <td><a href="deletarCliente.html?id=${clientes.id}">EXCLUIR<a></td>           
                    <tr>`
                    
        tabelaClientes.insertAdjacentHTML('beforeend', linha)
    })

}

clientes();

const produtos = async function(){
    let res = await fetch(`http://localhost:3000/produtos`)
    let data = await res.json()

    let tabelaProdutos = document.getElementById("tabelaProdutos")

    data.forEach(produto => {
        let linha = `<tr style="vertical-align:middle">
                        <td>${produto.produto_id}</td>
                        <td>${produto.descricao}</td>
                        <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
                        <td><img src="${produto.url_imagem}" style="max-width: 150px"></td> 
                        <td><a href="atualizarProduto.html?id=${produto.produto_id}">ATUALIZAR<a></td>
                        <td><a href="deletarProduto.html?id=${produto.produto_id}">EXCLUIR<a></td>   
                    <tr>`
                 
    
        //Insere na tabela de clientes do ADMIN
        tabelaProdutos.insertAdjacentHTML('beforeend', linha)
    })
}

produtos();

const produtosHome = async function(){
    let res = await fetch(`http://localhost:3000/produtos`)
    let data = await res.json()

    let listaProdutos = document.getElementById("lista-produtos")

    data.forEach(produto => {
        let linha = `  
                    <div class="col cada-cartao">
                        <div class="card h-100">
                            <img src="${produto.url_imagem}" class="card-img-top" alt="...">
                           
                        <div class="card-body">
                            <h5 class="card-title">${produto.descricao}</h5>
                            <br>
                            <h6 class="card-preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</h6>
                       
                            <button type="button" class="botao-comprar" onclick="adicionarCarrinho(${produto.produto_id}, '${produto.descricao}', ${produto.preco}, '${produto.url_imagem}');">Comprar</button>
                        
                        </div>
                        </div>
                    </div>`
                
        //Insere na tela inicial
        listaProdutos.insertAdjacentHTML('beforeend', linha)
    })
}

produtosHome();



//COLOCA COISAS NO CARRINHO SÓ PARA TESTE DO JEITO QUE TA////////////////////////////////////////////////
function preencheTabelaCarrinho(){
    var carrinhoPreservado = localStorage.getItem("preservado");

    novoCarrinho = JSON.parse(carrinhoPreservado)

    let total = 0;

    let totalCompra = document.getElementById("total-compra")
    let tabelaCarrinho = document.getElementById("tabela-carrinho")
    novoCarrinho.forEach(carrinho => {
        let linha = `<tr style="vertical-align:middle">
                        <td>${carrinho.produto_id}</td>
                        <td>${carrinho.descricao}</td>
                        <td>${carrinho.preco.toFixed(2)}</td>
                        <td><img src="${carrinho.imagem}" style="max-width: 150px"></td>
                        <td>
                            <button onclick="diminuirQntd(${carrinho.produto_id}, 'total${carrinho.produto_id}', ${carrinho.preco.toFixed(2)})">-</button>
                                <input value="${carrinho.quantidade}" id="${carrinho.produto_id}" style="width: 70px; text-align: center;" readonly>
                            <button onclick="aumentarQntd(${carrinho.produto_id}, 'total${carrinho.produto_id}', ${carrinho.preco.toFixed(2)})">+</button>
                        </td>    
                        <td id="total${carrinho.produto_id}">${(carrinho.preco * carrinho.quantidade).toFixed(2)}</td>    
                    <tr>`
                    
        tabelaCarrinho.insertAdjacentHTML('beforeend', linha)

        total += parseFloat(`${carrinho.preco}`) * parseFloat(`${carrinho.quantidade}`)
        totalCompra.innerHTML = "Total : R$ " + total.toFixed(2)
    })
}

preencheTabelaCarrinho();

//ADICIONAR CARRINHO

function adicionarCarrinho(produto_id, descricao, preco, url_imagem){
    var carrinhoPreservado = localStorage.getItem("preservado");
    let carrinho = carrinhoPreservado == null ? [] : JSON.parse(carrinhoPreservado)
    let teste = false

    if(carrinho.length != 0){
        carrinho.forEach(car => {
            if(car.produto_id == produto_id){
              teste = true
              let aux =  parseInt(car.quantidade)
              car.quantidade = aux + 1

              localStorage.setItem("preservado", JSON.stringify(carrinho));
      
              preencheTabelaCarrinho()
            }
        })
        console.log(carrinho)
    }else{
        carrinho.push({
            produto_id: produto_id,
            descricao: descricao,
            preco: preco,
            quantidade: "1",
            imagem: url_imagem
        })

        localStorage.setItem("preservado", JSON.stringify(carrinho));
      
        preencheTabelaCarrinho()
    }


    if(teste == false){
        carrinho.push({
            produto_id: produto_id,
            descricao: descricao,
            preco: preco,
            quantidade: "1",
            imagem: url_imagem
        })
    
        localStorage.setItem("preservado", JSON.stringify(carrinho));
      
        preencheTabelaCarrinho()
    }
    else{
       alert("ja existe")
    }
}
///////////////////////////////////////////////////////////////////

function diminuirQntd(inputId, totalItem, preco){
    let input = document.getElementById(inputId)
    let total = document.getElementById(totalItem)

    let valor = parseFloat(total.textContent)
    let aux = valor - preco
    total.textContent = aux.toFixed(2)

    if(input.value == 1){
        let resposta = confirm("Deseja mesmo remover esse item do carrinho?")

        if(resposta == true){
            input.value--

            var carrinhoPreservado = localStorage.getItem("preservado");

            novoCarrinho = JSON.parse(carrinhoPreservado)

            let tabelaCarrinho = document.getElementById("tabela-carrinho")
            var filtered = novoCarrinho.filter(function(el) { return el.produto_id != inputId; }); 
     
            tabelaCarrinho.rows.remove()
            localStorage.setItem("preservado", JSON.stringify(filtered));

            preencheTabelaCarrinho()
        }  
    }else{
        input.value--
        
    }
}

function aumentarQntd(inputId, totalItem, preco){
    let input = document.getElementById(inputId)
    input.value++

    let total = document.getElementById(totalItem)

    let valor = parseFloat(total.textContent)

    let aux = valor + preco
    total.textContent = aux.toFixed(2)

    // total.textContent = valor + preco
    // total.textContent = total.textContent.substring(0, 5)
}

//LOGAR
// function logarCliente(){
//     usuarioLogado = document.querySelector("#usuario").value
//     console.log(usuarioLogado)
//     window.location.href = "FrontEnd/index.html";
// }

// window.addEventListener("load", (event) => {
//     if(usuarioLogado == "ADMIN"){
//         document.querySelector("botao-cadastro").style.display = 'none';
//         document.querySelector("#botao-lista-produtos").style.display = 'block';
//         document.querySelector("#botao-lista-clientes").style.display = 'block';
//     }else{
//         document.querySelector("#botao-lista-produtos").style.display = 'none';
//         document.querySelector("#botao-lista-clientes").style.display = 'none';
        
//     }
// });



