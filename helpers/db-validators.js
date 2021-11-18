const Role = require('../models/role');
const usuario = require('../models/usuario');
const categoria = require('../models/categoria');
const producto = require('../models/producto');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`);
    }
}

const emailExiste = async(correo = '') => {
    // Verificar si correo existe
    const existeEmail = await usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    // Verificar si usuario existe
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaPorId = async(id) => {
    // Verificar si categoria existe
    const existeCategoria = await categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProductoPorId = async(id) => {
    // Verificar si categoria existe
    const existeProducto = await producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}