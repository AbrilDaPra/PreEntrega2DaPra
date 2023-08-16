//Obtengo el valor actual del contador desde el almacenamiento local
let cartItemCount = localStorage.getItem("cartItemCount");
cartItemCounter.innerText = cartItemCount || 0; 


function updateQuantityIconCart() {
    //Actualizo el contador en el elemento HTML
    let cartItemCounter = document.querySelector("#cartItemCounter");

    //Obtengo el carrito del localStorage ?
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //Calculo la nueva cantidad total de productos en el carrito
    let newQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    cartItemCounter.innerText = newQuantity;

    //Guardo la cantidad actualizada en localStorage
    localStorage.setItem("cartItemCount", newQuantity);
}

//Actualizo el contador cuando se carga la página
updateQuantityIconCart();