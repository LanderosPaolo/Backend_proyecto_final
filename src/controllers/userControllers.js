require('dotenv').config();
const query = require('../models/userModels');
const jwt = require('jsonwebtoken');

const postUser = async (req, res) => {
    try {
        const usuario = req.body;
        await query.addUser(usuario);
        res.status(200).json({ mensaje: "Usuario creado con éxito" });
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json({ error: message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const password = contrasena;
        await query.verifyUser(email, password);
        const user_state = await query.getUser(email);
        const { id_usuario, administrador } = user_state;
        const token = jwt.sign({ id_usuario, administrador, email }, process.env.JWT_SECRET);
        res.json({ message: 'Token enviado', token });
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { id_usuario } = req.datosToken;
        const response = await query.getUserById(id_usuario)
        return res.status(200).json(response);
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

module.exports = {
    postUser,
    loginUser,
    getUserInfo
}