import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* app.get ("/", (req, res) => {
    res.send('Bienvenidos!')
}) */
app.use("/api/products", productsRouter)
app.use ("/api/carts",cartsRouter)

app.use(express.static("./src/public"))

app.listen(PORT, () => {
    console.log (`Escuchando en el puerto ${PORT}`)
})


/* const fs = require("fs").promises;

class ProductManager {
    static lastId= 0
    constructor(path) {
    this.products=[]
    this.path = path;
}
async addProduct (tittle, description,price,thumbnail,code,stock) {
    if (!tittle || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son requeridos")
        return;
    }
    if ( this.products.some (item => item.code === code)){
        console.log ("el codigo debe ser unico")
        return;
    }
    const nuevoProducto = {
        id: ProductManager.lastId++,
        tittle,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    this.products.push(nuevoProducto);

await this.guardarArchivo(this.products)
}
async getProducts () {
    let arrayProductos = await this.leerArchivo();
    return arrayProductos;
}
getProductsById (id) {
    const producto = this.products.find(item =>item.id === id)

    if (!producto){
    console.log("Not found");
} else {
    console.log(producto);
}
}
async guardarArchivo (arrayProductos){
    try { 
        await fs.readFile(this.path, JSON.stringify(arrayProductos, null, 2))
    } catch (error){
        console.log ("Error al pasar archivo", error);
    }
}

async leerArchivo () {
    try {
       const respuesta = await fs.readFile(this.path, "utf-8")
       const array = JSON.parse(respuesta)
       return array;
    } catch (error) {
        console.log ("Error al leer el archivo")
    }
}}
const manager = new ProductManager("./productos.json")

const retornarProductos = async () => {
    let respuesta = await manager.getProducts();
        console.log (respuesta)
}
retornarProductos()

const agregarProducto = async () =>{
    await manager.addProduct("producto prototipo", "producto de prueba 2", 1000, "sin imagen","abc321",30)
}

agregarProducto()  */