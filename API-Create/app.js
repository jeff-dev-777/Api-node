const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    
    next();
})

const artigosRouter = require('./routes/articles'); // Importação das rotas dos arcticles

app.use('/artigos', artigosRouter); // usando as rotas dos artigos
  
  

app.listen(8080, () => console.log("servidor rodando na porta 8080"))