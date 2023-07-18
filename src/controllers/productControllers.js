require('dotenv').config();
const query = require('../models/productModels');
const jwt = require('jsonwebtoken');

const postProduct = async (req, res) => {
    try {
        const productInfo = req.body
            await query.addProduct(productInfo)
            return res.status(200).json({ mensaje: 'Producto agregado correctamente' });
        } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const newInfo = req.body;
        const result = await query.modifyProduct(newInfo, id)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await query.getProducts()
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const result = await query.productDetails(id_producto);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    postProduct,
    editProduct,
    getProducts,
    getProductById
}