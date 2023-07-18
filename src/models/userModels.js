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

const verificarCredenciales = async (email, password) => {

    let usuario;
    let rowCount;

    //Verificar que el email y password están en la base de datos
    const values = [email];
    const consulta = "SELECT * FROM usuario WHERE email = $1";

    //Realizar consulta a la base de datos y verificar si hay conexión
    try {
        const result = await pool.query(consulta, values);
        usuario = result.rows[0];
        rowCount = result.rowCount;

    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }

    //Verificar si el usuario existe en la base de datos
    if (!usuario || !usuario.password) {
        throw { code: 401, message: "Usuario no existe en el sistema." };
    }

    //Obtener la password encriptada desde la base de datos
    const { password: passwordEncriptada } = usuario;
    //Encriptar la password antes de realizar la comparación
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    //Verificar que la password coincide con la que se encuentra en la base de datos
    if (!passwordEsCorrecta || !rowCount) {
        throw { code: 401, message: "Email o contraseña incorrecta." };
    }
};

const obtenerUsuario= async (email) => {
    //Verificar que el email y password están en la base de datos
    const values = [email];
    const consulta = "SELECT * FROM usuario WHERE email = $1";

    try {
        const result = await pool.query(consulta, values);
        usuario = result.rows[0];
        rowCount = result.rowCount;
        const {id_usuario, email, nombre, apellido, direccion, telefono, administrador} =usuario;
        const usuario_estado={id_usuario, email, nombre, apellido, direccion, telefono, administrador}
        return usuario_estado;

    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }

}

// const verifyUser = async (userLogin) => {
//     const { email, password } = userLogin
//     try {
//         const response = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
//         const user = response.rows[0]
//         if (!user) {
//             throw { code: 401, message: 'Usuario y/o contraseña incorrectos' };
//         }
//         const hashedPass = user.password
//         const isPassCorrect = bcrypt.compareSync(password, hashedPass)
//         if (!isPassCorrect) {
//             throw { code: 401, message: 'Usuario y/o contraseña incorrectos' }
//         }
//         return response.rows
//     } catch (error) {
//         throw { code: 500, message: 'Error al verificar el usuario' };
//     }
// }

module.exports = {
    addUser,
    // verifyUser,
    verificarCredenciales,
    obtenerUsuario
}