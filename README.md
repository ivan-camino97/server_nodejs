# server_nodejs
se creo una clase cart_manager con 3 metodos
.getCart muestra los carritos que hay en el archivo
.addCart agrega los carritos creados al archivo
.getCartById recibe un id como parametro y devuelve un objeto con las propiedades del mismo

luego se creo un servidor de expres con 4 endpoints

.endpoint 1 GET/api/porducts.lee los productos del archivo y los devuelve en un objeto
.endpoint 2 GET/api/products/pid.lee el archivo de productos y devuelve el producto buscado
.endpoint 3 GET/api/carts.lee el archivo de carrito y devuelve un objeto con sus propiedades
.endpoint 4 GET/api/carts/:cid.lee el archivo de carritos y devuelve un objeto con el carrito encontrado 
