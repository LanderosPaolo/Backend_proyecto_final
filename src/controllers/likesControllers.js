require('dotenv').config();
const query = require('../models/likesModels');

const postLike = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { id_usuario } = req.datosToken;
        await query.addLike(id_usuario, id_producto);
        return res.status(200).json({ mensaje: 'Like agregado correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

const deleteLike = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { id_usuario } = req.datosToken;
        await query.deleteLike(id_usuario, id_producto);
        return res.status(200).json({ mensaje: 'Like borrado correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    postLike,
    deleteLike
}