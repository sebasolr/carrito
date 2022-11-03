import { Router } from "express";
import { ProductsBD } from "../../container/dao/index.js";
import { verifyRole } from "../../middleware/verifyRole.js";
import { BBDD } from "../../config/index.js";
import{
    DATE_UTILS,
    ERROR_UTILS,
    JOI_VALIDATOR,
} from '../../utils/index.js';

const router = Router()

router.get('/productos', async (req, res) => {
try {
    BBDD.from('producto').select("*")
    .then((rows)=>{
        for(let row of rows) {
            (`${row['id']} ${row['titulo']} ${row['precio']}`);
    }
}).catch((err) =>{console.log(err) });
    
        
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
    const productos = await ProductsBD.getById(numberID)
    res.render("cardsProducto",{productos})
});


router.post('/productos', verifyRole, async (req, res) => {
    try {
        const {titulo, clasificacion, descripcion, codigo, url, precio, stock } =req.body;
        const producto =  await JOI_VALIDATOR.product.validateAsync({
            titulo,
            clasificacion,
            descripcion,
            codigo,
            url,
            precio,
            stock,
            timestamp: DATE_UTILS.getTimestamp(),
        });
        BBDD.from('producto').insert(producto)
        .then(() => console.log('data inserted successfully'))
        .catch(err =>{ console.log(err); throw err });
        const createArticulo = await ProductsBD.create(producto)
        res.redirect('/api/productos')
    } catch (error) {

        res.send(error)
    }
});

router.put('/productos', (req, res) => {

});

router.post('/productos/delete', async(req, res) => {
        const {id} = req.body
        await ProductsBD.deleteById(id)
        res.redirect('/api/productos')
   
});

export {router as ProductsRouter};