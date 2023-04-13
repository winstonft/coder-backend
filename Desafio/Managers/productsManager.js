import fs from "fs";

const path = './src./files/BD.json';

export default class ProductManager {

    getProducts = async () => {
        if(fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    getProduct = async (id) => {
        const products = await this.getProducts();
        const product = products.filter((product) => {
            return product.id == id
        })

        return product
    }

    createProduct = async (product) => {
        const products = await this.getProducts();

        let id = products[products.length-1].id;
        product.id = ++id;
        products.push(product)

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Producto creado'
        } catch (error) {
            return error;
        }
    }

    deleteProduct = async (id) => {
        
        const products = await this.getProducts();
        const productIndex = products.findIndex((product) => {
            return product.id == id
        })
        products.splice(productIndex,1)

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Producto eliminado'
        } catch (error) {
            return error;
        }

    }

    modifyProduct = async (id, title, description, price, thumbnail, code, stock) => {

        const products = await this.getProducts();

        const productIndex = products.findIndex((product) => {
            return product.id == id
        })

        products[productIndex].title = title;
        products[productIndex].description = description;
        products[productIndex].price = price;
        products[productIndex].thumbnail = thumbnail;
        products[productIndex].code = code;
        products[productIndex].stock = stock;

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Producto modificado'
        } catch (error) {
            return error;
        }
    
    } 
}