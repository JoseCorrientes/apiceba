import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    unique: true,
    require: [true, 'Product name is required']
  },
  description: {
    type: String,
    require: [true, 'Description is required']
  },
  sku: {
    type: String,
    require: [true, 'SKU is required']
  },
  Stock: {
    type: Number,
    require: [true, 'Stock is required']
  },
  price: {
    type: String,
    require: [true, 'Price is required']
  },
  preBooking: {
    type: Number,
    require: false
  },
  category: {
    type: String,
    require: [true, 'Category is required']
  },
  picture: {
    type: String,
    require: true
  }


},
{
  timestamps: true,
  versionKey: false,
});

const Products = model('Products', productSchema);
export default Products;
