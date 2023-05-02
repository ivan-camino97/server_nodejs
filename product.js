//const fs = require('fs')
import fs from 'fs'

class ProductManager {
    constructor(path) {
    this.path = path
    this.product = []
    this.init(path)
    }
    init(path) {
         //verifico si existe el archivo
         let file = fs.existsSync(path)
         //console.log(file)
         if (!file) {
             //si no existe lo creo
             fs.writeFileSync(path,'[]')
             console.log('file created at path: '+this.path)
             return 'file created at path: '+this.path
         } else {
             //si existe cargo los usuarios en la memoria del programa
             this.product = JSON.parse(fs.readFileSync(path,'UTF-8'))
             console.log('data recovered')
             return 'data recovered'
         }
           }  
           //agrega los productos al array vacio del archivo
   async addProduct ({ title,description,price,thumbnail,stock }) {
    try{
        let id 
    if(this.product.length===0) {
      id = 1
    }else {
      let ultimo_producto= this.product[this.product.length-1]
       id = ultimo_producto.id + 1
    }
   let producto = { title,description,price,thumbnail,stock,id }
   this.product.push(producto)
    let producto_JSON = JSON.stringify(this.product,null,2)
    await fs.promises.writeFile(this.path,producto_JSON)
    console.log(id)
}
    catch(error){
        console.log('addProduct error')
    }
    }
    //devuelve el array con todos los productos guardados
    get_product () {
     console.log(this.product)
     
     if (this.product.length==0) {
      console.log('not found')
     }
     return this.product
    }
    //devuelve un objeto con todas las prop del producto mediante el id
    getProductById (id) {
  let zapatillas = this.product.find(producto=>producto.id===id) 
  console.log(zapatillas)
  if(zapatillas) {
console.log(zapatillas)
return zapatillas
  }else{
console.log('getProductById error')
  }
    }
    //modifica propiedades mediante los parametros id,data
   async upDateProduct(id,data) {
    try{
        let prod = this.getProductById(id)

        for(let prop in data) {
            console.log(data)
            prod[prop] = data[prop]
        }
    let producto_JSON = JSON.stringify(this.product,null,2)
    await fs.promises.writeFile(this.path,producto_JSON)
    console.log('idProduct:done')
       }
       catch(error) {
         console.log('upDateProduct: error')
       } 
    }
    //elimina producto del archivo
async deleteProduct(id) {
    try {
        this.product = this.product.filter(each=>each.id!==id)
        console.log(this.product)
        let producto_JSON = JSON.stringify(this.product,null,2)
        await fs.promises.writeFile(this.path,producto_JSON)
        console.log('delete product:done '+id)
        return 'delete product: '+id
    } catch(error) {
        console.log(error)
        return 'delete product:error'
    }
}
}

let productM = new ProductManager('./data/data.json')

async function manage () {

 await productM.addProduct({ title: 'adidas ozzelia',description: 'ozzelia beige' ,price: 50.000,thumbnail: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a27f5b4b0d524cc2b540ad2f00d3be5f_9366/Zapatillas_Ozelia_Beige_GV7685_01_standard.jpg' ,stock: 13 })
 await productM.addProduct({ title: 'adidas forum',description: 'adidas forum low' ,price: 90.000,thumbnail: 'https://essential.vtexassets.com/arquivos/ids/435382-800-auto?v=637582266896100000&width=800&height=auto&aspect=true' ,stock: 9 })
 await productM.addProduct({ title: 'nike air max',description: 'air max 97' ,price: 45.000,thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/075/480/products/zapatillas-nike-air-max-97-dj0717-0011-1ab4d682bb0d2ad0f216402959460563-640-0.webp',stock: 5 })
 await productM.addProduct({ title: 'nike md runner 2',description: 'md runner 2' ,price: 39.000,thumbnail: 'https://celadasa.vtexassets.com/arquivos/ids/211178-800-auto?v=637910048541670000&width=800&height=auto&aspect=true',stock: 8 })
 await productM.addProduct({ title: 'puma future rider',description: 'future rider negra y gris' ,price: 31.000,thumbnail:'https://woker.vtexassets.com/arquivos/ids/295060/1008263-006-1.jpg?v=637951361263630000',stock: 12 })
 await productM.addProduct({ title: 'puma R22 ADP',description: 'puma R22 ADP azul' ,price: 43.000,thumbnail:'https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-puma-r22-adp-azul-640010386497010-1.jpg',stock: 5 })
 await productM.addProduct({ title: 'puma x-ray 2 squared',description: 'puma x-ray 2 squared tricolor' ,price: 36.000,thumbnail:'https://s3.sa-east-1.amazonaws.com/www.vaypol.com.ar/variants/qz0ad5ci83neptqjnjnzzl0rtcmu/c77c2a06864ac9aca38dc5bd9371de015471edcdbf322dfb14411689bf968ae5',stock: 20 })
 await productM.addProduct({ title: 'nike air force 1 07',description: 'air force roja y gris' ,price: 46.000,thumbnail:'https://essential.vtexassets.com/arquivos/ids/432206-800-auto?v=637571120719300000&width=800&height=auto&aspect=true',stock: 19 })
 await productM.addProduct({ title: 'adidas multix',description: 'multix negra y blanca' ,price: 41.000,thumbnail:'https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-adidas-multix-blanca-10001efx5118001-1.jpg',stock: 18 })
 await productM.addProduct({ title: 'nike jordan retro 4',description: 'jordan retro 4 negras' ,price: 50.000,thumbnail:'https://http2.mlstatic.com/D_NQ_NP_909160-MLA54964429717_042023-O.jpg',stock: 23 })
 await productM.getProductById(9)
 await productM.upDateProduct(9,{description: 'multix roja y azul'})
 await productM.deleteProduct(10)
 await productM.get_product()
 
}
//manager()

export default productM