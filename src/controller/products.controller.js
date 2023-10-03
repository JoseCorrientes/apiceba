// import Colors from '@colors/colors';
// import { matchedData } from 'express-validator';
// import { getAllProductsService, getOneProductService, createProductService, updatePreBookingService } from '../services/products.services.js';
const Colors=require('@colors/colors');
const { matchedData }=require('express-validator');
const { getAllProductsService, getOneProductService, createProductService, updatePreBookingService }=require('../services/products.services.js');


const getAllProducts = async (req, res) => {

  try {
    const data = await getAllProductsService();
    if(!data.length) return res.status(404).json({message: 'Products not found'});
    return res.status(200).json({message: 'Products found', data})
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error'});
  }
}

const getProductById = async (req, res) => {
  const _id = req.params.id;

  try {
    const data = await getOneProductService(_id);
    if(!data) return res.status(404).json({message: 'Product not found'});
    return res.status(200).json({message: 'Product found', data})
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error'});
  }
}

const createProducts = async (req, res) => {

  try {
    const result = await createProductService();
    if(result === 'exist') return res.status(409).json({message: 'Already exist products in database'});
    if(result === 'Error creating') return res.status(500).json({message: 'Error creating products'});
    return res.status(201).json({message: 'Products created'});
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error'});
  }
}


const updatePreBooking = async (req, res) => {


  const _id = req.params.id;
  const {option} = req.body;
  req = matchedData(req);
  const {preBooking} = req;

  if(preBooking < 1) {
    return res.status(400).json({message: 'value cannot be less than 1'});
  }
  if(!option || (option !== 1 && option !== 2)) {
    return res.status(400).json({message: 'Option is required and must be 1 or 2'});
  }
  try {
    const data = await updatePreBookingService(_id, preBooking, option);
    if(!data) return res.status(404).json({message: 'Product not found'});

    if(data.message === 'not stock') {
      return res.status(200).json({message: 'Available stock is reached', status: 'Error', data: data.product});
    }

    res.status(200).json({message: 'Product updated', status: 'Ok', data})
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error'});
  }

}


// export {
//   getAllProducts,
//   getProductById,
//   createProducts,
//   updatePreBooking,
// }
module.exports ={
  getAllProducts,
  getProductById,
  createProducts,
  updatePreBooking,
}
