const pool = require('../config/db');

const addLike = async (id_usuario, id_producto) => {
    const queryText = 'INSERT INTO likes VALUES (DEFAULT, $1, $2)';
    const queryParams = [id_usuario, id_producto]
    try {
        const response = await pool.query(queryText, queryParams)
        return response
    } catch (error) {
        throw { code: 500, message: 'Error al agregar el like' };
    }
}

const deleteLike = async (id_usuario, id_producto) => {
    const queryText = 'DELETE FROM likes WHERE id_usuario = $1 AND id_producto = $2';
    const queryParams = [id_usuario, id_producto]
    try {
        const response = await pool.query(queryText, queryParams)
        return response
    } catch (error) {
        throw { code: 500, message: 'Error al agregar el like' };
    }
}

module.exports = {
    addLike,
    deleteLike
}