// Creo los array para el shopping cart y para los productos disponibles (dentro de este array pongo objetos que son cada producto)
let cart = [];

let products = [
    {name: 'AKIRA', price: 6400, id: 'akira', img: '../images/favorites-akira.PNG', categorie: {name: 'Fanny Pack', id: 'fannypack'}},
    {name: 'ADDAMS', price: 6400, id: 'addams', img: '../images/catalogue-addams.PNG', categorie: {name: 'Fanny Pack', id: 'fannypack'}},
    {name: 'CHARLIE', price: 6800, id: 'charlie', img: '../images/catalogue-charlie.PNG', categorie: {name: 'Fanny Pack', id: 'fannypack'}},
    {name: 'CHAIN', price: 7600, id: 'chain', img: '../images/catalogue-chain.PNG', categorie: {name: 'Fanny Pack', id: 'fannypack'}},
    {name: 'AMÉLIE', price: 5600, id: 'amelie', img: '../images/favorites-amelie.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'CATALINA', price: 14800, id: 'catalina', img: '../images/favorites-catalina.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'GINEBRA', price: 13600, id: 'ginebra', img: '../images/instagram-ginebra-snake.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'GINEBRA MINI', price: 10800, id: 'ginebramini', img: '../images/ginebra-mini-pink.jpg', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'LOLA', price: 8200, id: 'lola', img: '../images/catalogue-lola.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'MALVINA', price: 6800, id: 'malvina', img: '../images/catalogue-malvina.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'BAGUETTE', price: 6200, id: 'baguette', img: '../images/instagram-baguette.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'MERLINA', price: 6200, id: 'merlina', img: '../images/catalogue-merlina.PNG', categorie: {name: 'Handbag', id: 'handbag'}},
    {name: 'FRANCIS', price: 9980, id: 'francis', img: '../images/catalogue-francis.PNG', categorie: {name: 'Bag', id: 'bag'}},
    {name: 'LINA', price: 5600, id: 'lina', img: '../images/lina-black.jpg', categorie: {name: 'Bag', id: 'bag'}},
    {name: 'NECESER', price: 5000, id: 'neceser', img: '../images/neceser-black.jpg', categorie: {name: 'Bag', id: 'bag'}},
    {name: 'LUA', price: 10000, id: 'lua', img: '../images/catalogue-lua.PNG', categorie: {name: 'Bag', id: 'bag'}},
    {name: 'MINI black wallet', price: 5550, id: 'miniblackwallet', img: '../images/wallet-mini-black.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MINI black croco wallet', price: 5550, id: 'miniblackcrocowallet', img: '../images/wallet-mini-croco.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MINI green wallet', price: 5550, id: 'minigreenwallet', img: '../images/wallet-mini-green.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MINI pink wallet', price: 5550, id: 'minipinkwallet', img: '../images/wallet-mini-pink.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MINI beige wallet', price: 5550, id: 'minibeigewallet', img: '../images/wallet-mini-brown.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MAXI pink croco wallet', price: 7550, id: 'maxipinkcrocowallet', img: '../images/wallet-maxi-nude-pink.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MAXI black wallet', price: 7550, id: 'maxiblackwallet', img: '../images/wallet-maxi-black.jpg', categorie: {name: 'Wallet', id: 'wallet'}},
    {name: 'MINI black braided wallet', price: 5550, id: 'miniblackbraidedwallet', img: '../images/wallet-mini-black-braided.PNG', categorie: {name: 'Wallet', id: 'wallet'}},
];

//Función para cargar los productos en el contenedor
function loadProducts(chosenProducts){
    let productContainer = document.getElementById("productContainer");
    //Vaciamos el contenedor antes de cargar los productos
    productContainer.innerHTML = "";

    chosenProducts.forEach((product) => {
        let div = document.createElement('div');
        div.classList.add('card-product'); 
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>Price: $${product.price}</h4>
            <button class="buy-btn addtocart-btn" id="agregar-${product.id}">ADD TO CART</button>
        `;
        
        //Agrego la card product al contenedor de productos
        productContainer.append(div);

        //Agrego el evento onclick al botón

        let addToCartButton = div.getElementById(`agregar-${product.id}`);
        addToCartButton.addEventListener('click', () => addToCart(product));
    });
}

//Cargo todos los productos sin filtro
loadProducts(products);

//Función para filtrar los productos según la categoria seleccionada
function filterProductsByCategorie(categorie){
    if (categorie === "all"){
        //Si la opción seleccionada es "all", llama a la función que muestra todos los productos
        loadProducts(products);
    }else{
        //Si la opción seleccionada no es "all", filtra según id asignado
        let productsByCategorie = products.filter(
            (product) => product.categorie.id === categorie
        );
        loadProducts(productsByCategorie);
    }
}

// Event listener para cada categoría
let categorieItems = document.querySelectorAll(".items-categorie");
categorieItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        let selectedCategorie = e.target.dataset.categorie;
        filterProductsByCategorie(selectedCategorie);
    });
});
    

//Función para agregar producto al carrito
function addToCart(productID){
    //Busco el producto por su ID en el array de productos disponibles
    let productToAdd = products.find((product) => product.id === productID);

    //Verifico si el producto ya fue agregado al carrito
    let inCartProduct = cart.find((product) => product.id === productID);

    if(inCartProduct){
        //Si el producto ya habia sido agregado al carrito previamente, incrementamos la cantidad
        inCartProduct.quantity++;
    }else{
        // Si el producto no estaba antes en el carrito, lo agrego
        cart.push({ ...productToAdd, quantity: 1});
    }

    //Guardo el carrito en localStorage
    saveCartToLocalStorage();

    displayCart();
}

function saveCartToLocalStorage() {
    // Guardar el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}



  




// Creo una función para mostrar al usuario los productos disponibles
// function showAvailableProducts(){
//     console.log('Bienvenido/a a la tienda de PISTACHO, estos son los productos disponibles:');
    
//     // Uso un forEach para recorrer el array availableProducts y mostrarselos al usuario
//     availableProducts.forEach((product) => {
//         console.log(`${product.name} - Precio: $${product.price}`)
//     })
// }

// Alert para saludar y muestro los productos disponibles
// alert('Bienvenido/a a la tienda de PISTACHO, estos son los productos disponibles:');

// showAvailableProducts();

// Creo una función para que el usuario pueda agregar un producto al carrito
// function addToCart(){
//     let name = prompt('Ingresá el nombre del producto que quiere agregar a su carrito: (en mayusculas');
//     // Uso el metodo some para ver si algun elemento del array coincide con el valor ingresado en el prompt
//     let inStockProduct = availableProducts.some(product => product.name === name);

//     if (inStockProduct) {
//         // Solo si el producto ingresado coincide con los productos disponibles, pregunta el precio y la cantidad que desea comprar
//         let product = availableProducts.find(p => p.name === name);
//         let quantity = parseInt(prompt('Ingresá la cantidad que querés comprar:'));
        
//         // Creo un objeto para el producto
//         let cartProduct = {
//             name: name,
//             price: product.price,
//             quantity: quantity
//         };

//         // Para agregar el producto ingresado al carrito
//         cart.push(cartProduct);

//         // Envio un mensaje avisando que el producto fue agregado al carrito
//         alert(`El producto ${name} fue agregado a tu carrito!`);
//     } else{
//         alert(`El producto ${name} no está disponible en PISTACHO`);
//     }
// }

// addToCart();

// Creo una función para calcular el total de la compra
// function totalTicket(){
//     let total = 0;

//     //Recorro el carrito y calculo el precio total
//     for (let product of cart) {
//         total = total + product.price * product.quantity
//     }

//     // Segun el total de la compra, aplico un descuento distinto
//     if (total > 15000){
//         total = applyDiscount(total, 20);
//     } else if(total > 10000){
//         total = applyDiscount(total, 10);
//     } else if(total > 5000) {
//         total = applyDiscount(total, 5);
//     }
    
//     alert(`Total de la compra: $${total}`);
// }

// Funcion para aplicar descuento al total de la compra (dependiendo de su monto final)
// function applyDiscount(total, discountPercentage){
//     //Calculo el descuento
//     let discountAmount = total * (discountPercentage / 100);

//     // Aplico el descuento al total
//     let totalWithDiscount = total - discountAmount;
//     return totalWithDiscount;
// }

// Creo una función que muestre el contenido del carrito
// function cartContent(){
//     console.log('Tu carrito contiene:');

//     // Mediante un ciclo que recorre el array cart, muestro cuales son los productos agregados
//     for (let product of cart){
//         console.log(`${product.name} - Precio: $${product.price} - Cantidad: ${product.quantity}`);
//     }
// }

// cartContent();

// Creo otra función para buscar un producto por su nombre dentro del carrito
// function findProduct(){
//     let searchName = prompt("¿Qué producto dentro de tu carrito queres encontrar?");
//     // Mediante el metodo find busco el producto en el array
//     let foundProduct = cart.find(product => product.name === searchName);

//     if (foundProduct){
//         console.log(`Producto encontrado: ${foundProduct.name}`)
//     } else{
//         console.log("No se encontro ningun producto con ese nombre.");
//     }
// }

// findProduct();

// Creo una función que filtre los productos del carrito según su precio
// function priceFilter(){
//     let maxPrice = parseInt(prompt('Ingrese el precio máximo para poder filtrarlo y devolver los productos con igual o menor precio:'));
//     // El metodo filter va a filtrar los precios que sean iguales o menores a lo ingresado en el prompt y almacenado en la variable maxPrice
//     let filteredProducts = cart.filter(product => product.price <= maxPrice);

//     console.log(`Los productos con igual o menor valor a $${maxPrice} son:`);
//     for (let product of filteredProducts){
//         console.log(`${product.name} - ${product.price}`)
//     }
// }

// priceFilter();

// Hago una función que contiene un menú para que el usuario pueda seleccionar la acción que quiere seguir
// function menu(){
//     let selected;

//     do{
//         console.log('--Menu--');
//         console.log('1. Quiero agregar un producto al carrito.');
//         console.log('2. Quiero ver que contiene el carrito.');
//         console.log('3. Quiero saber el total de la compra.');
//         console.log('4. Quiero buscar un producto específico.');
//         console.log('5. Quiero filtrar un producto según su precio.');
//         console.log('6. Quiero finalizar la compra.');

//         selected = parseInt(prompt('¿Qué opción del menú desea realizar? Ingrese el número.'));

//         switch (selected){
//             case 1:
//                 addToCart();
//                 break;
//             case 2:
//                 cartContent();
//                 break;
//             case 3:
//                 totalTicket();
//                 break;
//             case 4:
//                 findProduct();
//                 break;
//             case 5:
//                 priceFilter();
//                 break;
//             case 6:
//                 alert("Gracias por comprar en nuestra tienda!");
//                 break;
//             default:
//                 alert('Por favor, ingrese un número válido (del 1 al 6)');
//         }
//     } while (selected !== 6);
// }

// menu();
