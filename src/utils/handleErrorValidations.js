import { validationResult } from "express-validator";
import Colors from '@colors/colors';

const validateResulst = (req, res, next) => {
  try {

    validationResult(req).throw();
    return next();
  } catch (error) {
    console.log(Colors.red(`** Error in Validation, Invalid Params in Request **`))
    res.status(400).send({message: 'Invalid Params', Errors: error.array()})

  }

}

export default validateResulst;
