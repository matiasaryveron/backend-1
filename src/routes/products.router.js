import { Router } from "express";
import ProductManager from "../dao/db/product-manager-db.js";
const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    
    try {

        const { limit = 10, page = 1, sort, query } = req.query;

        const productos = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
        });
} catch (error) {
        console.log("Error al obtener producto");
        res.status(500).json({
            error: "Error  del servidor"
        });
    }
});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }
        res.json(producto);
    } catch (error) {
        console.log("Error al obtener producto", error);
        res.status(500).json({
            error: "Error  del servidor"
        });
    }
});


router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado exitosamente"
        });
    } catch (error) {
        console.log("Error al agregar producto", error);
        res.status(500).json({
            error: "Error  del servidor"
        });
    }
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try {
        await productManager.updateProduct(id, productoActualizado);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        console.log("Error al actualizar producto", error);
        res.status(500).json({
            error: "Error  del servidor"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.log("Error al eliminar producto");
        res.status(500).json({
            error: "Error  del servidor"
        });
    }
});

export default router;