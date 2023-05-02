import fs from 'fs'

class cartManager {
    constructor(path) {
      this.path = path
      this.products = []
      this.init = (path)
    }
    init(path) {
        let file = fs.existsSync(path)
        
        if (!file) {
            
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            this.product = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
          }
          
    async addCart ({ Ncarrito,precio_final,codigo }) {
        try{
            let id 
        if(this.products.length===0) {
          id = 1
        }else {
          let ultimo_producto= this.products[this.products.length-1]
           id = ultimo_producto.id + 1
        }
    let producto = { Ncarrito, precio_final,codigo }
    this.products.push(producto)
    let producto_JSON = JSON.stringify(this.products,null,2)
    await fs.promises.writeFile(this.path,producto_JSON)
    console.log(id)
    }
    catch(error){
        console.log('addCart error')
    }
  }

  async getCart() {
    console.log(this.products)
     
    if (this.products.length==0) {
     console.log('not found')
    }
    return this.products
  }

async getCartById(id) {
    let carro = this.products.find(producto=>producto.id===id) 
    console.log(carro)
    if(carro) {
  console.log(carro)
  return carro
    }else{
  console.log('getProductById error')
    }
  }
}

let cart = new cartManager('./data/cart.json')

async function carrit() {
    await cart.addCart({ Ncarrito: 1, precio_final: 60.000, codigo: 'hln' })
    await cart.addCart({ Ncarrito: 2, precio_final: 90.000, codigo: 'lpm' })
    await cart.addCart({ Ncarrito: 3, precio_final: 120.000, codigo: 'kkj' })
    await cart.getCartById(3)
    //await cart.getCart()
}

//carrito()
export default cart