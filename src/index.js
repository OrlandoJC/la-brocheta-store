import App from './modules/App'

const restaurant = new App()

const root = document.getElementById('products__container');
const cartIcon = document.getElementById('cart')
const cartPanel = document.getElementById('cart__panel')
const cartClose = document.getElementById('cart__close');
const cartCounter = document.getElementById('cart__counter')
const cartContainer = document.getElementById('cart__container')
const categoryOptions = document.getElementById('categories')
const findInput = document.getElementById('search')
const cartTotal = document.getElementById('cart__total')
let inputTimeOut = null;

cartIcon.addEventListener('click', () => {
    cartPanel.classList.add('cart__open')
})

cartClose.addEventListener('click', () => {
    cartPanel.classList.remove('cart__open')

})

findInput.addEventListener('input', () => {
    clearTimeout(inputTimeOut);

    timeout = setTimeout(function () {
        const { value } = findInput;

        if (value === "") {
            restaurant.filterByUI("todo", root)
        } else {
            let coincidences = restaurant.filterByName(value)
            
            if(coincidences.length == 0) {
                Toastify({
                    text: "No se encontró ningun producto con ese nombre 😒",
                    duration: 4000,
                    gravity: "bottom",
                    position: "right", 
                    stopOnFocus: true, 
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                  }).showToast();
                return;
            }
            
            restaurant.renderItemsAt(coincidences, root)
        }
    }, 1000);
})

findInput.addEventListener('change', () => {
    console.log(findInput.value)
})

categoryOptions.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.category')) {
        document.querySelector('.btn-orange').classList.remove('btn-orange')
        target.classList.add('btn-orange')

        restaurant.filterByUI(target.textContent, root)
    }
})

cartContainer.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.delete')) {
        let nodeItem = target.closest('.cart__item');
        let id = nodeItem.dataset.cartId;
        restaurant.removeFromCart(id)
        restaurant.removeFromCartUI(nodeItem, cartContainer)
        Toastify({
            text: "Producto eliminado del carrito 👻",
            duration: 4000,
            gravity: "bottom",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #f85032, #e73827);)",
            }
          }).showToast();
    }
})

root.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.card__button-add')) {
        let id = target.closest('.card').dataset.productId;

        restaurant.addToCart(id)
        restaurant.addToCartFromUi(cartCounter, cartContainer, cartTotal)
        Toastify({
            text: "Producto añadido al carrito 😎",
            duration: 3000,
            gravity: "bottom",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }
})

document.addEventListener('DOMContentLoaded', () => { restaurant.renderStoreAt(root) });
