require('dotenv').config();
const jwt = require("jsonwebtoken")

function credencialVerify(req, res, next) {
    // Verificar si no existen el email, el password o el token en la solicitud
    if (!req.body.email || !req.body.contrasena) {
        // Si alguna de las credenciales no existe, enviar una respuesta de error
        console.log("Credenciales incompletas debe ingresar el email y password.");
        res.status(401).json({ message: 'Credenciales incompletas debe ingresar el email y password.' });
    } else {
        // Si todas las credenciales existen, pasar al siguiente middleware o a la ruta
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

module.exports = {
    tokenValidation,
    credencialVerify
}