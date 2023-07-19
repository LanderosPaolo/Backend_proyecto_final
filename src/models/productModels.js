const pool = require('../config/db');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const addProduct = async (comicInfo, id_usuario) => {
    const { nombre, numero, imagen_pequena, imagen_grande, detalle, precio, stock } = comicInfo;
    
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[:.]/g, '');
    
    // Generate unique names for the images based on the date and time
    const smallImageName = `small_${uuidv4()}.jpg`;
    const largeImageName = `big_${uuidv4()}.jpg`;

    const queryText = 'INSERT INTO producto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)';
    const queryParams = [nombre, numero, smallImageName, largeImageName, detalle, precio, stock, id_usuario];
    
    try {
        // Save the images in the folder back/src/assets/img/productos
        const imagesFolderPath = path.join(__dirname, '..', 'assets', 'img', 'productos');
        
        const smallImageDestination = path.join(imagesFolderPath, smallImageName);
        const largeImageDestination = path.join(imagesFolderPath, largeImageName);
        
        fs.writeFileSync(smallImageDestination, imagen_pequena);
        fs.writeFileSync(largeImageDestination, imagen_grande);

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

const getProducts = async (id_usuario) => {
    const queryText = `
        SELECT p.*, l.id_producto IS NOT NULL AS likes
        FROM producto AS p
        LEFT JOIN likes AS l ON p.id_producto = l.id_producto AND l.id_usuario = $1 order by p.id_producto desc`;
    const queryParams = [id_usuario];
    try {
        const response = await pool.query(queryText, queryParams);
        const rows = response.rows;
        // console.log(rows);
        return rows;
    } catch (error) {
        throw { code: 500, message: 'Error al obtener los productos' };
    }
};

// const getProducts = async (id_usuario) => {
//     const queryText = 'SELECT * FROM producto';
//     try {
//         const response = await pool.query(queryText);
//         const rows = response.rows;
//         const rows2 = [];
//         for (let i = 0; i < rows.length; i++) {
//             const row = rows[i];
//             const id_producto = row.id_producto;
//             const queryText2 = 'SELECT * FROM likes WHERE id_producto = $1 AND id_usuario = $2'
//             const queryParams = [id_producto, id_usuario]
//             const response2 = await pool.query(queryText2, queryParams)
//             console.log(id_usuario)
//             console.log(response2.rowCount)
//             let likes;
//             if (response2.rowCount === 0) {
//                 likes = false
//             } else {
//                 likes = true
//             }
//             console.log("el like es:" + likes)
//             rows2.push({id_producto: row.id_producto, nombre: row.nombre, numero: row.numero, imagen_pequena: row.imagen_pequena, imagen_grande: row.imagen_grande, detalle: row.detalle, precio: row.precio, stock: row.stock, id_usuario: row.id_usuario, likes: likes})
//         }
//         console.log(rows2);
//         return rows2;
//     } catch (error) {
//         throw { code: 500, message: 'Error al obtener los productos' };
//     }
// };

const productDetails = async (id_producto, id_usuario) => {
    const queryText = 'SELECT p.*, l.id_producto IS NOT NULL AS likes FROM producto AS p LEFT JOIN likes AS l ON p.id_producto = l.id_producto AND l.id_usuario = $1 WHERE p.id_producto=$2;';
    const queryParams = [id_usuario,id_producto]
    try {
        const response = await pool.query(queryText, queryParams);
        //console.log(response.rows[0])
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