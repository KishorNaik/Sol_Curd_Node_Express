import Bottle from "bottlejs";
import { SqlProvider } from "../../../Lib/SqlProvider/SqlProvider";
import ServiceCollections from "../ServiceCollections";

ServiceCollections.prototype.AddSqlProvider=function(bottleContainer:Bottle){
    bottleContainer.service("sqlProvider",SqlProvider);
}