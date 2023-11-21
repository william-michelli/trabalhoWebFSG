var usuarioLogado = "ADMIN"

let carrinho = [
    
]

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
                        <td><a href="atualizarCliente.html?id=${clientes.codigo}">ATUALIZAR<a></td>
                        <td><a href="deletarCliente.html?id=${clientes.codigo}">EXCLUIR<a></td>           
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
                       
                            <p class="card-id" style="display: none;">${produto.id_produto}</p>
                            <button type="button" id="comprar${id}" class="botao-comprar">Comprar</button>
                        
                        </div>
                        </div>
                    </div>`
                
        //Insere na tela inicial
        listaProdutos.insertAdjacentHTML('beforeend', linha)
    })
}

produtosHome();





//COLOCA COISAS NO CARRINHO SÓ PARA TESTE DO JEITO QUE TA////////////////////////////////////////////////
function preencheTabelaCarrinho(produto_id, descricao, preco, url_imagem){
    carrinho.push({
                codigo: produto_id,
                descricao: descricao,
                preco: preco,
                quantidade: "1",
                imagem: url_imagem
            })
    

    let total = 0;

    let totalCompra = document.getElementById("total-compra")
    let tabelaCarrinho = document.getElementById("tabela-carrinho")
    carrinho.forEach(carrinho => {
        let linha = `<tr style="vertical-align:middle">
                        <td>${carrinho.codigo}</td>
                        <td>${carrinho.descricao}</td>
                        <td>${carrinho.preco}</td>
                        <td><img src="${carrinho.imagem}" style="max-width: 150px"></td>
                        <td><input value="${carrinho.quantidade}" style="width: 100px; text-align: center;"></td>    
                        <td>${carrinho.preco * carrinho.quantidade}</td>    
                    <tr>`
                    
        tabelaCarrinho.insertAdjacentHTML('beforeend', linha)

        total += parseFloat(`${carrinho.preco}`) * parseFloat(`${carrinho.quantidade}`)
        totalCompra.innerHTML = "Total : " + total
    })
}

preencheTabelaCarrinho();

//ADICIONAR CARRINHO
let botaoComprar = document.querySelectorAll('.botao-comprar')
   
botaoComprar.forEach(function(el){
    el.addEventListener('click', adicionarCarrinho())
})

function adicionarCarrinho(){
    console.log("clicou")
    // let produto_id = document.querySelector('.card-id')
    // console.log(produto_id)
}
///////////////////////////////////////////////////////////////////



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



