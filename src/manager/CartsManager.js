const fs = require('fs');

class CartManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.carts = [];

        if (fs.existsSync(this.path)) {
            const fileData = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(fileData);
        }
    }

    getCarts(){
        return this.carts;
    }
    addCarts(id, nombre) {
        this.carts.push({ id, nombre });
    }
    getCartsbyId(cartId){
        return this.carts.find(cart => cart.id === cartId);
    }
    getCartsProducts(cartId){
        const cart = this.getCartsbyId(cartId);
    return cart ? cart.products : [];
    }
    async addProductsToCart(cartId, product, quantity) {
        const cart = this.getCartsbyId(cartId);

        if (cart) {
            const existingProduct = cart.products.find(elem => elem.title === product.title);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ id: product.id, title: product.title, quantity: quantity });
            }
        }
    }
    
    deleteProductInCart(cartId, productId){
        const cart = this.getCartsbyId(cartId);
    if (cart) {
        cart.products = cart.products.filter(product => product.id !== productId);
    }
    }
    emptyCart(cartId){
        const cart = this.getCartsbyId(cartId);
        if (cart) {
            cart.products = [];
    }
}
}

module.exports=CartManager

