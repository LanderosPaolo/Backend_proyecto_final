const pool = require('../config/db');
const { format } = require('date-fns');
const userModel = require('../models/userModels');
const numbers = require('../utils/numbers');

const changeEstado= async (id_usuario, datosBody) => {

    const {id_orden_compra, id_estado} = datosBody;
    const queryText = '	UPDATE orden_compra SET id_estado=$1 WHERE id_orden_compra=$2;'
    const queryParams = [id_estado, id_orden_compra];
    const result = await pool.query(queryText, queryParams);

    if (result.rowCount===1) {
        const queryText2 = `
        SELECT a.*, b.nombre AS estado FROM orden_compra AS a 
        INNER JOIN estado AS b ON a.id_estado=b.id_estado
        WHERE a.id_orden_compra=$1
        order BY a.id_orden_compra desc`;

        const queryParams2 = [id_orden_compra];
        const result2 = await pool.query(queryText2, queryParams2);
        console.log ("orden de compra: ", result2.rows[0])
        return result2.rows[0];
    }
    else{
        return "error";
    }
    


}

const addToCart = async (id_usuario, datosBody) => {
    /* informacion del usuario para obtener la direccion */
    const user = await userModel.getUserById(id_usuario);
    const nombreUsario=user.nombre+" "+user.apellido;
    const direccion = user.direccion
    /* fin */
    const { detalle_productos } = datosBody;
    let detalle = [];
    let detalle_sin_stock = []
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

        /* --> Actualización del stock de producto <--- */
        const stockNuevo = stock - cantidad

        //Si el stock es negativo no agregar al total:
        if (stockNuevo < 0) total = total + 0
        else total = total + totalUnitario

        if (stockNuevo < 0) {
            const frase = `Producto: ${nombre}, número: ${numero}. No se agrega a la orden de compra.`
            console.log(frase)
            detalle_sin_stock += frase + '<br/>';

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

    let detalleP = detalle.map((objeto) => `id_producto: ${objeto.id_producto}, nombre: ${objeto.nombre.toUpperCase()}, número: ${numbers.formatLatin(objeto.numero)}, cantidad: ${numbers.formatLatin(objeto.cantidad)}, precio: ${numbers.formatLatin(objeto.precio)}, total: ${numbers.formatLatin(objeto.totalUnitario)}.`).join('<br/>');
    detalleP += `<br/>Fecha de compra: ${fecha_venta}<br/>Nombre usuario: ${nombreUsario}<br/>Dirección de entrega: ${direccion}`;
    const detalle_casi_final = "Registro de orden de compra: <br/>" + detalleP + '<br/>' + "El total a pagar corresponde a: " + numbers.formatLatin(total);

    //En caso de que no exista stock o que si exista 
    let detalle_final;
    if (detalle_sin_stock.length != 0) {
        detalle_final = detalle_casi_final + "<br/> ----------------<br/>" + "Productos que no fueron agregados por falta de stock: <br/>" + detalle_sin_stock;
    } else {
        detalle_final = detalle_casi_final;
    }
    //Fin En caso de que no exista stock o que si exista 
    if (total === 0) {
        return 'No se genera orden de compra por que el total de venta es 0.'
    } else {
        console.log(detalle_final);
        const queryOrdenDeCompra = 'INSERT INTO orden_compra (fecha_venta, detalle_productos, id_usuario) VALUES ($1, $2, $3)';
        const params = [fechaActual, detalle_final, id_usuario];
        // console.log(fechaActual);
        await pool.query(queryOrdenDeCompra, params);
        return detalle_final;
    }
}

const ordenesCompras = async (pageSize,offset) => {
    const queryText = `	SELECT a.*, b.nombre AS estado FROM orden_compra AS a 
	INNER JOIN estado AS b ON a.id_estado=b.id_estado
	order BY a.id_orden_compra desc LIMIT $1 OFFSET $2`;
    const queryParams = [pageSize,offset];
    try {
        const response = await pool.query(queryText,queryParams);
        return response.rows
    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }
}
const obtenerEstados = async () => {
    const queryText = `	SELECT * from estado order by id_estado`;
    try {
        const response = await pool.query(queryText);
        return response.rows
    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }
}

module.exports = {
    addToCart,
    ordenesCompras,
    changeEstado,
    obtenerEstados
}