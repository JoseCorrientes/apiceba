import Products from "../models/Products.model.js";
import { seedProductsData } from "../data/seedProducts.js";




const getAllProductsService = async () => {

  const productsFound = await Products.find();
  return productsFound;

}


const getOneProductService = async (_id) => {

  const prodructFound = await Products.findById({_id});
  return prodructFound;
}

const createProductService = async () => {
  const dataFound = await Products.find();
  if (dataFound.length >= 1) return "exist";

  seedProductsData.forEach(async (product) => {
     await Products.create(product);

  });

  const verifyData = await Products.find();
  if (verifyData.length === 0) return "Error creating";
  return "Products created";
}


const updatePreBookingService = async (_id, preBooking, option) => {

  const productFound = await Products.findById({_id});
  let currentValue = parseInt(productFound.preBooking);

  if(option === 1){

    if((currentValue + parseInt(preBooking)) > parseInt(productFound.Stock))return {message:'not stock', product: productFound};

    currentValue = currentValue + parseInt(preBooking);
    const result = await Products.findOneAndUpdate({_id}, {preBooking: currentValue}, {new: true});
    return result;
  }
  else if(option === 2){
    if(currentValue < 1) return 1;
    currentValue = parseInt(currentValue) - parseInt(preBooking);
    const result = await Products.findOneAndUpdate({_id}, {preBooking: currentValue}, {new: true});
    return result;
  }

  throw new Error('Incorrect option param');

}

export {
  getAllProductsService,
  getOneProductService,
  createProductService,
  updatePreBookingService,
}


// const MongoClient = require("mongodb").MongoClient;

// const client = new MongoClient("mongodb://localhost:27017");

// client.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   const db = client.db("my_database");
//   const collection = db.collection("my_collection");

//   // Find the document to update
//   const document = collection.findOne({"name": "John"})

//   // Get the current value of the field to update
//   const currentValue = document.age;

//   // Add the value to update
//   const newValue = currentValue + 10;

//   // Update the document
//   collection.updateOne({"name": "John"}, {"$set": {"age": newValue}})

//   // Print the updated document
//   console.log(collection.findOne({"name": "John"}))

//   client.close();
// });
