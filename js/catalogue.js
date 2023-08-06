// Creo los array para el shopping cart y para los productos disponibles (dentro de este array pongo objetos que son cada producto)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

let inCartProduct;
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");

//Función para cargar los productos en el contenedor
function loadProducts(chosenProducts){
    let productContainer = document.getElementById("productContainer");
    //Vaciamos el contenedor antes de cargar los productos
    productContainer.innerHTML = "";

    chosenProducts.forEach((product) => {
        let div = document.createElement("div");
        div.classList.add("card-product"); 
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>Price: $${product.price}</h4>
            <button class="buy-btn addtocart-btn" id="agregar-${product.id}">ADD TO CART</button>
        `;
        
        //Agrego la card product al contenedor de productos
        productContainer.append(div);

        //Agrego el evento onclick al botón

        let addToCartButton = document.getElementById(`agregar-${product.id}`);
        addToCartButton.addEventListener('click', () => addToCart(product));
    });

}

//Función para agregar producto al carrito
function addToCart(product){
    if(!product){
        console.error("The product doesn't exists...");
        return;
    }

    //Verifico si el producto ya fue agregado al carrito
    inCartProduct = cart.find((prod) => prod.id === product.id);

    if(inCartProduct){
        //Si el producto ya habia sido agregado al carrito previamente, incrementamos la cantidad
        inCartProduct.quantity++;
    }else{
        // Si el producto no estaba antes en el carrito, lo agrego
        cart.push({ ...product, quantity: 1});
    }

    //Actualizo la cantidad de productos al lado del icono de carrito
    updateQuantityIconCart();

    //Guardo el carrito en localStorage
    saveCartToLocalStorage();

    //Actualizo el contador almacenado en localStorage
    localStorage.setItem("cartItemCount", cart.reduce((total, product) => total + product.quantity, 0));
}

//Cargo todos los productos sin filtro
loadProducts(products);

// //Función para filtrar los productos según la categoria seleccionada
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

//Event listener para cada categoría
let categorieItems = document.querySelectorAll(".items-categorie");
categorieItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        let selectedCategorie = e.target.dataset.categorie;
        filterProductsByCategorie(selectedCategorie);
    });
});
    
function saveCartToLocalStorage() {
    //Guardo el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Cargo todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", function(){
    loadProducts(products);
})

//Función para manejar la búsqueda
function searchBar() {
    let searchTerm = searchInput.value.toLowerCase();
    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    loadProducts(filteredProducts);
}

//Agrego un event listener al botón de búsqueda
searchButton.addEventListener("click", searchBar);

//Agrego la opción de buscar al presionar Enter en el campo de búsqueda
searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        searchBar();
    }
});
