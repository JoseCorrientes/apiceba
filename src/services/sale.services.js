// import Sale from '../models/Sale.model.js'
// import { updateDataInvoice, updateFlagInvoice } from '../utils/purchaseData.js';
const Sale=require('../models/Sale.model.js')
const { updateDataInvoice, updateFlagInvoice }=require('../utils/purchaseData.js');





const emailStatus = async(saleCode, data)=>{
    try {
            const result = await updateFlagInvoice(saleCode, data)
            if (result==900) {
                        console.log('No se actualizo sales ---> ver')
                        return 900
            }
            if (result.modifiedCount!=1) {
                        console.log('no se encontro la referencia')
                        return 404
            }    
            console.log('sigo el proceso')
            return 200;
            return result;   
    } catch(e) {
        console.error(` handleError = ${e}` )
    }
}



const updateSaleFlag= async(saleCode, data)=>{
    try {
    
            const result = await updateDataInvoice(saleCode, data)
            if (result==900) {
                        console.log('No se actualizo sales ---> ver')
                        return 900
            }
            if (result.modifiedCount!=1) {
                        console.log('no se encontro la referencia')
                        return 404
            }    
            console.log('sigo el proceso')
            return 200;
    } catch(e) {
        console.error(` este es el string del sale.service.js ${e}` )
    }
}

// export { 
//     updateSaleFlag,
//     emailStatus,
// }
module.exports ={ 
    updateSaleFlag,
    emailStatus,
}