import express, { NextFunction } from "express";
import { HttpException } from "../Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import BaseController from "../Lib/BaseControllers/BaseController";
import UserModel from "../Models/UserModel";
import { IUserService } from "../Services/UserService";
import { IUserValidation } from "../Validations/UserValidation";
import { check,ValidationChain,validationResult } from "express-validator";
import cleanDeep from "clean-deep";

export default class UserController extends BaseController{
    
    private readonly userService:IUserService;
    private readonly userValidation:IUserValidation;
   

    constructor(userService:IUserService,userValidation:IUserValidation)
    {
        super();
        this.userService=userService;
        this.userValidation=userValidation;
        this.routePath="/api/user";
        
        this.router=express.Router();

        this.InitializeRoutes();
    }

    protected InitializeRoutes() {
        this.router.post(`${this.routePath}/getallusers`,this.GetAllUsersAsync.bind(this));
        this.router.post(`${this.routePath}/createuser`,this.userValidation.CreateUpdateUserValidation(),this.CreateUsersAsync.bind(this));
        this.router.post(`${this.routePath}/updateuser`,this.userValidation.CreateUpdateUserValidation(),this.UpdateUserAsync.bind(this));
        this.router.post(`${this.routePath}/deleteuser`,this.DeleteUserAsync.bind(this));
    }

    private async GetAllUsersAsync  (request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{
        try
         {
            let userList:UserModel[]=await this.userService.GetAllUsersAsync();
            if(userList==null) throw new Error("Hello");

            // remove null property
            userList=cleanDeep(userList);

            response.status(200).json(userList);
         }
         catch(ex)
         {
            //console.log("UserController:Exception",ex.message);
            next(new HttpException(500,ex.message));
            //response.status(500).json({error:"something went wrong"});
         }
    }

   
    private async CreateUsersAsync(request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{
        try
        {
            const error=validationResult(request);
            //console.log(error);

            if(!error.isEmpty()){
                response.status(200).json(error);
            }
            else
            {
                let userModel:UserModel=request.body;
                let userIdentity:string=await this.userService.CreateUserAsync(userModel);
    
                response.status(200).json(userIdentity);    
            }

        }
        catch(ex){
            //response.status(500).json({error:"something went wrong"})
            next(new HttpException(500,ex.message));
        }
    }

    private async UpdateUserAsync(request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{
        try
        {
            const error=validationResult(request);

            if(!error.isEmpty()){
                response.status(200).json(error);
            }
            else
            {
                let userModel:UserModel=request.body;
                let flag:boolean=await this.userService.UpdateUserAsync(userModel);
    
                if(flag===true){
                    response.status(200).json({Message:"Update successfully"});
                }
                else
                {
                    response.status(200).json({Message:"something went wrong"});
                }
            }
        }
        catch(ex){
            //response.status(500).json({error:"something went wrong"});
            next(new HttpException(500,ex.message));
        }
    }

    private async DeleteUserAsync(request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{
        try
        {
                let userModel:UserModel=request.body;
                let flag:boolean=await this.userService.DeleteUserAsync(userModel);
    
                if(flag===true){
                    response.status(200).json({Message:"Delete successfully"});
                }
                else
                {
                    response.status(200).json({Message:"something went wrong"});
                }
            
        }
        catch(ex){
            //response.status(500).json({error:"something went wrong"})
            next(new HttpException(500,ex.message));
        }
    }

}
