import { check } from 'express-validator';
import validateResulst from '../../utils/handleErrorValidations.js';


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



export {validatorPreBooking};
