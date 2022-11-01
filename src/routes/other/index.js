import { Router } from "express";
import { ProductsBD } from "../../container/dao/index.js";
const router = Router()


router.get('/',async(req, res) => {
    const productos = await ProductsBD.getAll()
    res.render("cardsProducto",{productos})
})
router.get('*', (req, res) => {
    res.json({error:-2,direccion:req.params})
})
export {router as OtherRouter}