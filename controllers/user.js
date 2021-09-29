const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit  } = req.query;
    res.status(403).json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const putUsuarios = (req, res) => {
    const { id } = req.params;
    res.status(400).json({
        msg: 'put API - Controlador',
        id
    });
}

const postUsuarios = (req, res) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'post API - Controlador',
        nombre, edad
    });
}

const deleteUsuarios = (req, res) => {
    res.status(403).json({
        msg: 'delete API - Controlador'
    });
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