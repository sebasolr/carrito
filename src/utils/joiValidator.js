import joi from 'joi';

const product = joi.object({
    titulo: joi.string().min(3).max(25).required(),
    clasificacion: joi.string().min(4).max(18).required(),
    descripcion: joi.string().min(40).max(100).required(),
    codigo: joi.string().min(4).max(4).required(),
    url: joi.string().min(5).max(150).required(),
    precio: joi.number().required(),
    stock: joi.number().required(),
    timestamp: joi.string().required(),
});

export const JOI_VALIDATOR = {product};