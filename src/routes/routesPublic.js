import { Router } from "express";
const routerPublic = Router()

routerPublic.get('/', (req, res) => {
    res.sendFile('../public/index.html');
})
routerPublic.get('*', (req, res) => {
    res.json({error:-2,direccion:req.params})
})
export default routerPublic