//Función para mostrar el carrito en la página
function displayCart(cart){
    let cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    //Recorro el carrito y muestro los productos que contiene
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
