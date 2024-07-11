import CartModel from "../models/cart.models.js"

class CartManager {

    async crearCarrito() {
        try {
            const nuevoCarrito =new CartModel({products:[]})
            await nuevoCarrito.save()
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear carrito", error);
        }
    }
    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId)

            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
            return carrito;
        } catch (error) {
            console.log("Error al obtener el carrito por ID");
        }
    }
    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId)
            const existeProducto= carrito.products.find(item=> item.product.toString() === productId)
            if (existeProducto){
                existeProducto.quantity += quantity
            }else{
                carrito.products.push({product: productId, quantity})
            }

            carrito.markModified("products") 
            await carrito.save()
            return carrito

        } catch (error) {
            console.log("Error al crear carrito", error)
        }
    }
}


export default CartManager;