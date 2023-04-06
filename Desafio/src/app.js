import express from "express";
import ProductManager from "./Managers/productsManager";

const PORT = 8080;

const productManager = new ProductManager();
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto: " + PORT);
});

app.get("/", async (req, res) => {
  const products = await productManager.getproducts();
  res.send(products);
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productManager.getproduct(id);
  res.send(product);
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const msg = await productManager.deleteproduct(id);
  res.send(msg);
});

app.get("/newproduct", async (req, res) => {
  
    const { title, description, price, thumbnail, code, stock } = req.query;

  if (!title || !description || !price || !thumbnail || !code || !stock) {
    res.send("Faltan datos");
    return;
  }

  const product = {
    title, description, price, thumbnail, code, stock
  }

  const msg = await productManager.createProduct(product);

  res.send(msg);

});

app.get("/editproduct", async (req, res) => {
  
    const {id, title, description, price, thumbnail, code, stock } = req.query;

  if (!title || !description || !price || !thumbnail || !code || !stock || !id) {
    res.send("Faltan datos");
    return;
  }

  const msg = await productManager.modifyProduct(id, title, description, price, thumbnail, code, stock);

  res.send(msg);

});