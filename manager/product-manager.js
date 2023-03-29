const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
    }

    addProduct(product) {
        product.id = ++this.lastId;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        return product;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
            this.lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            return this.products;
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            throw new Error(`Product with id ${id} not found`);
        }
    }

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            const oldProduct = this.products[productIndex];
            this.products[productIndex] = {
                ...oldProduct,
                ...updatedProduct,
                id
            };
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            return this.products[productIndex];
        } else {
            throw new Error(`Product with id ${id} not found`);
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } else {
            throw new Error(`Product with id ${id} not found`);
        }
    }
}

module.exports = ProductManager;