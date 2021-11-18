const { response, request } = require("express");
const { Producto } = require('../models/index');

const getProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(403).json({
        total,
        productos
    });
}

const getProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.status(403).json({
        producto
    });
}

const crearProducto = async(req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    body.nombre = body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({ nombre: body.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

const putProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.status(400).json(producto);
}

const deleteProducto = async(req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(403).json(producto);
}

module.exports = {
    getProductos,
    getProducto,
    crearProducto,
    putProducto,
    deleteProducto
}