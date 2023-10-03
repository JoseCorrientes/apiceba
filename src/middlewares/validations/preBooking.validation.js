// import { check } from 'express-validator';
// import validateResulst from '../../utils/handleErrorValidations.js';
const { check }=require('express-validator');
const validateResulst =require('../../utils/handleErrorValidations.js');


const validatorPreBooking = [


  check('preBooking')
    .exists()
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('preBooking required'),


  (req, res, next) => {
    return validateResulst(req, res, next);
  }

];



module.exports = {validatorPreBooking};
// export {validatorPreBooking};
