import mssql, { ConnectionPool } from "mssql/msnodesqlv8";
import { IConfiguration } from "../ConfigurationSettings/Configuration";

export interface ISqlProvider{

    OpenSqlConnectionAsync():Promise<mssql.ConnectionPool>;
    CloseSqlConnectionAsync():Promise<void>
}

export class SqlProvider implements ISqlProvider{
    
    private readonly configuration:IConfiguration=undefined;
    private pool:ConnectionPool=undefined;

    constructor(configuration:IConfiguration){
        this.configuration=configuration;
    }


    public async OpenSqlConnectionAsync(): Promise<mssql.ConnectionPool> {
        try
        {
            const sqlConfig:mssql.config={
                server: (process.env.NODE_ENV==="development") ? this.configuration.AppSettingConfig.Development.DatabaseConnection.Server : this.configuration.AppSettingConfig.Production.DatabaseConnection.Server,
                driver: (process.env.NODE_ENV==="development") ? this.configuration.AppSettingConfig.Development.DatabaseConnection.Driver : this.configuration.AppSettingConfig.Production.DatabaseConnection.Driver,
                database: (process.env.NODE_ENV==='development')? this.configuration.AppSettingConfig.Development.DatabaseConnection.Database: this.configuration.AppSettingConfig.Production.DatabaseConnection.Database,
                options: {
                    trustedConnection: (process.env.NODE_ENV==="development") ? this.configuration.AppSettingConfig.Development.DatabaseConnection.Options.TrustedConnection : this.configuration.AppSettingConfig.Production.DatabaseConnection.Options,
                }
            }


            this.pool=await new ConnectionPool(sqlConfig).connect();
            console.log("# Sql Connection Opened");
            return this.pool;
        }
        catch(ex)
        {
            throw ex;
        }
    }
    public async CloseSqlConnectionAsync(): Promise<void> {
        try
        {
            await this.pool.close();
        }
        catch(ex)
        {
            throw ex;
        }
    }



}