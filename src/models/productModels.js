const pool = require('../config/db');

const addProduct = async (comicInfo) => {
    const { nombre, numero, imagen_pequena, imagen_grande, detalle, precio, stock } = comicInfo;
    const queryText = 'INSERT INTO producto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)';
    const queryParams = [nombre, numero, imagen_pequena, imagen_grande, detalle, precio, stock];
    try {
        const response = await pool.query(queryText, queryParams);
        return response;
    } catch (error) {
        throw { code: 500, message: 'Error al agregar el producto' };
    }
};

const modifyProduct = async (id, newInfo) => {
    const { nombre, numero, imagen_pequena, imagen_grande, detalle, precio, stock } = newInfo;
    const queryText = 'UPDATE producto SET nombre = $1, numero = $2, imagen_pequena = $3, imagen_grande = $4, detalle = $5, precio = $6, stock = $7 WHERE id_producto = $8';
    const queryParams = [nombre, numero, imagen_pequena, imagen_grande, detalle, precio, stock, id];
    try {
        const response = await pool.query(queryText, queryParams);
        return response;
    } catch (error) {
        throw { code: 500, message: 'Error al modificar el producto' };
    }
};

const getProducts = async () => {
    const queryText = 'SELECT * FROM producto';
    try {
        const response = await pool.query(queryText);
        return response.rows;
    } catch (error) {
        throw { code: 500, message: 'Error al obtener los productos' };
    }
};

const productDetails = async (id) => {
    const queryText = 'SELECT * FROM producto WHERE id_producto = $1';
    const queryParams = [id]
    try {
        const response = await pool.query(queryText, queryParams);
        if (!response) {
            throw { code: 404, message: 'Producto no encontrado' };
        }
        return response.rows[0];
    } catch (error) {
        throw { code: 500, message: 'Error al obtener los detalles del producto' };
    }
}

module.exports = {
    addProduct,
    modifyProduct,
    getProducts,
    productDetails,
}