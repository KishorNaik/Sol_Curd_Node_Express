import Bottle from "bottlejs";
import MiddlewaresCollections from "./Config/Middlewares/MiddlewaresCollections";
import Startup from "./Startup";
import ServiceCollections from "./Config/Services/ServiceCollections";

console.log("Node.js running...");


new Startup(new Bottle())
    .ConfigMiddlewares(new MiddlewaresCollections())
    .ConfigServices(new ServiceCollections())
    .AddControllers((diService)=>
    [
        diService.container.userController        
    ])
    .ConfigErrorHandler()
    .Listen(3000);

