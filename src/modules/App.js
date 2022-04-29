import dataStore from '../../data/store.json';
import Store from "./Store"
import Cart from "./Cart"
import Dish from "./Dish"

class App {
    constructor() {
        this.store = new Store(dataStore)
        this.cart = new Cart()       
    }

    cardMarkup({ id, name, description, price }) {
        return `
            <div class="card" data-product-id = ${id}>
                <div class="card__image">   
                    <img src="assets/${id}.jpg"  alt="">
                </div>

                <div class="card__info">
                    <h3 class="card__title">${name}</h3>
                    <p class="card__paragraph">${description}</p>
                    <span> <b>$ ${price}.00</b> </span>
                </div>
                <span class="card__button-add"><i class="fa-solid fa-plus"></i></span>
            </div>
        `
    }

    cartItemMarkup({ name, price, id, number }) {
        return `
            <div class="cart__item" data-cart-id = ${id}>
                <div class="cart__info">
                <img src="assets/${id}.jpg" alt="">
                    <div>
                        <p> ${number} x 1 ${name}</p>
                        <span> <b>$ </b> ${number * price}</span>

                    </div>
                </div>
                <span class="delete">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </div>
        `
    }

    renderItemsAt(items, root) {
        this.clearAt(root)

        for (const product of items) {
            root.innerHTML += this.cardMarkup(product)
        }
    }

    renderStoreAt(root) {
        this.clearAt(root)

        if (this.localExists('cart')) {
            this.renderCartFromLocal();
        }

        for (const product of this.store.getAllProducts()) {
            root.innerHTML += this.cardMarkup(product)
        }
    }

    getLocal() {
        return JSON.parse(localStorage.getItem('cart'))
    }

    setLocal(obj) {
        localStorage.setItem('cart', JSON.stringify(obj))
    }

    addToCart(idFind) {
        const product = this.store.getItem(idFind)
        this.cart.addItem(product)
        this.setLocal(this.cart.products)
    }

    removeFromCart(id) {
        this.cart.deleteItem(id);
        this.setLocal(this.cart.products)
    }

    removeFromCartUI(nodeItem, cartContainer, cartCounter, cartTotal) {
        cartContainer.removeChild(nodeItem)
        cartCounter.textContent = this.cart.len()
        cartTotal.textContent = this.cart.getTotal()
    }

    filterByUI(category, root) {
        let filtered = category === "todo"
            ? this.store.getAllProducts()
            : this.store.filterByCategory(category)

        this.renderItemsAt(filtered, root)
    }

    filterByName(name) {
        return this.store.filterByName(name)
    }

    addToCartFromUi(cartNode, cartContainer, cartTotal) {
        const last = this.cart.getLastItem()

        cartNode.textContent = this.cart.size()
        cartContainer.innerHTML = ""
        cartTotal.textContent = this.cart.totalPrice()

        for (let cartItem of this.cart.get()) {
            cartContainer.innerHTML += this.cartItemMarkup(cartItem)
        }
    }

    renderCartFromLocal() {
        const localCart = this.getLocal();
        const cartContainer = document.getElementById('cart__container');
        const cartCounter = document.getElementById('cart__counter')

        const cart = this.getLocal() || []

        this.cart.setProducts(cart)

        cartCounter.textContent = this.cart.size()

        for (let product of localCart) {
            cartContainer.innerHTML += this.cartItemMarkup(product)
        }
    }

    localExists(key) {
        return localStorage.getItem(key) !== null
    }

    clearAt(root) {
        root.innerHTML = ""
    }
}



export default App