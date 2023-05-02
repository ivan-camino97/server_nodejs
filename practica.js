import  express  from "express";
import productM from './product.js'

let server = express()

 let PORT = 8000
 let ready = ()=> console.log('server ready on PORT'+PORT)

 server.listen(PORT,ready)
 server.use(express.urlencoded({extended : true}))

 let index_route = '/'
 let index_function = (req,res)=> {
  let quantity = productM.get_product().length
  console.log(quantity)
  return res.send(`there are ${quantity} products`)
 }

 server.get(index_route,index_function)

 let product_route = '/product/:id'

 let product_function = (req,res)=> {
    let param = req.params
    let id = Number(param.id)
   let uno = productM.getProductById(id)
   console.log(uno)
   if(uno) {
    return res.send({
        succes: true,
        product: uno
       })
   }else{
    return res.send({
        succes: false,
        product: 'no existe'
       })
   }
   
 }

 server.get(product_route,product_function)

let query_route = '/query'

 let query_function = (req,res)=>{
    let quantity = req.query.quantity ?? 3
let products = productM.get_product().slice(0,quantity)
if(products.length>0) {
    return res.send({
        succes: true,
        products
    })
}else {
    return res.send({
        succes: false,
        products: 'no compatible'
    })
}

 }

 server.get(query_route,query_function)
