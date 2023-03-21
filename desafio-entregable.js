class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.nextProductId = 1;
    }

    addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        const productWithSameCode = this.products.find(
            (product) => product.code === code
        );
        if (productWithSameCode) {
            console.error("Ya existe un producto con el mismo código");
            return;
        }

        const newProduct = {
            id: this.nextProductId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.error("Not found");
        }
        return product;
    }
}

const productManager = new ProductManager();

// Agregar un producto
productManager.addProduct({
    title: 'Notebook HP Omen',
    description: 'Notebook HP Omen 15, version 2023.',
    price: 1000000,
    thumbnail: 'assets/img/imagen1',
    code: 'notebook1',
    stock: 10,
});

productManager.addProduct({
    title: 'Monitor LG',
    description: 'Monitor LG 27 pulgadas, 144hz Nvidia g-sync',
    price: 150000,
    thumbnail: 'assets/img/imagen2',
    code: 'monitor1',
    stock: 2,
});


// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por id
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(productById);