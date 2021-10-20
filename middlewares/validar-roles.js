const { response } = require("express")

const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin verificar token primero'
        });
    }
    const { rol, nombre } = req.usuario;
    
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto `
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin verificar token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio solo es disponible para estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}