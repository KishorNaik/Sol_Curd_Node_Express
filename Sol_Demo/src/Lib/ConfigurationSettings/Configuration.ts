import {AppSettingsConfiguration} from "../../Config/Settings/AppSettingsConfiguration";

export interface IConfiguration{
    AppSettingConfig:AppSettingsConfiguration;
}

export class Configuration implements IConfiguration{
    
    constructor(){
        this.AppSettingConfig=require('../../Config/Settings/appSettings.json');
    }
    
    public AppSettingConfig: AppSettingsConfiguration;

}