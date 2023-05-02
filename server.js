import  express  from "express";
import productM from './product.js'
import cart from './cart.js'

let server = express()

let PORT = 8080

let ready = ()=> console.log('servidor listo en puerto'+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended : true}))

let product_route = '/api/products/:pid'

 let product_function = (req,res)=> {
    let param = req.params
    let id = Number(param.id)
   let uno = productM.getProductById(id)
   console.log(uno)
   if(uno) {
    return res.send({
        succes: true,
        product: {uno}
       })
   }else{
    return res.send({
        succes: false,
        product: {}
       })
   }
   
 }

 server.get(product_route,product_function)

 let index_route = '/api/products'
 let index_function = (req,res)=> {
  let limit = productM.get_product().length
  console.log(limit)
  return res.send(`there are ${limit} products`)
 }

 server.get(index_route,index_function)

let cart_route = '/api/carts'

let cart_function = (req,res)=> {
let carros = cart.getCart().length
console.log(carros)
return res.send({
    succes: true,
    response: [cart]
})
}

server.get(cart_route,cart_function)

let car_route = '/api/carts/:cid'

let car_function = (req,res)=> {
    let parametro = req.parametro
    let cid = Number(parametro.id)
    let dos = cart.getCartById(cid)
    console.log(dos)

    if(uno) {
        return res.send({
            succes: true,
            product: {dos}
           })
       }else{
        return res.send({
            succes: false,
            product: {}
           })
       }
}