const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

//CLIENTES ////////////////////////////////////////////////////////////////////////////////////////
async function selectClientes(){
    const results = await client.query("select * from clientes;");
    return results[0];
}

async function selectCliente(id){
    const results = await client.query("select * from clientes where id=?;", [id]);
    return results[0];
}

async function insertClientes(novoCliente){ 
    console.log(novoCliente);

    const values = [novoCliente.bairro, novoCliente.cep, novoCliente.cidade, novoCliente.complemento, novoCliente.nome, novoCliente.numero, novoCliente.rua, novoCliente.uf];
    await client.query("insert into clientes(bairro, cep, cidade, complemento, nome, numero, rua, uf) values (?,?,?,?,?,?,?,?);",values);

        // Insere usuário na tabela de Login
        const idCliente = (await client.query("select c.id from clientes c where c.nome = ?", novoCliente.nome));
        const loginValues = [novoCliente.login, novoCliente.senha, idCliente[0][0].id]
        await client.query("insert into login (usuario, senha, cliente_id) values (?,?,?)", loginValues);
}

async function updateClientes(id, novoCliente){
    const values = [novoCliente.bairro, novoCliente.cep, novoCliente.cidade, novoCliente.complemento, novoCliente.nome, novoCliente.numero, novoCliente.rua, novoCliente.uf, id];
    await client.query("update clientes set bairro = ?, cep = ?, cidade = ?, complemento = ?, nome = ?, numero = ?, rua = ?, uf = ? where id=?;",values);
}

async function deleteClientes(id){
    await client.query("delete from clientes where id=?;",id);
}

//PRODUTOS ////////////////////////////////////////////////////////////////////////////////////////

async function selectProdutos(){
    const results = await client.query("select * from produtos;");
    return results[0];
}

async function selectProduto(produto_id){
    const results = await client.query("select * from produtos where produto_id=?;", [produto_id]);
    return results[0];
}

async function insertProdutos(produto){
    const values = [produto.descricao, produto.preco, produto.url_imagem];
    await client.query("insert into produtos(descricao, preco, url_imagem) values (?,?,?);",values);
}

async function updateProdutos(produto_id, produto){
    const values = [produto.descricao, produto.preco, produto.url_imagem, produto.produto_id];
    await client.query("update produtos set descricao = ?, preco = ?, url_imagem = ? where produto_id=?;",values);
}

async function deleteProdutos(produto_id){
    await client.query("delete from produtos where produto_id=?;",produto_id);
}

//PEDIDOS ////////////////////////////////////////////////////////////////////////////////////////
async function selectPedidos(){
    const results = await client.query("select * from pedido;");
    return results[0];
}

async function insertPedidos(pedido){ 
    const values = [pedido.pedido_id, pedido.sequencial, pedido.produto_id, pedido.qtd]
    await client.query("insert into pedido(pedido_id, sequencial, produto_id, qtd) values (?,?,?,?);",values);
}


//TODOS PEDIDOS////////////////////////////////////////////////
async function selectTodosPedidos(){
    const results = await client.query("select * from tabela_pedidos;");
    return results[0];
}

async function insertTodosPedidos(pedido){ 
    const values = [pedido.pedido_id, pedido.cliente_id, pedido.total]
    await client.query("insert into tabela_pedidos(pedido_id, cliente_id, total) values (?,?,?);",values);
}


//LOGIN
//Mostra TODOS logins
async function selectLogins(){
    const results = await client.query("select * from login;");
    return results[0];
}


//Login especifico
async function selectLogin(id){
    const results = await client.query("select * from login where cliente_id=?;", [id]);
    return results[0];
}

module.exports = {
    selectClientes,
    selectCliente,
    insertClientes,
    updateClientes,
    deleteClientes,

    selectProdutos,
    selectProduto,
    insertProdutos,
    updateProdutos,
    deleteProdutos,

    selectPedidos,
    insertPedidos,
    
    selectTodosPedidos,
    insertTodosPedidos,

    selectLogins,
    selectLogin

}