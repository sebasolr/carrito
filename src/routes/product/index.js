import { Router } from "express";
import { ProductsBD } from "../../container/dao/index.js";
import { verifyRole } from "../../middleware/verifyRole.js";
import{
    DATE_UTILS,
    ERROR_UTILS,
    JOI_VALIDATOR,
} from '../../utils/index.js';

const router = Router()

router.get('/productos', async (req, res) => {
try {
    const articulos = await ProductsBD.getAll();
    if(!articulos){
        return res.send({error: ERROR_UTILS.Mensaje.no_products});
    }
    res.render("productos",{articulos}) 
} catch (error) {
    res.send({error: 'problema con el servidor'})
}
});

router.get('/productos/:id', async (req, res) => {
    const {id} = req.params;
    const numberID = parseInt(id)
    const productos = await crud.getById(numberID)
    res.render("cardsProducto",{productos})
});


router.post('/productos', verifyRole,(req, res) => {
    crud.create(req.body)
    res.redirect('/api/productos')
});

router.put('/productos', (req, res) => {

});

router.delete('/productos', async(req, res) => {
    remove.addEventListener('click', async(req, res)=>{
        const {id} =req.body;
        await crud.deleteById(id)
        res.redirect('/api/productos')
    })
});

export {router as ProductsRouter};