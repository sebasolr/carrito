import { Router } from "express";
import { Crud } from "../utils/crud.js";

const crud = new Crud("bd");
const router = Router()


router.get('/productos', async (req, res) => {
    const articulos = await crud.getAll()
    console.log({articulos});
    res.render("productos",{articulos})
});

router.post('/productos', (req, res) => {
    crud.create(req.body)
    res.redirect('/api/productos')
});

router.put('/productos', (req, res) => {

});

router.delete('/productos', (req, res) => {

});
router.get('/productos/:id', (req, res) => {
    
})

router.get('/carrito', (req, res) => {
    crud.read()
    res.json({Pagina:"funcionando"})
});

router.post('/carrito', (req, res) => {});

router.put('/carrito', (req, res) => {});

router.delete('/carrito', (req, res) => {});

export default router;