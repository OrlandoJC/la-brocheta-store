class Dish {
    constructor(id, name, description, ingredients = [], price, category = "", imgCode) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.price = price;
        this.category = category
        this.imgCode = imgCode
    }
}

export default Dish