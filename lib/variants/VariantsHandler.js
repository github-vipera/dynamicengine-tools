'use babel'
import _ from "lodash";
const fs= require('fs'),
      xml2js = require('xml2js');
const DEFAULT_PLATFORMS=['android','ios','browser'];
const RELATIVE_VARIANTS_DIR = "/variants";
const RELATIVE_FILE_PATH = RELATIVE_VARIANTS_DIR + "/variants_def.xml";
export default class VariantsHandler {
  constructor(){
    this.variantJSObject=undefined;
    this.initEmptyObject();
  }

  initEmptyObject(){
    this.variantJSObject= {
      variants: {
        variant:[]
      }
    }
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
    if(!path){
      path= atom.project.getPaths()[0] + RELATIVE_FILE_PATH;
    }
    this.path=path;
    return this.readFileAsXml(path).then((result) => {
      console.log("XML parsed: ",result);
      if(!result.variants){
        this.initEmptyObject();
        return;
      }
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

  isVariantDefined(variantName){
    return _.find(this.variantJSObject.variants.variant, (item) => {
      return item.$.name == variantName;
    }) != undefined;
  }

  mergePreferenceArray(base,patch){
    var toAdd = _.filter(patch,function(item){
      var pIndex= _.findIndex(base,function(pItem){
        return item.name === pItem.$.name
      });
      if(pIndex >= 0){
        console.log("patch preference: " + base[pIndex].$.name);
        base[pIndex].$.value=item.value;
        return false;
      }
      return true
    });
    //console.log("To add:" + JSON.stringify(toAdd));
    _.forEach(toAdd,function(pref){
      console.log("add new prefence: " + pref.name + " with value: " + pref.value);
      base[base.length] = {
        "$":{
          name:pref.name,
          value:pref.value
        }
      };
    });
  }

  getVariantByName(name){
    return _.find(this.variantJSObject.variants.variant,(item) => {
      return item.$.name == name;
    });
  }

  patchDefinedVariant(variant){
    console.info("patchDefinedVariant");
    var original= this.getVariantByName(variant.name);
    console.log("original:",original);
    if(!original.preference){
      original.preference=[];
    }
    this.mergePreferenceArray(original.preference,variant.preference);
    var newPlatformDef=_.filter(variant.platform,(variantPlatform) => {
      var pIndex= _.findIndex(original.platform,(item) => {
        return item.$.name === variantPlatform.name;
      });
      if(pIndex >= 0){
        console.info("patch platform preference: " + variantPlatform.name);
        if(!original.platform[pIndex].preference){
          original.platform[pIndex].preference=[];
        }
        this.mergePreferenceArray(original.platform[pIndex].preference,variantPlatform.preference)
        return false;
      }
      return true;
    });
    console.log("newPlatformDef:",newPlatformDef);

    console.log("after patch:",original);
  }

  createEmptyVarDef(name,platforms){
    var variantsArray=this.variantJSObject.variants.variant;
    variantsArray[variantsArray.length] = {
      "$": {
        name: name
      },
      preference : [],
      platform: []
    };
    var platformsArray = variantsArray[variantsArray.length - 1].platform;
    _.forEach(platforms,(single) => {
      console.warn("add single: ",single);
      platformsArray[platformsArray.length] = {
        "$": {
          name:single
        },
        preference:[]
      };
    });
  }


  addNewVariant(variant){
    console.log("addNewVariant skeleton before patch");
    this.createEmptyVarDef(variant.name,DEFAULT_PLATFORMS);
    this.patchDefinedVariant(variant);
  }



  applyChanges(variantsChanges){
    //console.log("applyChanges: ",variantsChanges);
    _.forEach(variantsChanges,(variant) => {
      console.log("applyChange for variant:",variant);
      if(this.isVariantDefined(variant.name)){
        this.patchDefinedVariant(variant);
      }else{
        this.addNewVariant(variant);
      }
    });
    //SEARCH RECORD TO DELETE
    this.variantJSObject.variants.variant = _.filter(this.variantJSObject.variants.variant,(item) => {
       return _.findIndex(variantsChanges,(variant) => {
         return variant.name === item.$.name;
       }) >= 0;
    });
    this.persistChangeToFile();
  }

  deleteVariantByName(name){

  }

  persistChangeToFile(){
    var builder = new xml2js.Builder();
    var variantsDir = atom.project.getPaths()[0] + RELATIVE_VARIANTS_DIR;
    var xml = builder.buildObject(this.variantJSObject);
    if(!fs.existsSync(variantsDir)){
      fs.mkdirSync(variantsDir);
    }
    fs.writeFileSync(atom.project.getPaths()[0] + RELATIVE_FILE_PATH,xml);
  }

  static createVariantSkeleton(variantName){
    return VariantsHandler.createVariantSkeletonWithPlatform(variantName,DEFAULT_PLATFORMS);
  }

  static createVariantSkeletonWithPlatform(variantName,platforms){
    var newVariant= {
      name:variantName,
      preference:[],
      platform: []
    };
    _.forEach(platforms,(item) => {
      newVariant.platform[newVariant.platform.length] = {
        name:item,
        preference:[]
      };
    });
    return newVariant;
  }


}
