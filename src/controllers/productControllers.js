require('dotenv').config();
const query = require('../models/productModels');

const postProduct = async (req, res) => {
    try {
        const { id_usuario } = req.datosToken;
        const productInfo = req.body
        await query.addProduct(productInfo, id_usuario)
        return res.status(200).json({ mensaje: 'Producto agregado correctamente' });
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const editProduct = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const data = req.body;
        const result = await query.modifyProduct(id_producto, data);
        // console.log(result)
        res.status(200).json({ message: 'Producto modificado' });
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getProducts = async (req, res) => {
    const { id_usuario } = req.datosToken;
    const Number = parseInt(req.query.page) || 1;
    const PageNumber = Math.max(Number, 1);
    const pageSize = parseInt(req.query.size) || 100;
    const offset = (PageNumber - 1) * pageSize;

    try {
        const products = await query.getProducts(id_usuario, pageSize,offset)
        return res.status(200).json(products);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getPublicaciones = async (req, res) => {
    try {
        const Number = parseInt(req.query.page) || 1;
        const PageNumber = Math.max(Number, 1);
        const pageSize = parseInt(req.query.size) || 100;
        const offset = (PageNumber - 1) * pageSize;

        const products = await query.getPublicaciones(pageSize,offset)
        //console.log(products)
        return res.status(200).json(products);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { id_usuario } = req.datosToken;
        const result = await query.productDetails(id_producto, id_usuario);
        return res.status(200).json(result);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getFavoritos = async (req, res) => {
    const { id_usuario } = req.datosToken;
    const Number = parseInt(req.query.page) || 1;
    const PageNumber = Math.max(Number, 1);
    const pageSize = parseInt(req.query.size) || 10000;
    const offset = (PageNumber - 1) * pageSize;

    try {
        const products = await query.getProductosFavoritos(id_usuario, pageSize, offset)
        return res.status(200).json(products);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

const getProductoModificar = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const productInfo = await query.productoModificar(id_producto);
        return res.status(200).json(productInfo);
    } catch ({ code, message }) {
        return res.status(code || 500).json({ error: message });
    }
}

module.exports = {
    postProduct,
    editProduct,
    getProducts,
    getProductById,
    getFavoritos,
    getPublicaciones,
    getProductoModificar
}