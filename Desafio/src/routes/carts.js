import { Router } from 'express';
import CartsManager from '../../Managers/cartsManager';

const router = Router();
const manager = new CartsManager();

router.post("/", async (req, res) => {
    let newCart = await manager.addCart();
    res.send({ newCart});
});

router.get("/:cid", async( req, res) => {
    const id = parseInt(req.params.cid);
    let carts = await manager.getCarts(id);

    res.send({carts});
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const resultado = await manager.addProductInCart(idCart, idProd);

        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "error interno"});
    }
});

export default router;