require('dotenv').config();
const query = require('../models/cartModels'); //addToCart

const postCart = async (req, res) => {
    try {
        const datosBody = req.body;
        const { id_usuario } = req.datosToken;
        // console.log(datosBody);
        detalle_final=await query.addToCart(id_usuario, datosBody);
        return res.status(200).json({ mensaje: 'Orden de compra generada correctamente',
        detalle_final: detalle_final });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

const getOrdenes = async (req, res) => {
    try {
        const products = await query.ordenesCompras()
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las ordenes de compra' });
    }
}
const putEstado = async (req, res) => {
    try {
        const datosBody = req.body;
        const { id_usuario } = req.datosToken;
        // console.log(datosBody);
        await query.changeEstado(id_usuario, datosBody);
        return res.status(200).json({ mensaje: 'Estado cambiado'});
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
    postCart,
    getOrdenes,
    putEstado
}