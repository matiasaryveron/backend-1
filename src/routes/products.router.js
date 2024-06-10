import { Router } from "express";
const router = Router();

const products = []

router.get("/api/products", (req, res) => {
    res.json(products)
})


router.post("/api/products", (req, res) => {
    const nuevoProducto = req.body
    products.push(nuevoProducto)
    res.send("Producto creado correctamente")
})

export default router