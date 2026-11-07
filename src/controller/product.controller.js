const productService = require("../services/product.service");



const createProducts = async(req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    }
    catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const productId = await productService.updatedProduct(productId);
    try
    {
        const product = await productService. updatedProduct(productId);
        return res.status(201).send(productId , req.body);
    }
    catch (error)
    {
        return res.status(500).send({ error:error.message });
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product);
    }
    catch (error)
    {
        return res.status(200).send({ error: error.message });
    }
}



const getAllProducts = async (req, res) => {
    const productId = req.params.id;
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(product);
    } catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}
// to add bulk product 
const createMultipleProduct = async (req, res) => {
    const productId = req.params.id;
    try
    {
        const product = await productService.createMultipleProduct(req.body);
        return res.status(201).send({ message: "product created successfully" });
    }
    catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
  createProducts,
  createMultipleProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  createProducts,
};