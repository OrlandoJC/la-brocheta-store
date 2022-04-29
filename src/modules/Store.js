class Store {
    constructor(dataStore) {
        this.products = [...dataStore.data]
    }

    find(id) {
        return this.products
            .find((element) => element.id == id)
    }

    includes(id) {
        const filtered = find(id);

        return filtered.length > 0;
    }

    insertProduct(product) {
        this.products = [...this.products, product]
    }

    getItem(id) {
        return this.find(id)
    }

    getAllProducts() {
        return this.products;
    }

    len() {
        return this.products.length
    }

    filterByCategory(category) {
        return this.products.filter((product) => product.category === category)
    }

    filterByName(name) {
        return this.products.filter((product) => product.name.toLowerCase().startsWith(name))
    }
}

export default Store