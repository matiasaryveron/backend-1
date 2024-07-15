import { Router } from "express";
import CartManager from "../dao/db/cart-manager-db.js";
import CartModel from "../dao/models/cart.model.js"

const router = Router();
const cartManager = new CartManager();


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.log("Error al crear un nuevo carrito");
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/:cid", async (req, res) => {

    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId);

        return res.json(carrito.products);

    } catch (error) {

        console.log("Error al obtener el carrito");

        res.status(500).json({ error: "Error interno del servidor" });
    }
});




router.post("/:cid/product/:pid", async (req, res) => {
    
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.log("Error al agregar producto al carrito");
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;