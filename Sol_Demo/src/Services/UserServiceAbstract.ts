import mssql from "mssql/msnodesqlv8";
import UserModel from "../Models/UserModel";

export default abstract class UserServiceAbstract{

    protected SetParameterAsync(requestPara:mssql.Request,command:string,userModel:UserModel): Promise<mssql.Request>{

        return new Promise((resolve,reject)=>{

            try
            {
                requestPara
                .input("Command",mssql.VarChar,command)
                .input("UserIdentity",mssql.UniqueIdentifier,userModel.UserIdentity)
                .input("FirstName",mssql.VarChar,userModel.FirstName)
                .input("LastName",mssql.VarChar,userModel.LastName);

                resolve(requestPara);
            
            }
            catch(ex)
            {
                reject(ex.message);
                throw ex;
            }

        });

    }

    protected GetParameterAsync(requestPara:mssql.Request,command:string,userModel?:UserModel): Promise<mssql.Request>{

        return new Promise((resolve,reject)=>{

            try
            {
                requestPara
                .input("Command",mssql.VarChar,command)
                .input("UserIdentity",mssql.UniqueIdentifier,userModel?.UserIdentity ?? undefined);

                resolve(requestPara);
            
            }
            catch(ex)
            {
                reject(ex.message);
                throw ex;
            }

        });

    }
}