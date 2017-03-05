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
    this.variantsSelectorContainer = undefined;
    this.templatesFn={};
    this.variantsHandler= new VariantsHandler();
    this.variants = undefined;
  }

  createAndPrecompileTemplates(){
    console.log("createAndPrecompileTemplates");
    // import template src
    var noEntrySrc = $("#no-entry-template").html();
    var variantSelectorSrc = $("#variants-selector-template").html();
    var variantContainerSrc = $("#variants-template").html();
    var singleVariantSrc = $("#single-variant-template").html();
    // precompile template
    this.templatesFn['noEntry']= allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(noEntrySrc)));
    this.templatesFn['variantSelector']= allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(variantSelectorSrc)));
    this.templatesFn['variantContainer'] =  allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(variantContainerSrc)));
    this.templatesFn['singleVariant'] =  allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(singleVariantSrc)));
  }


  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0] + VARIANT_FILE_RELATIVE;
    this.mainSection = $("#main-section");
    this.variantsSelectorContainer = $("#variants-selector-container");
    this.createAndPrecompileTemplates();

    if(!fs.existsSync(path)){
      console.log("No variants defined");
      this.showNoVariantsDef();
    }else{
      this.reloadFromFile(path)
    }
    this.bindJS();
  }

  reloadFromFile(path){
    this.variantsHandler.load(path).then(() => {
      console.log("loading end");
      this.variants = this.variantsHandler.getVariants();
      console.log("Mapped in:",this.variants);
      this.renderVariantsSelector(this.variants);
      this.bindJSForSelector();
      this.setSelectedVariantByName(this.getNameByIndex(0));
      //this.renderSingleVariant(this.variants[0]);
      //this.renderVariants(this.variants);
    },() => {
      console.error("loading fail!!!!");
    });
  }

  bindJSForSelector(){
    $('[variant-selector]').bind('click',(evt) => {
      var variantName= $(evt.currentTarget).attr("variant-selector");
      console.log("Click on: ",variantName);
      this.setSelectedVariantByName(variantName);
    });
  }

  bindJSForPreferenceChange(){
    console.log("bindJSForPreferenceChange");
    $('[variant-preference-id]').change((evt) => {
      var jqueryEl=$(evt.currentTarget);
      var variantName= jqueryEl.attr("variant-ref");
      var preferenceName= jqueryEl.attr("variant-preference-id");
      var value=jqueryEl.val();
      console.log("Change preference: ",preferenceName," of variant",variantName, " value:",value);
      this.applyPreferenceChange(value,preferenceName,variantName);
    })
  }

  addOrChangePreference(preference,prefArray){
    var target = _.find(prefArray,(item) => {
      return item.name === preference.name;
    });
    if(!target){
      console.log("target not found in prefArray: add new preference");
      prefArray[prefArray.length] = preference;
      return;
    }
    target.value = preference.value;
  }

  applyPreferenceChange(value,prefName,variantName,platformName){
    console.log("applyPreferenceChange ",value,prefName,variantName,platformName);
    var index=this.getIndexByName(variantName);
    if(index<0){
      atom.notifications.addError("applyPreferenceChange fail: variant " + variantName  + " not found");
      return;
    }
    var variantDef=this.variants[index];
    console.log("variantDef:",variantDef);
    var preference= {
      name: prefName,
      value: value
    };
    if(!platformName){
      this.addOrChangePreference(preference,variantDef.preference);
    }else{
      var platform = _.find(variants.platform,(item)=>{
        return item.name === platformName;
      });
      if(!platform){
        console.error("platform ",platform," not found");
        return;
      }
      this.addOrChangePreference(preferencem,platform.preference);
    }
  }

  updateVariantSelector(name){
    $('[variant-selector]').removeClass("selected");
    $("[variant-selector='" + name + "'").addClass("selected");
  }

  getIndexByName(name){
    return _.findIndex(this.variants,(item) => {
      return item.name == name;
    })
  }

  getNameByIndex(index){
    if(!this.variants || !this.variants[index]){
      return undefined;
    }
    return this.variants[index].name;
  }

  setSelectedVariantByName(name){
    var index=this.getIndexByName(name);
    if(index < 0){
      console.error("setSelectedVariantByName -> name not found");
      return;
    }
    this.updateVariantSelector(name)
    this.setSelectedVariant(index);
  }

  setSelectedVariant(index){
    this.setSelectedVariantIndex=index;
    this.renderSingleVariant(this.variants[index]);
    this.bindJSForPreferenceChange();
  }

  applyTemplate(name,context){
    return allowUnsafeEval(() => allowUnsafeNewFunction(() => this.templatesFn[name](context)));
  }

  renderVariants(variants){
    console.log("renderVariants");
    var html = this.applyTemplate("variantContainer", {variants: variants});
    this.mainSection.empty();
    this.mainSection.append(html);
  }

  renderSingleVariant(variant){
    console.log("renderSingleVariant");
    var html = this.applyTemplate("singleVariant", variant);
    this.mainSection.empty();
    this.mainSection.append(html);
  }

  renderVariantsSelector(variants){
    console.log("renderVariantsSelector");
    var html = this.applyTemplate("variantSelector", {variants: variants});
    this.variantsSelectorContainer.empty();
    this.variantsSelectorContainer.append(html);
  }

  showNoVariantsDef(){
    console.log("showNoVariantsDef");
    var html = this.applyTemplate("noEntry");
    this.mainSection.append(html);
  }

  bindJS(){
    console.log("bindJS for variants management");
    $('#btn-add-variant').off("click").on("click",() => {
      console.log("Add new variant click");
    });

    $('#btn-save').off("click").on("click",() => {
      console.log("Save Variants changes click");
    });

    $('#btn-delete-variant').off("click").on("click",() => {
      console.log("Delete variant click");
    });

  }

  onRemove(){
    console.log("onRemove");
  }
}
