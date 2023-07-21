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
router.post('/nuevo_producto', middleware.tokenValidation, products.postProduct);
router.put('/editar_producto/:id_producto', middleware.tokenValidation, products.editProduct);
router.get('/productos', middleware.tokenValidation, products.getProducts);
router.get('/detalles/:id_producto', middleware.tokenValidation, products.getProductById);
router.get('/favoritos', middleware.tokenValidation, products.getFavoritos)
router.get('/publicaciones', middleware.tokenValidation, products.getPublicaciones);
router.get('/producto/:id_producto', middleware.tokenValidation, products.getProductoModificar);

//likes
router.post('/likes/:id_producto', middleware.tokenValidation, likes.postLike);
router.delete('/dislikes/:id_producto', middleware.tokenValidation, likes.deleteLike);

//carrito
router.post('/carrito', middleware.tokenValidation, cart.postCart);

//ordenes
router.get('/orden_compras', middleware.tokenValidation, cart.getOrdenes)

module.exports = router;