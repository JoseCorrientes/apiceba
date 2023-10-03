import Payment from "../models/Payment.model.js";



const paymentService = async (data) => {
    try {
        const result = await Payment.create(data);
        return result;
    }catch(e) {
        return `Payment Service Error ${e}`
    }    
}









export {
  paymentService,
}
