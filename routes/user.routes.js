const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/user');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const router = Router();

router.get('/', getUsuarios);

router.put(
    '/:id',
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    putUsuarios
);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({ min: 6 }),
        // check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    postUsuarios);

router.delete(
    '/:id',
    [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],
    deleteUsuarios
);

router.patch('/', patchUsuarios);

module.exports = router;