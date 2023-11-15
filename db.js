const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);


async function selectClientes(){
    const results = await client.query("select * from clientes;");
    return results[0];
}

async function selectCliente(id){
    const results = await client.query("select * from clientes where id=?;", [id]);
    return results[0];
}

async function insertClientes(cliente){
    const values = [cliente.nome, cliente.idade, cliente.uf];
    await client.query("insert into clientes(nome, idade, uf) values (?,?,?);",values);
}

async function updateClientes(id, novoCliente){
    const values = [novoCliente.nome, novoCliente.idade, novoCliente.uf, id];
    await client.query("update clientes set nome = ?, idade = ?, uf = ? where id=?;",values);
}

async function deleteClientes(id){
    await client.query("delete from clientes where id=?;",id);
}

module.exports = {
    selectClientes,
    selectCliente,
    insertClientes,
    updateClientes,
    deleteClientes
}