require("dotenv").config();

const db = require("./db");

const express = require("express");

const app = express();

app.use(express.json());

//Necessário instalar o CORS: npm install cors --save
const cors = require("cors"); // Necessário para permitir o acesso da URL

//App deve fazer uso do CORS
app.use(cors());

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

app.get("/", (request, response, next) => {
    response.json({
        message: "Estou vivo!"
    })
})


app.listen(process.env.PORT, () =>{
    console.log("App está executando");
});