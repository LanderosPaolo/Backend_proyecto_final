require('dotenv').config();
const query = require('../models/userModels');
const jwt = require('jsonwebtoken');

const postUser = async (req, res) => {
    try {
        const usuario = req.body;
        await query.addUser(usuario);
        res.status(201).json({mensaje: "Usuario creado con éxito"});
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json(message);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const password=contrasena;
        await query.verifyUser(email, password);
        const usuario_estado = await query.getUser(email);
        const {id_usuario, administrador}=usuario_estado;
        const token = jwt.sign({ id_usuario, administrador, email }, process.env.JWT_SECRET);
        res.json({ message: 'Token enviado', token });
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

module.exports = {
    postUser,
    loginUser
}