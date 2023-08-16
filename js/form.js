let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Event listener para el botón submit del formulario
document.getElementById("purchaseForm").addEventListener('submit', async (event) => {
    //Para prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    //Mostrar mensaje de proceso
    Toastify({
        text: "We are processing your purchase, please wait...",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "#87f867",
            borderRadius: "5px",
            color: "#000000",
        }
    }).showToast();

    //Simulación de tiempo de espera con promesa
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    //Esperar 3 segundos simulados
    await delay(3000);

    //Reinicio el formulario y el carrito
    document.getElementById("purchaseForm").reset();
    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    //Muestro mensaje de éxito
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your order was successfully placed. We will contact you shortly.',
        confirmButtonColor: '#87f867',
        confirmButtonText: 'OK',
        customClass: {
            title: 'sweetalert-title',
            confirmButton: 'sweetalert-confirmBtn',
            popup: 'sweetalert-popup'
        }
    }).then((result) => {
        if (result.isConfirmed){
            //Actualizo el contador
            updateQuantityIconCart();

            //Redirijo a 'index.html' luego de tocar el botón "OK"
            window.location.href = '../index.html';
        }
    });
});

//Función para actualizar el contador
function updateQuantityIconCart(){
    //Actualizo el contador en el elemento HTML
    let cartItemCounter = document.querySelector("#cartItemCounter");

    let newQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    cartItemCounter.innerText = newQuantity;

    //Guardo la cantidad actualizada en localStorage
    localStorage.setItem("cartItemCount", newQuantity);
}
