import { check,ValidationChain,validationResult } from "express-validator";

export interface IUserValidation{
    CreateUpdateUserValidation():ValidationChain[];
}

export class UserValidation implements IUserValidation{
    
    public CreateUpdateUserValidation(): ValidationChain[] {
        let arrayValidation= new Array<ValidationChain>();
        arrayValidation.push(this.firstNameValidation(),this.lastNameValidation());

        return arrayValidation;
    }


    private firstNameValidation(): ValidationChain {
        console.log("Execute firstName");
        return check('FirstName')
                .isLength({min:2})
                .withMessage("First Name must be at least more than 2 char");
    }
    
    private lastNameValidation(): ValidationChain {
        console.log("Execute lastName");
        return check('LastName')
                .isLength({min:2})
                .withMessage("First Name must be at least more than 2 char");
    }

}