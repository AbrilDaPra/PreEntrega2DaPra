//Declaro las variables
let clearCart = document.querySelector(".clear-cart");
let total =document.querySelector("#total");
let cart= JSON.parse(localStorage.getItem("cart")) || [];

//Función para mostrar el carrito en la página
function displayCart(cart){
    let cartItemsContainer = document.getElementById("cartItems");
    //Para ver que el contenedor esté vacío antes de agregar los elementos del carrito
    cartItemsContainer.innerHTML = "";

    //Recorro el carrito y muestro los productos que contiene
    cart.forEach((product) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img class="cart-product-img" src="${product.img}" alt="${product.name}">
            <div class="cart-name">
                <small>Name</small>
                <h3>${product.name}</h3>
            </div>
            <div class="cart-product-quantity">
                <small>Quantity</small>
                <p>${product.quantity}</p>
            </div>
            <div class="cart-product-price">
                <small>Price</small>
                <p>$${product.price}</p>
            </div>
            <div class="cart-product-subtotal">
                <small>Subtotal</small>
                <p id="subtotal-${product.id}">$${product.quantity * product.price}</p>
            </div>
            <button class="cart-product-delete" data-product-id="${product.id}" data-product-quantity=${product.quantity}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
            
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    //Agrego evento de click para eliminar productos
    let trashCan = document.querySelectorAll(".cart-product-delete");
    trashCan.forEach((button) => {
        button.addEventListener("click", deleteSpecificProduct);
    })

    updateTotal(cart);
}

displayCart(cart);

//Función para eliminar productos mediante el icono de basura
function deleteSpecificProduct(event){
    //Obtengo el ID del producto
    let productID = event.currentTarget.getAttribute("data-product-id");

    //Elimino el producto del carrito por su ID
    cart = cart.filter((product) => product.id !== productID);

    //Actualizo el carrito en localStorage
    saveCartToLocalStorage();

    //Actualizo el contador
    updateQuantityIconCart();

    // Actualizo la visualización del carrito
    displayCart(cart);
}

//Función para actulizar el total 
function updateTotal (cart){
    let total = 0;
    cart.forEach((product) => {
        total += product.quantity * product.price;
    });
    //Actualizo el contenido del elemnto con el ID "total" en el HTMl
    let  totalElement = document.getElementById("total")
    totalElement.textContent = `$${total}`;
}

//Función para guardar el carrito en localStorage
function saveCartToLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal(cart);
}

//Calculo del total de la compra
updateTotal(cart);

//Botón para vaciar el carrito
clearCart.addEventListener('click', () => {
    //Vacio el carrito
    cart = [];
    
    //Guardo el carrito vacio en localStorage
    saveCartToLocalStorage();

    //Actualizo la visualización del carrito
    displayCart(cart);

    //Actualizo el contador del carrio
    updateQuantityIconCart(0);

    console.log(cart);
});
