import dotenv from "dotenv";
import knex from "knex";
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
    options:{
        client: 'mysql',
        connection:{
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'productos'
        }
    },
};
const BBDD = knex(config.options)
 export {config,BBDD};