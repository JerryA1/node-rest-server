const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, getCategorias, putCategorias, deleteCategoria, getCategoria } = require('../controllers/categoria');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategorias);

// Obtener una categoria por id - publico
router.get(
    '/:id',
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    getCategoria
);

// Crear una categoria - privado - Cualquier persona con token valido
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    crearCategoria
);

// Actualizar una categoria - privado - Cualquier persona con token valido
router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putCategorias
);

// Borrar una categoria - admin
router.delete(
    '/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    deleteCategoria
);

module.exports = router;