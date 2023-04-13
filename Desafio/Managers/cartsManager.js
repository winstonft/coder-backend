import fs from 'fs';
import ProductManager from './productsManager';

const products = new ProductManager();
const path = '../files/carts.json';

export default class CartsManager {
    addProductInCart = async(idCart, idProd) => {
        const carts = await this.getCarritos();
        const cartsFilter = carts.find((cart) => cart.id == idCart);

        let productInCart = cartsFilter.products;

        const productIndex = productInCart.findIndex( (i) => i.id == idProd);

        if ( productIndex !== -1) {
            productInCart[productIndex].quantity = productInCart[productIndex].quantity + 1;
        } else {
            let product = {
                id: idProd,
                quantity: 1 
            }
            productInCart.push(product);
        }

        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        return cartsFilter;
    };

    getCarts = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8");
            const carts = JSON.parse(data);
            return carts;
        } else {
            return [];
        }
    };

    addCart = async () => {
        const carts = await this.getCarts();
        let cart = {
            products: [],
        };

        if(carts.length === 0) {
            cart.id = 1;
        } else {
            cart.id = carts[carts.length - 1].id + 1;
        }

        carts.push(cart);

        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        return cart;
    }
}