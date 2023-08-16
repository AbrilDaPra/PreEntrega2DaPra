//Obtengo el valor actual del contador desde el almacenamiento local
let cartItemCount = localStorage.getItem("cartItemCount");
//cart?

cartItemCounter.innerText = cartItemCount || 0; 


function updateQuantityIconCart() {
    //Actualizo el contador en el elemento HTML
    let cartItemCounter = document.querySelector("#cartItemCounter");

    let newQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    cartItemCounter.innerText = newQuantity;

    //Guardo la cantidad actualizada en localStorage
    localStorage.setItem("cartItemCount", newQuantity);
}

//Actualizo el contador cuando se carga la página
updateQuantityIconCart();