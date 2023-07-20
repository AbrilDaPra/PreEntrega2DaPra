// Creo el array para el shopping cart
let cart = [];

// Creo una función para que el usuario pueda agregar un producto al carrito
function addToCart(){
    let name = prompt('Ingresá el nombre del producto:');
    let price = parseInt(prompt('Ingresá el precio del producto'));
    let quantity = parseInt(prompt('Ingresá la cantidad que querés comprar:'));

    // Creo un objeto para el producto
    let product = {
        name: name,
        price: price,
        quantity: quantity
    };

    // Para agregar el producto ingresado al carrito
    cart.push(product);

    // Envio un mensaje avisando que el producto fue agregado al carrito
    alert(`El producto ${name} fue agregado a tu carrito!`);
}

addToCart();

// Pregunto si quiere agregar otro producto al carrito
let addAnotherProduct = prompt('Querés agregar otro producto al carrito? (Si/No)');

if (addAnotherProduct === 'Si' || addAnotherProduct === 'SI' || addAnotherProduct === 'si'){
    // Si el usuario desea agregar otro producto al carrito, ejecuto la función addToCart y luego le calculo el total de su compra
    addToCart();
    totalTicket();
} else{
    totalTicket();
}

// Creo una función para calcular el total de la compra
function totalTicket(){
    let total = 0;

    //Recorro el carrito y calculo el precio total
    for (let product of cart) {
        total = total + product.price * product.quantity
    }

    alert(`Total de la compra: $${total}`);
}

// Creo una función que muestre el contenido del carrito
function cartContent(){
    console.log('Tu carrito contiene:');

    // Mediante un ciclo que recorre el array cart, muestro cuales son los productos agregados
    for (let product of cart){
        console.log(`${product.name} - Precio: $${product.price} - Cantidad: ${product.quantity}`);
    }
}

cartContent();

// Creo otra función para buscar un producto por su nombre dentro del carrito
function findProduct(){
    let searchName = prompt("¿Qué producto dentro de tu carrito queres encontrar?"); 
    let foundProduct = cart.find(product => product.name === searchName);

    if (foundProduct){
        console.log(`Producto encontrado: ${foundProduct.name}`)
    } else{
        console.log("No se encontro ningun producto con ese nombre");
    }
}

findProduct();

// Creo una función que filtre los productos del carrito según su precio
function priceFilter(){
    let maxPrice = parseInt(prompt('Ingrese el precio máximo para poder filtrarlo y devolver los productos con igual o menor precio:'));
    let filteredProducts = cart.filter(product => product.price <= maxPrice);

    console.log(`Los productos con igual o menor valor a $${maxPrice} son:`);
    for (let product of filteredProducts){
        console.log(`${product.name} - ${product.price}`)
    }
}

priceFilter();

// Hago una función que contiene un menú para que el usuario pueda seleccionar la acción que quiere seguir
function menu(){
    let selected;

    do{
        console.log('--Menu--');
        console.log('1. Quiero agregar un producto al carrito.');
        console.log('2. Quiero ver que contiene el carrito.');
        console.log('3. Quiero saber el total de la compra.');
        console.log('4. Quiero buscar un producto específico.');
        console.log('5. Quiero filtrar un producto según su precio.');
        console.log('6. Quiero finalizar la compra.');

        selected = parseInt(prompt('¿Qué opción del menú desea realizar? Ingrese el número.'));

        switch (selected){
            case 1:
                addToCart();
                break;
            case 2:
                cartContent();
                break;
            case 3:
                totalTicket();
                break;
            case 4:
                findProduct();
                break;
            case 5:
                filteredProducts();
                break;
            case 6:
                alert("Gracias por comprar en nuestra tienda!");
                break;
            default:
                alert('Por favor, ingrese un número válido (del 1 al 6)');
        }
    } while (selected !== 6);
}

menu();

