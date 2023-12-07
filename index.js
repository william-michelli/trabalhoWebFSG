require("dotenv").config();

const db = require("./db");

const express = require("express");

const app = express();

app.use(express.json());

//Necessário instalar o CORS: npm install cors --save
const cors = require("cors"); // Necessário para permitir o acesso da URL

//App deve fazer uso do CORS
app.use(cors());


//CLIENTES ////////////////////////////////////////////////////////////////////////////////////////
app.delete("/clientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteClientes(id);
    response.sendStatus(204);
}) 

app.post("/clientes", async (request,response) => {
    const cliente = request.body;
    await db.insertClientes(cliente);
    response.sendStatus(201);
})

app.patch("/clientes/:id", async (request,response) => {
    const id = parseInt(request.params.id);
    const cliente = request.body;
    await db.updateClientes(id, cliente);
    response.sendStatus(200);
})


app.get("/clientes", async (request, response) => {
    const results = await db.selectClientes();
    response.json(results);
})

app.get("/clientes/:id", async (request, response) => {
    //Os cabeçalhos abaixo devem ser setados
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    const id = parseInt(request.params.id);
    const results = await db.selectCliente(id);
    response.json(results);
})



//PRODUTOS ////////////////////////////////////////////////////////////////////////////////////////
app.delete("/produtos/:produto_id", async (request, response) => {
    const produto_id = parseInt(request.params.produto_id);
    await db.deleteProdutos(produto_id);
    response.sendStatus(204);
})

app.post("/produtos", async (request,response) => {
    const produto = request.body;
    await db.insertProdutos(produto);
    response.sendStatus(201);
})

app.patch("/produtos/:id", async (request,response) => {
    const produto_id = parseInt(request.params.produto_id);
    const produto = request.body;

    await db.updateProdutos(produto_id, produto);
    response.sendStatus(200);
})

app.get("/produtos", async (request, response) => {
    const results = await db.selectProdutos();
    response.json(results);
})

app.get("/produtos/:produto_id", async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    const produto_id = parseInt(request.params.produto_id);
    const results = await db.selectProduto(produto_id);
    response.json(results);
})


//PEDIDOS
app.get("/pedidos", async (request, response) => {
    const results = await db.selectPedidos();
    response.json(results);
})

app.post("/pedidos", async (request,response) => {
    const pedido = request.body;
    await db.insertPedidos(pedido);
    response.sendStatus(201);
})

//TODOS PEDIDOS
app.get("/todospedidos", async (request, response) => {
    const results = await db.selectTodosPedidos();
    response.json(results);
})

app.post("/todospedidos", async (request,response) => {
    const pedido = request.body;
    await db.insertTodosPedidos(pedido);
    response.sendStatus(201);
})

//LOGIN/////////////////////////////////////////////////////////
app.get("/login", async (request, response) => {
    const results = await db.selectLogins();
    response.json(results);
})

app.get("/login/:cliente_id", async (request, response) => {
    //Os cabeçalhos abaixo devem ser setados
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    const id = parseInt(request.params.cliente_id);
    const results = await db.selectLogin(id);
    response.json(results);
})


app.get("/", (request, response, next) => {
    response.json({
        message: "Estou vivo!"
    })
})


app.listen(process.env.PORT, () =>{
    console.log("App está executando");
});