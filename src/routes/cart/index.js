import { Router } from "express";
import { Crud } from "../../container/crud.js";

const crud = new Crud("cart");
const router = Router()

router.get('/carrito', (req, res) => {
    crud.read()
    res.json({Pagina:"funcionando"})
});

router.post('/carrito', (req, res) => {});

router.put('/carrito', (req, res) => {});

router.delete('/carrito', (req, res) => {

});

export {router as CartRouter};