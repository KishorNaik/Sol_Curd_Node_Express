import MiddlewaresCollections from "../MiddlewaresCollections";
import express from "express";

export class HttpException extends Error{
    public Status:number;
    public Message:string;

    constructor(status:number,message:string){
        super(message);
        this.Message=message;
        this.Status=status;
    }
}

MiddlewaresCollections.prototype.AddExceptionMiddleware=function(app:express.Application):void{

    console.log("Exception Handling Middleware");
    app.use(function(error:HttpException,request:express.Request,response:express.Response,next:express.NextFunction){   
        const status=error.Status || 200;
        const message=error.Message || "Something went wrong";

        console.log("Middleware:",error.Message);

        response
            .status(status)
            .json({
                status:status,
                message:message
            });

        
    });
}