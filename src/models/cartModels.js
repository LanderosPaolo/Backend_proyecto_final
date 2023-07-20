const pool = require('../config/db');
const { format } = require('date-fns');
const userModel = require('../models/userModels');

const addToCart = async (id_usuario, datosBody) => {
    /* informacion del usuario para obtener la direccion */
    const user = await userModel.getUserById(id_usuario);
    const direccion = user.direccion
    /* fin */
    const { detalle_productos } = datosBody;
    let detalle = [];
    const fechaActual = new Date();
    const fecha_venta = format(fechaActual, 'dd-MM-yyyy');
    let total = 0;
    for (const detalle_producto of detalle_productos) {
        // console.log(detalle_producto.id_producto," ", detalle_producto.cantidad)
        const id_p = detalle_producto.id_producto;
        const cantidad = detalle_producto.cantidad;
        const queryText = 'SELECT * FROM producto WHERE id_producto = $1'
        const queryParams = [id_p]
        const result = await pool.query(queryText, queryParams);
        // console.log(result.rows[0]);
        const { id_producto, stock, precio, nombre, numero } = result.rows[0];
        const totalUnitario = precio * cantidad
        total = total + totalUnitario
        /* --> Actualización del stock de producto <--- */
        const stockNuevo = stock - cantidad
        if (stockNuevo < 0) {
            console.log(`No hay stock suficiente de producto: ${nombre}, número: ${numero}. No se agrega a la orden de compra. `)
        } else {
            const queryStock = 'UPDATE producto SET stock = $1 WHERE id_producto = $2'
            const queryParamsStock = [stockNuevo, id_producto]
            await pool.query(queryStock, queryParamsStock)
            /* -->Fin de actualización del stock de producto <--- */
            const objeto = {
                id_producto,
                cantidad,
                precio,
                nombre,
                numero,
                fecha_venta,
                totalUnitario,
                direccion
            }
            detalle.push(objeto);
        }
    }
    let detalleP = detalle
        .map((objeto) => `Fecha: ${objeto.fecha_venta}, id_producto: ${objeto.id_producto}, nombre: ${objeto.nombre.toUpperCase()}, número: ${objeto.numero}, cantidad: ${objeto.cantidad}, precio: ${objeto.precio}, total: ${objeto.totalUnitario},`)
        .join('\n');
    detalleP += `\nDirección de entrega: ${direccion}`;
    const detalle_final = "Registro de orden de compra: \n" + detalleP + '\n' + "El total a pagar corresponde a: " + total
    console.log(detalle_final);
    const queryOrdenDeCompra = 'INSERT INTO orden_compra (fecha_venta, detalle_productos, id_usuario) VALUES ($1, $2, $3)'
    const params = [fechaActual, detalle_final, id_usuario]
    // console.log(fechaActual);
    await pool.query(queryOrdenDeCompra, params)
    return detalle_final
}

module.exports = {
    addToCart
}