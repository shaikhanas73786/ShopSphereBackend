import {
  createProduct as createProductService,
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from '../services/productServices.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, stock, rating, brand } = req.body;

    if (!title && price === undefined && !category && stock === undefined) {
      return res.status(400).json({
        message: 'Title, price, category, and stock are required'
      });
    }

    const newProduct = await createProductService({
      title,
      description: description || '',
      price: Number(price),
      category,
      image: image || '',
      stock: Number(stock),
      rating: rating ? Number(rating) : 0,
      brand: brand || ''
    });

    return res.status(201).json({
      message: 'Product created successfully',
      response: newProduct
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json({
      message: 'Products fetched successfully',
      response: products
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product fetched successfully',
      response: product
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id || req.body.id || req.body._id;
    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required'
      });
    }

    const updated = await updateProductService(productId, req.body);
    if (!updated) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      response: updated
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id || req.body.id || req.body._id;
    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required'
      });
    }

    const deleted = await deleteProductService(productId);
    if (!deleted) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
