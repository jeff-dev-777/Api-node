const table = require('../models/creat_table');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Artigos = require('../models/creat_table');
const dotenv = require("dotenv").config();

const SECRET = process.env.SECRET;


const login = async (req, res) => {
    try {
      const usuario = await Artigos.findOne({ where: { email: req.body.email } });
  
      if (!usuario) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not Found!",
          data: {
            email: req.body.email,
          },
        });
      }
  
      const validacaoPassword = bcrypt.compareSync(req.body.password, usuario.password);
  
      if (!validacaoPassword) {
        return res.status(401).json({
          statusCode: 401,
          message: "Not authorized!",
        });
      }
  
      const token = jwt.sign({ name: usuario.name }, SECRET, {
        expiresIn: 2 * 60,
      });
  
      res.status(200).json({
        statusCode: 200,
        message: "Login sucessful!",
        data: {
          token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
  };
  
  const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Not authorized!",
      });
    }
  
    try {
      jwt.verify(token, SECRET);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        message: "Token not valid.",
      });
    }
  };
  
  module.exports = {
    login,
    verificarToken,
  };