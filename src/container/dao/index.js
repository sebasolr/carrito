import { Crud } from'../crud.js';
import { config } from'../../config/index.js';

const ProductsBD = new Crud(
    config.DATABASE.filesystem.dirProductos
);
const CartBD =new Crud(
    config.DATABASE.filesystem.dirCarrito
    );

export {ProductsBD, CartBD};