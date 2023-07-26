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
    const Number = parseInt(req.query.page) || 1;
    const PageNumber = Math.max(Number, 1);
    const pageSize = parseInt(req.query.size) || 100;
    const offset = (PageNumber - 1) * pageSize;

    try {
        const products = await query.getProducts(id_usuario, pageSize,offset)
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los productos' });
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

const getFavoritos = async (req, res) => {
    const { id_usuario } = req.datosToken;
    const Number = parseInt(req.query.page) || 1;
    const PageNumber = Math.max(Number, 1);
    const pageSize = parseInt(req.query.size) || 10000;
    const offset = (PageNumber - 1) * pageSize;

    try {
        const products = await query.getProductosFavoritos(id_usuario, pageSize, offset)
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
}

const getProductoModificar = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const productInfo = await query.productoModificar(id_producto);
        return res.status(200).json(productInfo);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener el producto a modificar' });
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