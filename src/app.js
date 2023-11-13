
const express = require ('express');
const productsRouter=require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname,'/public')));
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.get('/bienvenida',(req, res)=>{

    res.setHeader("Content-Type","text/html")
    res.send("<h2 style='color:orange;'>Hola profe!!!</h2>")
})


const server = app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
