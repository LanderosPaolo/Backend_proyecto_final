const pool = require('../config/db');

const addLike = async (id_usuario, id_producto) => {
    const queryText = 'INSERT INTO likes (id_usuario, id_producto) VALUES ($1, $2)';
    const queryParams = [id_usuario, id_producto]
    await pool.query(queryText, queryParams)
}

const deleteLike = async (id_usuario, id_producto) => {
    const queryText = 'DELETE FROM likes WHERE id_usuario = $1 AND id_producto = $2';
    const queryParams = [id_usuario, id_producto]
    await pool.query(queryText, queryParams)
}

module.exports = {
    addLike,
    deleteLike
}