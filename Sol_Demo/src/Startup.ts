import express from "express";
import Bottle from "bottlejs";
import BaseController from "./Lib/BaseControllers/BaseController";
import ServiceCollections from "./Config/Services/ServiceCollections";
import MiddlewaresCollections from "./Config/Middlewares/MiddlewaresCollections";

// Extension of Service & Middlewares
import "./Config/Middlewares/Custom/JsonMiddlewaresExtensions";
import "./Config/Services/Custom/UserServiceExtension";
import "./Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import "./Config/Middlewares/Custom/LoggerMiddlewareExtension";
import "./Config/Services/Custom/SqlProviderExtension";


export default class Startup{

    private app:express.Application;
    private bottle:Bottle;
    private middlewareCollection:MiddlewaresCollections;

    constructor(bottle:Bottle){
        this.app=express();

        this.bottle=bottle;
    }

    public ConfigMiddlewares(middlewareCollections:MiddlewaresCollections):Startup{

        this.middlewareCollection=middlewareCollections;

        middlewareCollections.AddJsonMiddleware(this.app);
        middlewareCollections.AddLogerMiddleware(this.app);        

        return this;
    }

    public ConfigServices(serviceCollections:ServiceCollections):Startup{

        serviceCollections.AddSqlProvider(this.bottle);
        serviceCollections.AddUserService(this.bottle);

        return this;
    }

    public AddControllers(funcCallBack:(diService:Bottle)=> Array<BaseController>) : Startup{
        const controllerList:Array<BaseController>=funcCallBack(this.bottle);

        controllerList.forEach((controller)=> {
            this.app.use("/",controller.router);
        })

        return this;
    }

    public ConfigErrorHandler() : Startup{
        this.middlewareCollection.AddExceptionMiddleware(this.app);

        return this
    }

    public Listen(port:Number){
        this.app.listen(port,()=>{
            console.log(`App listening on the port ${port}`);
        });
    }

}