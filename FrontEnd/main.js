// const clientes = async function(){
//     let res = await fetch(`http://localhost:3000/clientes`)
//     let data = await res.json()

//     let tabelaClientes = document.getElementById("tabelaClientes")

//     data.forEach(clientes => {
//         let linha = `<tr>
//                         <td>${clientes.codigo}</td>
//                         <td>${clientes.nome}</td>
//                         <td>${clientes.rua}</td>
//                         <td>${clientes.numero}</td>
//                         <td>${clientes.complemento}</td>
//                         <td>${clientes.bairro}</td>
//                         <td>${clientes.cidade}</td>
//                         <td>${clientes.uf}</td>
//                         <td>${clientes.cep}</td>
//                         <td><a href="atualizarCliente.html?id=${clientes.codigo}">ATUALIZAR<a></td>
//                         <td><a href="deletarCliente.html?id=${clientes.codigo}">EXCLUIR<a></td>           
//                     <tr>`
                    
//         tabelaClientes.insertAdjacentHTML('beforeend', linha)
//     })

// }

// clientes();

//COLOCA COISAS NOS CLIENTES APAGAR DEPOIS SO PARA VER INFORMACOES

// let tabelaClientes = document.getElementById("tabelaClientes")
// let data = [
//     {
//         codigo: 1,
//         nome: "William",
//         rua: "sinimbu",
//         numero: "2",
//         complemento: "casa",
//         bairro: "aparecida",
//         cidade: "caxias",
//         uf: "rs",
//         cep: "99555-002",
//     },
// ]

// function preencheTabelaClientes(){
//     data.forEach(clientes => {
//         let linha = `<tr>
//                         <td>${clientes.codigo}</td>
//                         <td>${clientes.nome}</td>
//                         <td>${clientes.rua}</td>
//                         <td>${clientes.numero}</td>
//                         <td>${clientes.complemento}</td>
//                         <td>${clientes.bairro}</td>
//                         <td>${clientes.cidade}</td>
//                         <td>${clientes.uf}</td>
//                         <td>${clientes.cep}</td>
//                         <td><a href="atualizarCliente.html?id=${clientes.codigo}">ATUALIZAR<a></td>
//                         <td><a href="deletarCliente.html?id=${clientes.codigo}">EXCLUIR<a></td>           
//                     <tr>`
                    
//         tabelaClientes.insertAdjacentHTML('beforeend', linha)
//     })
// }
// preencheTabelaClientes()
//APAGAR///////////////////////////////////////////////////////////////////////////////


//COLOCA COISAS NO CARRINHO SÓ PARA TESTE DO JEITO QUE TA////////////////////////////////////////////////
function preencheTabelaCarrinho(){

    let carrinho = [
        {
            codigo: 1,
            descricao: "camiseta wefdwerfwe",
            preco: "30.40",
            quantidade: "2",
            imagem: "https://images.squarespace-cdn.com/content/v1/5e2561d80aee2d7e8a7acc7c/1580100339076-3DSOH15T1IB67H5XYAWN/Asset-4black-words_Asset-7black-head_mockup_Front_Mens_White.png?format=2500w",
        },
        {
            codigo: 2,
            descricao: "moletom",
            preco: "30.52",
            quantidade: "3",
            imagem: "https://6259028l.ha.azioncdn.net/img/2023/05/produto/9999/11m0029-38-blusa-de-moletom-masculino-com-capuz-life-is-a-journey-hiatto-telha-1.png?ims=630x945",
        },
    ]


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

    function logarCliente(codigoProduto){
        console.log("foi")
        console.log(codigoProduto)
    }
    
    function adicionarCarrinho(codigo){
        console.log(codigo)
    }
}

preencheTabelaCarrinho();


//Finalizar compra
let finalizarCompra = document.querySelector("#botao-finalizar-compra")
finalizarCompra.addEventListener("click", function(){

})





