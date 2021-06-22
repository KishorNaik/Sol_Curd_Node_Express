import express from "express";
import cors from "cors";
import MiddlewaresCollections from "../MiddlewaresCollections";

MiddlewaresCollections.prototype.AddCorsMiddleware=function(app:express.Application):void{

    app.use(cors());

}