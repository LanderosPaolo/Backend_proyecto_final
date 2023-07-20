require('dotenv').config();
const query = require('../models/cartModels'); //addToCart

const postCart = async (req, res) => {
    try {
        const datosBody = req.body;
        const { id_usuario } = req.datosToken;
        // console.log(datosBody);
        const detalles_orden_compra = await query.addToCart(id_usuario, datosBody);
        return res.status(200).json({ 
                mensaje: 'Orden de compra generada correctamente',
                Orden: detalles_orden_compra
            });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
    postCart
}