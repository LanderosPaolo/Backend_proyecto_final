const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const addUser = async (usuario) => {
    try {
        const { nombre, apellido, email, direccion, telefono, contrasena } = usuario;
        const password = contrasena;
        if (!email || !password) {
            console.log("Datos incompletos, se deben completar todos antes de continuar.")
            throw { code: 400, message: "Datos incompletos." };
        }
        console.log("Se ingresaron todos los datos, se puede continuar. ");
        const emailExistente = await pool.query("SELECT email FROM usuario WHERE email = $1", [email]);
        if (emailExistente.rows.length > 0) {
            throw { code: 400, message: "El email ya está registrado." };
        } else {
            const passwordEncriptada = bcrypt.hashSync(password);
            const values = [nombre, apellido, email, direccion, telefono, passwordEncriptada];
            const consulta = "INSERT INTO usuario (nombre, apellido, email, direccion, telefono, password) values($1,$2,$3,$4,$5,$6) RETURNING *";
            const result = await pool.query(consulta, values);
            console.log("Usuario creado con éxito.")
            return result.rows[0];
        }
    } catch (error) {
        if (error.code) {
            throw error;
        } else {
            console.log("Hay un error interno en el sistema.");
            throw { code: 500, message: "Hay un error interno en el sistema." };
        }
    }
}

const verifyUser = async (email, password) => {
    let usuario;
    let rowCount;
    const values = [email];
    const consulta = "SELECT * FROM usuario WHERE email = $1";
    try {
        const result = await pool.query(consulta, values);
        usuario = result.rows[0];
        rowCount = result.rowCount;
    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }
    if (!usuario || !usuario.password) {
        throw { code: 401, message: "Usuario no existe en el sistema." };
    }
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta || !rowCount) {
        throw { code: 401, message: "Email o contraseña incorrecta." };
    }
};

const getUser = async (email) => {
    const queryText = "SELECT * FROM usuario WHERE email = $1";
    const queryParams = [email];
    try {
        const response = await pool.query(queryText, queryParams);
        user = response.rows[0];
        rowCount = response.rowCount;
        const { id_usuario, email, nombre, apellido, direccion, telefono, administrador } = user;
        const user_state = { id_usuario, email, nombre, apellido, direccion, telefono, administrador }
        return user_state;
    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }
}

const getUserById = async (id) => {
    const queryText = 'SELECT * FROM usuario WHERE id_usuario = $1';
    const queryParams = [id];
    try {
        const response = await pool.query(queryText, queryParams);
        if (!response) {
            throw { code: 404, message: 'Usuario no encontrado' };
        }
        user = response.rows[0];
        rowCount = response.rowCount;
        const { email, nombre, apellido, direccion, telefono } = user;
        const user_state = { email, nombre, apellido, direccion, telefono }
        return user_state;
    } catch (error) {
        throw { code: 500, message: 'Error al obtener la informacion del usuario' };
    }
}

module.exports = {
    addUser,
    verifyUser,
    getUser,
    getUserById
}