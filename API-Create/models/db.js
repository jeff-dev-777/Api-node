const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

//conexão com o banco de dados
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
})

async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados bem-sucedida.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
}

testDatabaseConnection();

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}