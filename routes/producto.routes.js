const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, putProducto, getProductos, getProducto, deleteProducto } = require('../controllers/producto');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', getProductos);

router.get(
    '/:id',
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ],
    getProducto
);

router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos
    ], 
    crearProducto
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProductoPorId),
        // check('categoria', 'La categoria es obligatoria').isMongoId(), 
        validarCampos
    ],
    putProducto
);

router.delete(
    '/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ],
    deleteProducto
);

module.exports = router;