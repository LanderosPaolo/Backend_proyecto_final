require('dotenv').config();
const jwt = require("jsonwebtoken")

function credencialVerify(req, res, next) {
    if (!req.body.email || !req.body.contrasena) {
        console.log("Credenciales incompletas debe ingresar el email y password.");
        res.status(400).json({ message: 'Credenciales incompletas debe ingresar el email y password.' });
    } else {
        console.log('Credenciales existen (email y password), puede continuar.')
        next();
    }
}

const tokenValidation = (req, res, next) =>{
    const Authorization = req.header("Authorization");
    if (!Authorization) {
        console.log("Token no proporcionado.");
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }
    try {
        const token = Authorization.split("Bearer ")[1];
        const datosToken = jwt.verify(token, process.env.JWT_SECRET);
        req.datosToken = datosToken;
        console.log('Token proporcionado y validado, puede continuar con el usuario: ' + datosToken.email);
        next();
    } catch (error) {
        console.log("Token inválido.");
        res.status(401).json({ mensaje: 'Token inválido.' });
    }
}

const isNormalUser = (req, res, next) => {
    const { administrador } = req.datosToken;
    if (administrador !== 1) {
        console.log("Acceso no autorizado. Solo los administradores pueden acceder a esta ruta.");
        return res.status(403).json({ message: 'Acceso no autorizado. Solo los administradores pueden acceder a esta ruta.' });
    }
    next();
}

module.exports = {
    tokenValidation,
    credencialVerify,
    isNormalUser
}
