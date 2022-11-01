import dotenv from "dotenv";
dotenv.config();

const dirProductos = "productos";
const dirCarrito = 'carrito'

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
    },
    DATABASE:{
        filesystem:{
            dirProductos,
            dirCarrito,
        },
    },
};
 export {config};