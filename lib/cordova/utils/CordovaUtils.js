'use babel'
import _ from 'lodash'
const fs = require("fs");
const path = require("path");
class CordovaUtils {
  constructor() {
    //NOP
  }
  scanDeviceParts(parts){
    var res=new Array();
    for(var i=0; i<parts.length; i++){
      if(parts[i] && !parts[i].endsWith(":")){
        res.push(parts[i].trim());
      }
    }
    return res;
  }
  scanPlatformParts(parts,skipBrowser){
    var res={
      installed:new Array(),
      available:new Array(),
    }
    var sepCount=0;
    for(var i=0; i<parts.length; i++){
      if(parts[i]){
        if(parts[i].endsWith(":") || parts[i].endsWith(": ")){
          sepCount++;
        }else if(sepCount === 1 && !(skipBrowser && parts[i].indexOf("browser") != -1 )){
          res.installed.push(parts[i].trim());
        }else if(sepCount === 2){
          res.available.push(parts[i].trim());
        }
      }
    }
    return res;
  }
  parseDeviceList(stringValue){
    if(!stringValue){
      return [];
    }
    var parts=stringValue.split('\n');
    var deviceList=this.scanDeviceParts(parts);
    console.log(deviceList.toString());
    return deviceList;
  }
  parsePlatformList(stringValue){
    if(!stringValue){
      return [];
    }
    var parts=stringValue.split('\n');
    var platforms=this.scanPlatformParts(parts,true);
    return platforms;
  }
  getPlatformValue(item){
    if(!item){
      return undefined;
    }
    return item.split(" ")[0];
  }

  parsePluginList(stringValue){
    console.log("parsePluginList");
    var listParts=stringValue.split("\n");
    var result=new Array();
    _.forEach(listParts,(item)=>{
      result.push(this.parsePluginRecord(item));
    });
    console.log(result);
    return result;
  }
  parsePluginRecord(record){
    var values=record.split(" ");
    return{
      id: values[0].trim(),
      version: values[1].trim(),
      name: values.slice(2).join(" ").trim()
    };
  }

  getInstalledPlatform(rootProjectPath){
    var completePath = path.join(rootProjectPath, 'platforms/platforms.json');
    if(!fs.existsSync(completePath)){
      return [];
    }
    var platforms = JSON.parse(fs.readFileSync(completePath, 'utf8'));
    var platformsList = new Array();
    for(var key in platforms){
        var platform = {
            "name": key,
            "version" : platforms[key]
        }
        if(platform.name === "browser"){
          platform.virtualRun = true;
        }else{
          platform.virtualRun = false;
        }
        platformsList.push(platform);
    }

    return {
      "installed": platformsList
    }
  }

}
var utilsRef=new CordovaUtils();
export default utilsRef;
