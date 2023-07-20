// Creo el array para el shopping cart
let cart = [];

//Creo una función para que el usuario pueda agregar un producto al carrito
function addToCart(){
    let name = prompt('Ingresá el nombre del producto:');
    let price = parseInt(prompt('Ingresá el precio del producto'));
    let quantity = parseInt(prompt('Ingresá la cantidad que querés comprar:'));

    //Creo un objeto para el producto
    let product = {
        name: name,
        price: price,
        quantity: quantity
    };

    //Para agregar el producto ingresado al carrito
    cart.push(product);

    //Envio un mensaje avisando que el producto fue agregado al carrito
    console.log(`El producto ${product} fue agregado a tu carrito!`);

    //Muestro el objeto de producto actualizado
    console.log(product);
}




    
