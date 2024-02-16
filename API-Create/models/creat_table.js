const db = require("./db");

//codigo para criação da tabela no banco de dados
const Artigos = db.sequelize.define('artigo', {
    name: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    
},
    {
        timestamps: true
    }
)

//criação de uma tabela
// Artigos.sync({force: true}).then(() => {
//     console.log("Tabela 'artigo' criada com sucesso.");
// }).catch(error => {
//     console.error("Erro ao criar a tabela 'artigo':", error);
// });

module.exports = Artigos;