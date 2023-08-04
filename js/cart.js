//Función para mostrar el carrito en la página
function displayCartInCartPage(){
    let cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    cart.forEach((product) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

//Función para guardar el carrito en localStorage
function saveCartToLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Función para agregar producto al carrito
function addToCart(productID){
    //Busco el producto por su ID en el array de productos disponibles
    let productToAdd = products.find((product) => product.id === productID);

    if(!productToAdd){
        console.error("The product doesn't exists...");
        return;
    }

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
    
    //Actualizo la visualización del carrito
    displayCart();
}