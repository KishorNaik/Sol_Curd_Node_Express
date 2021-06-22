import express from "express";
import Bottle from "bottlejs";
import BaseController from "./Lib/BaseControllers/BaseController";
import ServiceCollections from "./Config/Services/ServiceCollections";
import MiddlewaresCollections from "./Config/Middlewares/MiddlewaresCollections";
import { IConfiguration } from "./Lib/ConfigurationSettings/Configuration";

// Extension of Middlewares
import "./Config/Middlewares/Custom/JsonMiddlewaresExtensions";
import "./Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import "./Config/Middlewares/Custom/LoggerMiddlewareExtension";
import "./Config/Middlewares/Custom/CorsMiddlewareExtension";

// Extension of Service
import "./Config/Services/Custom/ConfigurationServiceExtension";
import "./Config/Services/Custom/UserServiceExtension";
import "./Config/Services/Custom/SqlProviderServiceExtension";
import "./Config/Services/Custom/UserValidationExtension";



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
        middlewareCollections.AddCorsMiddleware(this.app);   

        return this;
    }

    public ConfigServices(serviceCollections:ServiceCollections):Startup{

        serviceCollections.AddConfiguration(this.bottle);
        serviceCollections.AddSqlProvider(this.bottle);
        serviceCollections.AddUserService(this.bottle);
        serviceCollections.AddUserValidation(this.bottle);

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

    public Listen(){

        let port:number=undefined;

        console.log(process.env.NODE_ENV);

        if(process.env.NODE_ENV==='development')
        {
            port=(this.bottle.container.configurations as IConfiguration).AppSettingConfig.Development.Port;
        }
        else if(process.env.NODE_ENV==="production")
        {
            port=(this.bottle.container.configurations as IConfiguration).AppSettingConfig.Production.Port;
        }


        this.app.listen(port,()=>{
            console.log(`App listening on the port ${port}`);
        });
    }

}