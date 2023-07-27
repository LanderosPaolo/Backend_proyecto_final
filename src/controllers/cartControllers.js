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
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getOrdenes = async (req, res) => {

    try {
        const { administrador } = req.datosToken;
        if (administrador===0){
            throw { code: 403, message: 'Acceso prohibido' };
        }
    
        const Number = parseInt(req.query.page) || 1;
        const PageNumber = Math.max(Number, 1);
        const pageSize = parseInt(req.query.size) || 100;
        const offset = (PageNumber - 1) * pageSize;

        const products = await query.ordenesCompras(pageSize,offset)
        return res.status(200).json(products);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}
const getEstados = async (req, res) => {
    try {
        const { administrador } = req.datosToken;
        if (administrador===0){
            throw { code: 403, message: 'Acceso prohibido' };
        }
        const estados = await query.obtenerEstados()
        return res.status(200).json(estados);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}
const putEstado = async (req, res) => {
    try {
        const { administrador } = req.datosToken;
        if (administrador===0){
            throw { code: 403, message: 'Acceso prohibido' };
        }
        const datosBody = req.body;
        const { id_usuario } = req.datosToken;
        console.log(datosBody);
        orden_compra_nueva=await query.changeEstado(id_usuario, datosBody);
        return res.status(200).json(orden_compra_nueva);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

module.exports = {
    postCart,
    getOrdenes,
    putEstado,
    getEstados
}