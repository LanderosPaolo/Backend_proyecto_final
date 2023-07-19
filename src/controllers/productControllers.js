require('dotenv').config();
const query = require('../models/productModels');

const postProduct = async (req, res) => {
    try {
        const { id_usuario } = req.datosToken;
        const productInfo = req.body

        await query.addProduct(productInfo, id_usuario)
        return res.status(200).json({ mensaje: 'Producto agregado correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

const editProduct = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const data = req.body;
        const result = await query.modifyProduct(id_producto, data);
        console.log(result)
        res.status(200).json({ message: 'Producto modificado' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
}

const getProducts = async (req, res) => {
    const { id_usuario } = req.datosToken;
    try {
        const products = await query.getProducts(id_usuario)
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { id_usuario } = req.datosToken;
        const result = await query.productDetails(id_producto, id_usuario);
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