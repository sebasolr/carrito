import { Router } from "express";
const router = Router()
import { Crud } from "../../utils/crud.js";

const crud = new Crud("bd");

router.get('/',async(req, res) => {
    const productos = await crud.getAll()
    res.render("cardsProducto",{productos})
})
router.get('*', (req, res) => {
    res.json({error:-2,direccion:req.params})
})
export {router as OtherRouter}