class Cart {
    constructor() {
        this.products = []
        this.pay = 0;
        this.total = 0;
    }

    setProducts(products) {
        this.products = [...products]
    }

    processPay(paymentProcess) {
        if (this.pay < this.getTotal())
            paymentProcess("ERROR", {})

        if (this.pay >= this.getTotal())
            paymentProcess("SUCCESS", { change: this.pay - this.getTotal() })
    }

    setPay(pay) {
        this.pay = pay;
    }

    getTotal() {
        return this.products.reduce((acc, next) => acc + next.price, 0);
    }

    reset() {
        this.products = []
        this.pay = 0;
    }

    addItem(product) {
        if (this.exists(product.id)) {
            this.products = this.products.map(el => el.id == product.id ? { ...el, number: el.number + 1 } : el)
            return;
        }

        this.products = [...this.products, { ...product, number: 1 }]
    }

    deleteItem(id) {
        this.products = this.products.filter(product => product.id != id)
    }

    get() {
        return this.products;
    }

    find(id) {
        return this.products
            .find((element) => element.id == id)
    }

    getItem(id) {
        return this.find(id)
    }

    hasItems() {
        return this.products.length > 0;
    }

    size() {
        return this.products.reduce((acc, prod) => acc + prod.number, 0)
    }

    len() {
        return this.products.length
    }

    exists(id) {
        const found = this.products.find(product => product.id === parseInt(id))
        return !!found;
    }

    incrementAmount(id) {
        const product = this.products.find(product => product.id === parseInt(id))
    }

    getLastItem() {
        return this.products[this.products.length - 1]
    }

    totalPrice() {
        return this.products.reduce((acc, product) => acc + product.price * product.number, 0)
    }
}

export default Cart