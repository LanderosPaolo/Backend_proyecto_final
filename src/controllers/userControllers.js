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

const realizarLogin = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const password=contrasena;
        await query.verificarCredenciales(email, password);
        const usuario_estado = await query.obtenerUsuario(email);
        const {id_usuario, administrador}=usuario_estado;
        const token = jwt.sign({ id_usuario, administrador, email }, process.env.JWT_SECRET);
        res.json({ message: 'Token enviado', token });
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

// const loginUser = async (req, res) => {
//     try {
//         const userLogin = req.body;
//         await query.login(userLogin);
//         const token = jwt.sign({ email: userLogin.email }, process.env.JWT_SECRET)
//         return res.status(200).send(token);
//     } catch (error) {
//         return res.status(error.code).json({ mensaje: 'Error al iniciar sesion' });
//     }
// }

module.exports = {
    postUser,
    // loginUser,
    realizarLogin
}