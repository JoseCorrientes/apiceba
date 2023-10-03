import mongoose from "mongoose";
import Colors from '@colors/colors'

const {DB_URI} = process.env;
export const connectDB = async () => {

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URI);
    console.log(Colors.bgBrightGreen.black('==>> ** Successful Connection to the DataBase ** '));
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error Connecting to DataBase -- [${error}] **`));
  }
}
