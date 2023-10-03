// import { check } from 'express-validator';
// import validateResulst from '../../utils/handleErrorValidations.js';
const { check }=require('express-validator');
const validateResulst =require('../../utils/handleErrorValidations.js');


const validatorLogs = [


  check('ip')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('ip required'),
  check('date')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('date required'),
  check('sessionId')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('sessionId required'),
  check('component')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('component required'),
  check('status')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('status required'),
  check('description')
    .exists()
    .trim()
    .notEmpty()
    .isString()
    .withMessage('description required'),


  (req, res, next) => {
    return validateResulst(req, res, next);
  }

];



// export {validatorLogs};
module.exports = {validatorLogs};
