import productModel from '../models/productModel.js';

export const createProduct = async (productData) => {
  const product = new productModel(productData);
  return await product.save();
};


export const getAllProducts = async () => {
  try {
          let response = await productModel.find();
          return response;
      } catch (error) {
          console.log(error)
      }
};

export const getProductById = async (id) => {
  return await productModel.findById(id);
};

export const updateProduct = async (id, updateData) => {
  return await productModel.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true
  });
};

export const deleteProduct = async (id) => {
  return await productModel.findByIdAndDelete(id);
};
