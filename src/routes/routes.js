const router = require('express').Router();
const users = require('../controllers/userControllers');
const products = require('../controllers/productControllers');
const likes = require('../controllers/likesControllers');
const cart = require('../controllers/cartControllers')
const middleware = require('../middleware/middleware');

//Users
router.post('/registrar', users.postUser);
router.post('/iniciar_sesion', middleware.credencialVerify, users.loginUser);
router.get('/perfil', middleware.tokenValidation, users.getUserInfo);

//Products
router.post('/nuevo_producto', middleware.tokenValidation, middleware.isNormalUser, products.postProduct); //Solo Administrador
router.put('/editar_producto/:id_producto', middleware.tokenValidation, middleware.isNormalUser, products.editProduct); //Solo Administrador
router.get('/productos', middleware.tokenValidation, products.getProducts);
router.get('/detalles/:id_producto', middleware.tokenValidation, products.getProductById);
router.get('/favoritos', middleware.tokenValidation, products.getFavoritos)
router.get('/publicaciones', middleware.tokenValidation, middleware.isNormalUser, products.getPublicaciones); //Solo Administrador
router.get('/producto/:id_producto', middleware.tokenValidation, middleware.isNormalUser, products.getProductoModificar); //Solo Administrador

//likes
router.post('/likes/:id_producto', middleware.tokenValidation, likes.postLike);
router.delete('/dislikes/:id_producto', middleware.tokenValidation, likes.deleteLike);

//carrito
router.post('/carrito', middleware.tokenValidation, cart.postCart);

//ordenes
router.get('/orden_compras', middleware.tokenValidation, middleware.isNormalUser, cart.getOrdenes) //Solo Administrador
router.put('/estado', middleware.tokenValidation, middleware.isNormalUser, cart.putEstado) //Solo Administrador
router.get('/estados', middleware.tokenValidation, middleware.isNormalUser, cart.getEstados) //Solo Administrador

module.exports = router;