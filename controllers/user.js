const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(403).json({
        total,
        usuarios
    });
}

const putUsuarios = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra BD
    if (password) {
        // Encriptar pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(400).json(usuario);
}

const postUsuarios = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const deleteUsuarios = async(req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.status(403).json(usuario);
}

const patchUsuarios = (req, res) => {
    res.status(403).json({
        msg: 'patch API - Controlador'
    });
}

module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
}