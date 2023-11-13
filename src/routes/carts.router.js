
const CartManager = require('../manager/CartsManager')

const path = require('path')

const Router = require('express').Router;

let cartManager = new CartManager(path.join(__dirname, '..', 'data', 'carts.json'))
cartManager.addCarts('1', 'Carlos');

const router = Router()

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    id = parseInt(id);
    if (isNaN(id)) {

        return res.send('Error, ingrese un número entero');
    }

    let resultado = CartManager.getCartsbyId(id);

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json({ resultado });
})

router.post('/', async (req, res) => {
  const products = req.body;

  if (!products) {
      return res.status(400).json({ status: 'error', error: 'incompleto por favot poner productos existentes' });
  } else {
      cartManager.addCarts('1', 'Carlos');
      res.status(200).json({ status: 'success', message: 'Cart realizada' });
  }
});

  router.post("/:cid/product/:pid", async (req, res) => { 
    res.setHeader("Content-Type", "application/json"); 
    let cartId  = parseInt(req.params.cid); 
    let productId = parseInt(req.params.pid);
    let product = req.body; 
    if (isNaN(cartId) || isNaN(productId)) {
      return res.status(400).json({error: "EL numero ingresado no es valido"});
    }
    if (await cartManager.addProductToCart(cartId, product, quantity)){
      res.status(200).json({status:'success', message: "Cart creada"})
    } else {
      return res.status(400).json({status: 'error', error: "Hubo un error al crear la Cart: revisa los productos y su cantidad"})
    }
  });

module.exports = router



