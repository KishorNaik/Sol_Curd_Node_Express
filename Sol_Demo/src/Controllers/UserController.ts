import express, { NextFunction } from "express";
import { HttpException } from "../Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import BaseController from "../Lib/BaseControllers/BaseController";
import UserModel from "../Models/UserModel";
import { IUserService } from "../Services/UserService";
import asyncHandler from "express-async-handler"

export default class UserController extends BaseController{
    
    private readonly userService:IUserService;
   

    constructor(userService:IUserService)
    {
        super();
        this.userService=userService;
        this.routePath="/api/user";
        
        this.router=express.Router();

        this.InitializeRoutes();
    }

    protected InitializeRoutes() {
        this.router.post(`${this.routePath}/getallusers`,this.GetAllUsersAsync.bind(this));
        this.router.post(`${this.routePath}/createuser`,this.CreateUsersAsync.bind(this));
        this.router.post(`${this.routePath}/updateuser`,this.UpdateUserAsync.bind(this));
        this.router.post(`${this.routePath}/deleteuser`,this.DeleteUserAsync.bind(this));
    }

    private async GetAllUsersAsync  (request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{
        try
         {
            let userList:UserModel[]=await this.userService.GetAllUsersAsync();
            if(userList==null) throw new Error("Hello");
            response.status(200).json(userList);
         }
         catch(ex)
         {
            console.log("UserController:Exception",ex.message);
            next(new HttpException(500,ex.message));
            //response.status(500).json({error:"something went wrong"});
         }
    }

   
    private async CreateUsersAsync(request:express.Request,response:express.Response): Promise<void>{
        try
        {
            let userModel:UserModel=request.body;
            let userIdentity:string=await this.userService.CreateUserAsync(userModel);

            response.status(200).json(userIdentity);
        }
        catch(ex){
            response.status(500).json({error:"something went wrong"})
        }
    }

    private async UpdateUserAsync(request:express.Request,response:express.Response): Promise<void>{
        try
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
        catch(ex){
            response.status(500).json({error:"something went wrong"})
        }
    }

    private async DeleteUserAsync(request:express.Request,response:express.Response): Promise<void>{
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
            response.status(500).json({error:"something went wrong"})
        }
    }

}
