'use babel'
const fs = require('fs')
const path = require('path');
const _ = require('lodash');

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

class SDKManager{
  constructor(){
    this._sdkLocation = atom.config.get("dynamicengine-tools.sdkLocation");
  }
  getSDKPackages(){
    if(!this._sdkLocation){
      return undefined;
    }
    let pluginArray= new Array();
    let pluginDirectories=getDirectories(this._sdkLocation);
    _.forEach(pluginDirectories,(singlePath) => {
      let pluginInfo = this.loadPluginInfo(path.join(this._sdkLocation, singlePath));
      if(!pluginInfo){
        console.error("Invalid plugin dir:",singlePath);
        return;
      }
      pluginArray.push(pluginInfo)
    });
    return pluginArray;
  }
  checkForUpdates(){
    //TODO
  }
  downloadPackage(name,version){
    //TODO
  }
  loadPluginInfo(dir){
    var completePath = path.join(dir, 'package.json');
    if(!fs.existsSync(completePath)){
      return undefined;
    }
    var packageJSON = JSON.parse(fs.readFileSync(completePath, 'utf8'));
    if(!packageJSON.cordova){
      return undefined;
    }
    return {
      "name": packageJSON.name,
      "url": packageJSON.repository != undefined ? packageJSON.repository.url : "",
      "repoUrl": packageJSON.repository != undefined ? packageJSON.repository.url : "",
      "version": packageJSON.version,
      "description": packageJSON.description,
      "lastUpdate": ""
    };
  }
  enableConfigWatch(){
    atom.config.onDidChange("", (oldValue,newValue) => {
      console.log("SDK location change:",oldValue, " --> ",newValue);
    });
  }
  getInstallOptions(){
    if(!this._sdkLocation){
      return undefined;
    }
    return {
      searchPath:this._sdkLocation
    };
  }
  get sdkLocation(){
    return this._sdkLocation;
  }
  set sdkLocation(value){
    this._sdkLocation=value;
    atom.config.set("dynamicengine-tools.sdkLocation",value);
  }


}
const sdkManagerInstance = new SDKManager();
module.exports = sdkManagerInstance;
