'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
import Handlebars from "Handlebars"
import VariantsHandler from "./VariantsHandler"
var fs = require('fs');
const VARIANT_FILE_RELATIVE = "/variants/variant_def.xml";
export default class VariantsViewUIHandler {
  constructor() {
    console.log("create VariantsViewUIHandler");
    this.mainSection=undefined;
    this.templatesFn={};
    this.variantsHandler= new VariantsHandler();
    this.variants={};
  }

  createAndPrecompileTemplates(){
    console.log("createAndPrecompileTemplates");
    // import template src
    var noEntrySrc = $("#no-entry-template").html();
    // precompile template
    this.templatesFn['noEntry']= allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(noEntrySrc)));
  }


  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0] + VARIANT_FILE_RELATIVE;
    this.mainSection = $("#main-section");
    this.createAndPrecompileTemplates();

    if(!fs.existsSync(path)){
      console.log("No variants defined");
      this.showNoVariantsDef();
    }else{
      this.variantsHandler.load(path).then(() => {
        console.log("loading end");
        console.log("variants: " ,this.variantsHandler.getVariants());
      },() => {
        console.error("loading fail!!!!");
      });
    }
    this.bindJS();
  }

  applyTemplate(name,context){
    return allowUnsafeEval(() => allowUnsafeNewFunction(() => this.templatesFn[name](context)));
  }

  showNoVariantsDef(){
    console.log("showNoVariantsDef");
    var html = this.applyTemplate("noEntry");
    this.mainSection.append(html);
  }

  bindJS(){
    console.log("bindJS");

  }

  onRemove(){
    console.log("onRemove");
  }
}
