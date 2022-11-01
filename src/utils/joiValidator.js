import joi from 'joi';

const product = joi.object({
    titulo: joi.string().min(3).max(25).required(),
    clasificacion: joi.string().min(4).max(18).required(),
    descripcion: joi.string().min(40).max(100).required(),
    codigo: joi.string().min(3).max(5).required(),
    url: joi.string().min(5).max(150).required(),
    precio: joi.number().required(),
    stock: joi.number().required(),
    timestamp: joi.string().required(),
});

const cart = joi.object({
    id: joi.number().required(),
    timestamp: joi.string().required(),
    products: {
        id: joi.number().required(),
        titulo: joi.string().required(),
        codigo: joi.string().required(),
        url: joi.string().min(5).max(150).required(),
        precio: joi.number().required(),
        stock: joi.number().required(),
    },
});
export const JOI_VALIDATOR = {product , cart};