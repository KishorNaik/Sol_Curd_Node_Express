import Bottle from "bottlejs";
import { UserValidation } from "../../../Validations/UserValidation";
import ServiceCollections from "../ServiceCollections";

ServiceCollections.prototype.AddUserValidation=(bottleContainer:Bottle):void=>{
    bottleContainer.service("userValidation",UserValidation);
}