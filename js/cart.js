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
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    updateTotal(cart);
}

displayCart(cart);

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
    saveCartToLocalStorage;
    //Actualizo la visualización del carrito
    displayCart(cart);

    console.log(cart);
});
