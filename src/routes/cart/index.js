import { Router } from "express";
import { CartBD, ProductsBD } from "../../container/dao/index.js";
import {
    DATE_UTILS,
    JOI_VALIDATOR,
    ERROR_UTILS
} from '../../utils/index.js';

const router = Router()

router.get('/carrito', async (req, res) => {
    try {
        const articulos = await CartBD.getAll();
        const precioTotal = articulos.map(item => item.precio)
        const total =0
       const subtotal =precioTotal.reduce((x, y)=>x+y,total);
       
        if(!articulos){
            return res.send({error: ERROR_UTILS.Mensaje.no_products});
        }
        res.render("carrito",{articulos,subtotal}) 
    } catch (error) {
        res.send({error: 'problema con el servidor'})
    }  
});

router.post('/carrito', async(req, res) => {
    try {
        const {id} =req.body;
        const addProduct = await JOI_VALIDATOR.cart.validateAsync({
            id,
            timestamp: DATE_UTILS.getTimestamp(),
        });
        const products = await ProductsBD.getById(id)
        addProduct.products.join(products)
        const addProductToCart = await CartBD.create(addProduct)

        res.redirect('/carrito')
    } catch (error) {
        res.send(ERROR_UTILS.Mensaje.no_cart)
    }

});

router.put('/carrito', (req, res) => {});

router.delete('/carrito', (req, res) => {

});

export {router as CartRouter};