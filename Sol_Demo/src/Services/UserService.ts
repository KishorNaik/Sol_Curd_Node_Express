
import mssql, { ConnectionPool } from "mssql/msnodesqlv8";
import { ISqlProvider } from "../Lib/SqlProvider/SqlProvider";
import UserModel from "../Models/UserModel";
import UserServiceAbstract from "./UserServiceAbstract";
import Enumerable from "linq"

export interface IUserService{
    GetAllUsersAsync():Promise<Array<UserModel>>;
    CreateUserAsync(userModel:UserModel) : Promise<string>;
    UpdateUserAsync(userModel:UserModel) : Promise<boolean>
    DeleteUserAsync(userModel:UserModel): Promise<boolean>
}

export class UserService extends UserServiceAbstract implements IUserService{

    private readonly sqlProvider:ISqlProvider;

    constructor(sqlProvider:ISqlProvider){
        super();
        this.sqlProvider=sqlProvider;
        
    }
   
    
    public async CreateUserAsync(userModel: UserModel): Promise<string> {
       try
       {
            let pool:mssql.ConnectionPool=await this.sqlProvider.OpenSqlConnectionAsync();

            let request:mssql.Request=await super.SetParameterAsync(pool.request(),"AddUser",userModel);

            let queryResult=await request.execute("uspSetUser");

            let userIdenntity:string=Enumerable.from(queryResult.recordset)
                                     .firstOrDefault();

            return userIdenntity;

       }
       catch(ex)
       {
           throw ex;
       }
       finally
       {
           await this.sqlProvider.CloseSqlConnectionAsync();
       }
    }

    public async UpdateUserAsync(userModel: UserModel): Promise<boolean> {
        try
       {
            let pool:mssql.ConnectionPool=await this.sqlProvider.OpenSqlConnectionAsync();

            let request:mssql.Request=await super.SetParameterAsync(pool.request(),"UpdateUser",userModel);

            let queryResult=await request.execute("uspSetUser");

            console.log(queryResult.rowsAffected);
            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;

            return flag;

       }
       catch(ex)
       {
           throw ex;
       }
       finally{
           await this.sqlProvider.CloseSqlConnectionAsync();
       }
    }

    public async DeleteUserAsync(userModel: UserModel): Promise<boolean> {
        try
       {
            let pool:mssql.ConnectionPool=await this.sqlProvider.OpenSqlConnectionAsync();

            let request:mssql.Request=await super.SetParameterAsync(pool.request(),"DeleteUser",userModel);

            let queryResult=await request.execute("uspSetUser");

            console.log(queryResult.rowsAffected);
            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;

            return flag;

       }
       catch(ex)
       {
           throw ex;
       }
       finally{
        await this.sqlProvider.CloseSqlConnectionAsync();
        }
    }

    public async GetAllUsersAsync(): Promise<UserModel[]> {
        try
        {
        
            let pool:mssql.ConnectionPool=await this.sqlProvider.OpenSqlConnectionAsync();
        
            let request:mssql.Request=await super.GetParameterAsync(pool.request(),"GetAllUsers");

            let queryResult=await request.execute("uspGetUser");

            let userList:UserModel[]= queryResult.recordset;

            return userList;
            
        }
        catch(ex)
        {
            throw ex;
        }
        finally
        {
            await this.sqlProvider.CloseSqlConnectionAsync();
        }
    }

    // public async GetAllUserAsync():Promise<UserModel[]>{
    //     try
    //     {
    //         let pool:mssql.ConnectionPool=await new ConnectionPool(sqlConfig).connect();

    //         let userList:UserModel[]= (await pool
    //                                     .request()
    //                                     .input("Command",mssql.VarChar,"GetAllUsers")
    //                                     .input("UserIdentity",mssql.UniqueIdentifier,undefined)
    //                                     .execute("uspGetUsers")
    //                                   ).recordset; 

    //         return userList;
    //     }
    //     catch(ex)
    //     {
    //         throw ex;
    //     }
    // }

}