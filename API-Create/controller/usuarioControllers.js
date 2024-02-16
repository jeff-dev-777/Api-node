const bcrypt = require("bcrypt");
const table = require('../models/creat_table');
const Artigos = require("../models/creat_table");

const getAll = async (req, res) => {
    Artigos.find(function (err, usuarios) {
        if (err) {
            res.status(500).json({
                statusCode: 500,
                message: err.message
            });
        }
        res.status(200).json({
            statusCode: 200,
            data: {
                usuarios
            }
        })
    })
}

const criarUsuario = async (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    try {

        console.log(req.body);

        const novoUsuario = new Artigos(req.body);

        const usuarioSalvo = await novoUsuario.save();

        res.status(201).json({
            statusCode: 201,
            message: "Usuário criado com sucesso!",
            data: {
                usuarioSalvo
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const rotaAutenticada = async (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Rota autenticada"
    })
}

module.exports = {
    getAll,
    criarUsuario,
    rotaAutenticada
}