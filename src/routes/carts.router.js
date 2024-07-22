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


router.delete("/:cid/products/:pid", async (req, res) => {

    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const actualizarCarrito = await cartManager.eliminarProductoDelCarrito(cartId, productId);
        if (actualizarCarrito) {
            res.json(actualizarCarrito.products);
        } else {
            res.status(404).json({ error: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        console.log("Error al eliminar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/:cid", async (req, res) => {

    const cartId = req.params.cid;
    const productos = req.body.products;

    try {
        const actualizarCarrito = await cartManager.actualizarCarrito(cartId, productos);
        if (actualizarCarrito) {
            res.json(actualizarCarrito.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.log("Error al actualizar el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const actualizarCarrito = await cartManager.actualizarCantidadProducto(cartId, productId, quantity);
        if (actualizarCarrito) {
            res.json(actualizarCarrito.products);
        } else {
            res.status(404).json({ error: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        console.log("No se pudo actualizar cantidad", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete("/:cid", async (req, res) => {
    
    const cartId = req.params.cid;

    try {
        const actualizarCarrito = await cartManager.eliminarTodosLosProductos(cartId);
        if (actualizarCarrito) {
            res.json(actualizarCarrito.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("No se pudo eliminar ccarrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

















export default router;