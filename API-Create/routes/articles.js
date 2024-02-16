const express = require("express");
const router = express.Router();
const Artigos = require("../models/creat_table");
const Sequelize = require("sequelize");
const controller = require("../controller/usuarioControllers");
const  authControllers = require("../controller/authControllers");



//rota para encontrar todos os ids
router.get("/meet", (req, res) => {
    Artigos.findAll({}).then((artigos) => {
        return res.json(artigos);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "nenhum artigo encontrado"
        })
    })
});

//rota para ver apenas 1 item por id
router.get('/view/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const artigo = await Artigos.findByPk(id);
      if (!artigo) {
        return res.status(404).json({ error: true, message: 'Artigo não encontrado' });
      }
      return res.json(artigo);
    } catch (error) {
      console.error('Erro na consulta ao banco de dados: ' + error.message);
      return res.status(500).json({ error: true, message: 'Erro na consulta ao banco de dados' });
    }
  });

//rota para adicionar um item
router.post("/add", (req, res) => {
  Artigos.create(req.body)
    .then(artigo => {
      return res.status(201).json({
        error: false,
        message: "Artigo foi cadastrado com sucesso",
        artigo
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: true,
        message: "Erro ao cadastrar o artigo",
        details: err.message
      });
    });
});


// Rota para editar um artigo por ID
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { titulo, conteudo } = req.body;
  
    try {
      const [updatedRows] = await Artigos.update({ titulo, conteudo }, { where: { id } });
  
      if (updatedRows === 0) {
        return res.status(404).json({ error: true, message: 'Artigo não encontrado' });
      }
  
      const artigo = await Artigos.findByPk(id);
      return res.json(artigo);
    } catch (error) {
      console.error('Erro na edição do artigo: ' + error.message);
      return res.status(500).json({ error: true, message: 'Erro na edição do artigo' });
    }
  });

// Rota para excluir um artigo por ID
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedRows = await Artigos.destroy({ where: { id } });
  
      if (deletedRows === 0) {
        return res.status(404).json({ error: true, message: 'Artigo não encontrado' });
      }
  
      return res.status(204).send(); // 204 No Content, indica que a operação foi bem-sucedida, mas não há resposta.
    } catch (error) {
      console.error('Erro na exclusão do artigo: ' + error.message);
      return res.status(500).json({ error: true, message: 'Erro na exclusão do artigo' });
    }
  });

  router.get("/", authControllers.verificarToken, controller.getAll);
  router.post("/criar", controller.criarUsuario);
  router.get("/teste", async (req, res) => {
      return res.json({
          msg: "teste realizado"
      })
  })
  router.post("/login", authControllers.login)
  router.get("/rotaAutenticada", authControllers.verificarToken, controller.rotaAutenticada)

  module.exports = router;