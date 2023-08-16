//Creo los array para el shopping cart y para los productos disponibles (dentro de este array pongo objetos que son cada producto)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [];
fetch("../js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })

//Declaro variables y obtengo elementos del DOM
let inCartProduct;
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let filterButton = document.getElementById('filters');
let filterOptions = document.getElementById('filterOptions');
let productList = document.getElementById("productList");

//Función para cargar los productos en el contenedor
function loadProducts(chosenProducts){
    let productContainer = document.getElementById("productContainer");
    //Vaciamos el contenedor antes de cargar los productos
    productContainer.innerHTML = "";

    //Utilizo un forEach para crear todos los productos
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

        //Agrego el evento onclick al botón "ADD TO CART"
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
        // Si el producto no estaba antes en el carrito, lo agrego utilizando spread para agregar la nueva propiedad y luego push
        cart.push({ ...product, quantity: 1});
    }

    //Actualizo la cantidad de productos al lado del icono de carrito
    updateQuantityIconCart();

    //Guardo el carrito en localStorage
    saveCartToLocalStorage();

    //Toastify al agregar producto al carrito
    Toastify({
        text: "The product was added to your cart",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#87f867",
          borderRadius: "5px",
          color: "#000000",
        },
        offset: {
            x: 60,
            y: 60
          },
        onClick: function(){}
      }).showToast();

    //Actualizo el contador almacenado en localStorage
    localStorage.setItem("cartItemCount", cart.reduce((total, product) => total + product.quantity, 0));
}

//Función para filtrar los productos según la categoria seleccionada
function filterProductsByCategorie(categorie){
    //Utilizo operador ternario para simplificar el if-else
    let filteredProducts = categorie === "all"
    ? products
    : products.filter((product) => product.categorie.id === categorie);

    loadProducts(filteredProducts);
}

//Event listener para cada categoría
let categorieItems = document.querySelectorAll(".items-categorie");
categorieItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        const selectedCategorie = e.target.dataset.categorie;
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

//Agrego el evento click al botón de los filtros
filterButton.addEventListener("click", toggleFilterOptions);

//Para que el menú desplegable no se oculte despues de hacerle click
filterOptions.addEventListener("click", (event) => event.stopPropagation());

//Función para mostrar u ocultar el dropdown
function toggleFilterOptions() {
    filterButton.classList.toggle("open");
}

//Agrego un evento change al dropdown para las opciones
filterOptions.addEventListener("change", filterSelection);

//Función para manejar la selección de filtros
function filterSelection(event){
    let selectedValue = event.target.value;

    //Filtro y ordeno los productos según la opción seleccionada
    let filteredProducts = [...products];

    if (selectedValue === "priceLowToHigh"){
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedValue === "priceHighToLow"){
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedValue === "alphabetical"){
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    //Muestro los productos filtrados y ordenados en el HTML
    displayProductsFiltered(filteredProducts, document.getElementById("productContainer"));
}

// Función para mostrar los productos en el HTML
function displayProductsFiltered(productsToShow, container){
  container.innerHTML = "";

  productsToShow.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("card-product");
    productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <h4>Price: $${product.price}</h4>
        <button class="buy-btn addtocart-btn" id="agregar-${product.id}">ADD TO CART</button>
    `;
    
    container.appendChild(productDiv);
  });
}