import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import viewsRouter from "./routes/views.router.js"
import ProductManager from "./controllers/product-manager.js"
import "./dababase.js"

const app = express()
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static ("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")

app.use("/api/products", productsRouter)
app.use ("/api/carts",cartsRouter)
app.use("/", viewsRouter)

app.use(express.static("./src/public"))

const httpServer = app.listen(PORT, () => {
    console.log (`Escuchando en el puerto ${PORT}`)
})

/* const productManager = new ProductManager ("./src/models/productos.json")

const io = new Server (httpServer)

io.on ("connection", async (socket) => {
    console.log ("cliente conectado")

    socket.emit("productos", await productManager.getProducts());
    
    socket.on("eliminarProducto", async (id) =>{
        await productManager.deleteProduct(id);
        io.sockets.emit("productos", await productManager.getProducts())

    })
    socket.on("agregarProducto", async (producto) =>{
        await productManager.addProduct(producto)
        io.sockets.emit("productos", await productManager.getProducts())
    })
})

 */