import { check,ValidationChain,validationResult } from "express-validator";

export interface IUserValidation{
    firstNameValidation():ValidationChain;
    lastNameValidation():ValidationChain;
}

export class UserValidation implements IUserValidation{

    firstNameValidation(): ValidationChain {
        console.log("Execute firstName");
        return check('FirstName')
                .isLength({min:2})
                .withMessage("First Name must be at least more than 2 char");
    }
    lastNameValidation(): ValidationChain {
        console.log("Execute lastName");
        return check('LastName')
                .isLength({min:2})
                .withMessage("First Name must be at least more than 2 char");
    }

}