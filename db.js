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
    const values = [produto.produto_id, produto.descricao, produto.preco, produto.url_imagem];
    await client.query("insert into produtos(nome, idade, uf) values (?,?,?);",values);
}

async function updateProdutos(produto_id, produto){
    const values = [produto.descricao, produto.preco, produto.url_imagem, produto_id];
    await client.query("update produtos set descricao = ?, preco = ?, url_imagem = ? where produto_id=?;",values);
}

async function deleteProdutos(produto_id){
    await client.query("delete from produtos where id=?;",produto_id);
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
    deleteProdutos
}