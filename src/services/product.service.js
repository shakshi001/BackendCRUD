const Category = require("../models/category.model.js");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level:1
        })
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory:topLevel._id,
    })

    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level:2
        })
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory:secondLevel._id,
    })

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level:3,
        })
    }

    const product = new product({
        title : reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPresent: reqData.discountedPresent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price:reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        category:thirdLevel._id,
    })

    return await product.save();
}


async function deleteProduct(productId) {
    const Product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
     return "Product deleted Success"
}

async function updatedProduct(productId, reqData) {
    return updatedProduct = await product.findByIdAndDelete(productId, reqData);
}


async function findProductById(id) {
    const product = await product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error("product not found with id : ", id);
    }
    return product;
}


async function getAllProducts(reqQuery) {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

    pageSize = pageSize || 10;
    let query = products.find().populate("category");
    if (category)
    {
        const existsCategory = await Category.findOne({ name: category });
        if (existsCategory) {
            query = query.where("category").equals(existsCategory._id);
        }
        else
        {
            return {content:[],curentPage:1 , totalPages:0}
        }
    }

    if (color)
    {
        const colorSet = Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.sizes > 0 ? new RegExp([...colorSet].join("|"), i) : null;
        query = query.where("color").regex(colorRegex);

        if (sizes)
        {
            const sizesSet = new Set(sizes);
            query.query.where("sizes.name").in([...sizesSet]);
        }

        if (minPrice && maxPrice)
        {
            query =  query.where('discountedPrice').get(minPrice).lte(maxPrice);
        }

        if (minDiscount)
        {
            query = query.where("discountedPresent").gt(minDiscount);

        }

        if (stock) {
            if (stock == "in_stock")
            {
                query= query.where("quantity").gt(0)
            }
            if (stock == "out_of_stock")
            {
                query = query.where("quantity").gt(1);
            }
        }

        if (sort) {
            const sortDirection = sort === "price_high" ? -1 : 1;
            query=query.sort({discountedPrice:sortDirection})
        }
    }

    const totalProducts = await product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return {content:products,curentPage:pageNumber , totalPages ,}
}


async function createMultipleProduct(products) {
    for (let product of products) {
        await createProduct(product);
    }
}

async function createMultipleProduct(products)
{
    for (let product of products) {
        await createProduct(reqQuery);
    }
}
module.exports = {
  createProduct,
  deleteProduct,
  updatedProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};