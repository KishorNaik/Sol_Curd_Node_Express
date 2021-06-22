import Bottle from "bottlejs";
import { Configuration } from "../../../Lib/ConfigurationSettings/Configuration";
import ServiceCollections from "../ServiceCollections";

ServiceCollections.prototype.AddConfiguration=function(bottleContainer:Bottle):void{

    bottleContainer.service("configurations",Configuration);

};
