import Store from "./Store"
import Cart from "./Cart"
import Dish from "./Dish"

class App {
    constructor() {
        this.store = new Store()
        this.cart = new Cart()
        this.store.insertProduct(new Dish(1, "Tribu Pack", "Platillo perfecto para compartir y disfrutar de nuevos sabores", [], 259, "entrada", "b1a3ef04e36442fecbfdad3f23d041fa"))
        this.store.insertProduct(new Dish(2, "QUESADILLAS BÚFALO", "DQuesadilla elaborada a base de queso gouda rallado.", [], 100, "entradas", "e22fd5e0c31b7225357bc2e2cd14c60f"))
        this.store.insertProduct(new Dish(3, "DEDOS DE POLLO (6PZAS)", "eliciosos 180 gr de pechuga de pollo empanizada..", [], 240, "entrada"))
        this.store.insertProduct(new Dish(4, "POLLO PARMESANO", "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, corrupti.", [], 300, "entrada"))
        this.store.insertProduct(new Dish(5, "ENSALADA CÉSAR", "Lechuga larga aderezada al estilo césar con croutones y queso parmesano..", [], 110, "ensaladas"))
        this.store.insertProduct(new Dish(6, "ENSALADA LEMON", "Rica mezcla de lechugas, granos de elotes, aguacate, frituras de maíz, zanahoria rayada, col morada", [], 1, "ensaladas"))
        this.store.insertProduct(new Dish(7, "FUSILLI ARRABIATA", "Rica pasta al dente, salteada con aceitunas negras, ajo, cebolla y tocino, con un toque de salsa de tomate", [], 12, ""))
        this.store.insertProduct(new Dish(8, "CHEESE BURGER", "180gr Carne la parrilla con tocino, queso cheddar, cebolla, pepinillo, tomate y lechuga.", [], 33, ""))
    }

    cardMarkup({ id, name, description, price }) {
        return `
            <div class="card" data-product-id = ${id}>
                <div class="card__image">
                    <img src="https://picsum.photos/600/400?random=${id}" alt="">
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
                <img src="https://picsum.photos/600/400?random=${id}" alt="">
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

    removeFromCartUI(nodeItem, cartContainer) {
        cartContainer.removeChild(nodeItem)
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