import Bottle from "bottlejs";
import MiddlewaresCollections from "./Config/Middlewares/MiddlewaresCollections";
import Startup from "./Startup";
import ServiceCollections from "./Config/Services/ServiceCollections";
import * as dotenv from "dotenv";
console.log("Directory Path:",__dirname);
dotenv.config({ path: __dirname+'/.env' });

new Startup(new Bottle())
    .ConfigMiddlewares(new MiddlewaresCollections())
    .ConfigServices(new ServiceCollections())
    .AddControllers((diService)=>
    [
        diService.container.userController        
    ])
    .ConfigErrorHandler()
    .Listen();

