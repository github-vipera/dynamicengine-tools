'use babel'
import _ from "lodash";
const fs= require('fs'),
      xml2js = require('xml2js');
export default class VariantsHandler {
  constructor(){
    this.variantJSObject=undefined;
  }

  readFileAsXml(path){
    return new Promise((resolve,reject) => {
      var parser = new xml2js.Parser();
      fs.readFile(path, function(err, data) {
        if(err){
          reject(err);
          return;
        }
        parser.parseString(data, function (err, result){
          if(err){
            reject(err);
            return;
          }
          resolve(result);
        });
      });

    });
  }
  load(path){
    this.path=path;
    return this.readFileAsXml(path).then((result) => {
      console.log("XML parsed: ",result);
      this.variantJSObject = result;
    },(reason)=> {
      console.error(reason);
      atom.notifications.addError(reason);
    });
  }


  parsePrefenceArray(toParse){
    if(!toParse){
      return [];
    }
    return _.map(toParse,function(item){
      return item.$
    });
  }

  getMapForPlatforms(platforms){
    return _.map(platforms,(single) => {
      return {
        name: single.$.name,
        preference: this.parsePrefenceArray(single.preference)
      }
    });
  }
  getVariants(){
    if(!this.variantJSObject){
      return [];
    }
    return _.map(this.variantJSObject.variants.variant,(single) => {
      var name = single.$.name;
      var platfomrsDef = this.getMapForPlatforms(single.platform);
      return {
        name: name,
        platform: platfomrsDef,
        preference: this.parsePrefenceArray(single.preference)
      }
    })

  }

  applyChange(variantsChange){
    //TODO
  }


}
