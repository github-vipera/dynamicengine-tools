'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
import Handlebars from "Handlebars"
import VariantsHandler from "./VariantsHandler"
var fs = require('fs');
const VARIANT_FILE_RELATIVE = "/variants/variants_def.xml";
export default class VariantsViewUIHandler {
  constructor() {
    console.log("create VariantsViewUIHandler");
    this.mainSection=undefined;
    this.variantsSelectorContainer = undefined;
    this.templatesFn={};
    this.variantsHandler= new VariantsHandler();
    this.variants = undefined;
    this.addPreferenceModalPanel = undefined;
    this.addVariantModalPanel = undefined;
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
    this.variantsHandler.initEmptyObject();
    console.log("onInit");
    var path= atom.project.getPaths()[0] + VARIANT_FILE_RELATIVE;
    this.mainSection = $("#main-section");
    this.variantsSelectorContainer = $("#variants-selector-container");
    this.createAndPrecompileTemplates();

    if(!fs.existsSync(path)){
      console.log("No variants defined");
      this.showNoVariantsDef();
      this.variants = this.variantsHandler.getVariants();
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
      this.reloadUI();
      //this.renderSingleVariant(this.variants[0]);
      //this.renderVariants(this.variants);
    },() => {
      console.error("loading fail!!!!");
    });
  }

  reloadUI(){
    if(!this.variants || this.variants.length === 0){
      this.showNoVariantsDef();
      this.renderVariantsSelector([]);
      return;
    }
    this.renderVariantsSelector(this.variants);
    this.bindJSForSelector();
    this.setSelectedVariantByName(this.getNameByIndex(0));
  }

  bindJSForSelector(){
    $('[variant-selector]').bind('click',(evt) => {
      var variantName= $(evt.currentTarget).attr("variant-selector");
      console.log("Click on: ",variantName);
      this.setSelectedVariantByName(variantName);
    });
  }

  createModalAddPreference(){
    var addPreferenceView=require('./add-preference-view');
    this.addPreferenceModalPanel = atom.workspace.addModalPanel({
      item: addPreferenceView.getItem($),
      visible: true
    });
    this.addPreferenceModalPanel.__clear =function(){
      addPreferenceView.clear($);
    }
  }

  createModalAddVariant(){
    var addVariantView=require('./add-variant-view');
    this.addVariantModalPanel = atom.workspace.addModalPanel({
      item: addVariantView.getItem($),
      visible: true
    });
    this.addVariantModalPanel.__clear =function(){
      addVariantView.clear($);
    }
  }

  showModalAddVariant(){
    return new Promise((resolve,reject) => {
      if(!this.addVariantModalPanel){
        this.createModalAddVariant();
      }
      this.addVariantModalPanel.show();
      // bind js for manage modal
      $('#btn-confirm-add-variant').off('click').on('click',() => {
        console.log("Add variant done");
        var variantName=$("#txt-new-variant-name").val();
        this.addVariantModalPanel.hide();
        this.addVariantModalPanel.__clear()
        resolve({
          cancel:false,
          variantName:variantName
        })

      });
      $('#btn-cancel-add-variant').off('click').on('click',() => {
        console.log("Add variant cancel");
        this.addVariantModalPanel.hide();
        this.addVariantModalPanel.__clear()
        resolve({
          cancel:true
        });
      });
    });
  }

  showModalAddPreference(){
    return new Promise((resolve,reject) => {
      if(!this.addPreferenceModalPanel){
        this.createModalAddPreference();
      }
      this.addPreferenceModalPanel.show();
      // bind js for manage modal
      $('#btn-add-preference').off('click').on('click',() => {
        console.log("confirm preference add");
        var preference = {};
        preference.name = $('#txt-new-preference-name').val().trim() || undefined;
        preference.value = $('#txt-new-preference-value').val().trim() || undefined;
        this.addPreferenceModalPanel.hide();
        this.addPreferenceModalPanel.__clear();
        resolve({
          cancel:false,
          preference:preference
        });
      });
      $('#btn-cancel-add-preference').off('click').on('click',() => {
        console.log("cancel preference add");
        this.addPreferenceModalPanel.hide();
        this.addPreferenceModalPanel.__clear()
        resolve({cancel:true});
      });
    });
  }

  bindJSForPreferenceBtn(){
    $('[variant-add-preference]').off("click").on('click',(evt) => {
      var jqueryEl=$(evt.currentTarget);
      var variantName= jqueryEl.attr("variant-ref");
      console.log("Add preference",variantName);
      this.showModalAddPreference().then((res) => {
        if(res.cancel){
          console.log("operation cancel");
          return;
        }
        console.log("Add new preference: ",res.preference);
        this.applyPreferenceChange(res.preference.value,res.preference.name,variantName);
        this.reloadCurrentVariant();

      },(err) => {
        console.error("showModalAddPreference fail");
      });
    });
    $('[variant-add-preference-platform]').off("click").on('click',(evt) => {
      var jqueryEl=$(evt.currentTarget);
      var variantName= jqueryEl.attr("variant-ref");
      var platformName= jqueryEl.attr("variant-platform-ref");
      console.log("Add preference",variantName,platformName);
      this.showModalAddPreference().then((res) => {
        if(res.cancel){
          console.log("operation cancel");
          return;
        }
        console.log("Add new preference: ",res.preference);
        this.applyPreferenceChange(res.preference.value,res.preference.name,variantName,platformName);
        this.reloadCurrentVariant();
      },(err) => {
        console.error("showModalAddPreference fail");
      });
    });
    $('[variant-remove-preference]').off('click').on('click',(evt) => {
        var jqueryEl=$(evt.currentTarget);
        var variantName= jqueryEl.attr("variant-ref");
        var preferenceName= jqueryEl.attr("variant-preference-id");
        var platformName= jqueryEl.attr("variant-platform-ref");
        this.removePreference(preferenceName,variantName,platformName);
        this.reloadCurrentVariant();
    });
  }

  bindJSForPreferenceChange(){
    console.log("bindJSForPreferenceChange");
    $('[variant-preference-id]').off("change").on('change',(evt) => {
      var jqueryEl=$(evt.currentTarget);
      var variantName= jqueryEl.attr("variant-ref");
      var preferenceName= jqueryEl.attr("variant-preference-id");
      var value=jqueryEl.val();
      console.log("Change preference: ",preferenceName," of variant",variantName, " value:",value);
      this.applyPreferenceChange(value,preferenceName,variantName);
    })

    $('[variant-preference-platform-id]').off("change").on('change',(evt) => {
      var jqueryEl=$(evt.currentTarget);
      var variantName= jqueryEl.attr("variant-ref");
      var preferenceName= jqueryEl.attr("variant-preference-platform-id");
      var platformName= jqueryEl.attr("variant-platform-ref");
      var value=jqueryEl.val();
      console.log("Change preference: ",preferenceName," of variant",variantName,"of platform",platformName, " value:",value);
      this.applyPreferenceChange(value,preferenceName,variantName,platformName);
    })
  }


  reloadCurrentVariant(){
    console.log("reloadCurrentVariant");
    this.setSelectedVariant(this.selectedVariantIndex);
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
      var platform = _.find(variantDef.platform,(item)=>{
        return item.name === platformName;
      });
      if(!platform){
        console.error("platform ",platform," not found");
        return;
      }
      this.addOrChangePreference(preference,platform.preference);
    }
  }

  removePreferenceFromArray(array,preferenceName){
    _.remove(array, (item) => {
      return item.name === preferenceName;
    });
  }

  removePreference(preferenceName,variantName,platformName){
    console.log("Delete ",preferenceName," from variant: ",variantName);
    var index=this.getIndexByName(variantName);
    if(index<0){
      atom.notifications.addError("applyPreferenceChange fail: variant " + variantName  + " not found");
      return;
    }
    var variantDef=this.variants[index];
    if(!platformName){
      this.removePreferenceFromArray(variantDef.preference,preferenceName);
    }else{
      var platform = _.find(variantDef.platform,(item)=>{
        return item.name === platformName;
      });
      if(!platform){
        console.error("platform ",platform," not found");
        return;
      }
      this.removePreferenceFromArray(platform.preference,preferenceName);
    }
  }

  updateVariantSelector(name){
    $('[variant-selector]').removeClass("selected");
    $("[variant-selector='" + name + "'").addClass("selected");
  }

  reloadVariantSelector(index){
    this.renderVariantsSelector(this.variants);
    this.bindJSForSelector();
    var name = this.getNameByIndex(index);
    this.updateVariantSelector(name);
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
    this.selectedVariantIndex=index;
    this.renderSingleVariant(this.variants[index]);
    this.bindJSForPreferenceChange();
    this.bindJSForPreferenceBtn();
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
    this.mainSection.empty();
    this.mainSection.append(html);
  }


  bindJS(){
    console.log("bindJS for variants management");
    $('#btn-add-variant').off("click").on("click",() => {
      console.log("Add new variant click");
      this.showModalAddVariant().then((res) => {
        if(res.cancel){
          console.log("add variant cancel");
          return;
        }
        console.log("Add variant:",res.variantName);
        var newVariant=VariantsHandler.createVariantSkeleton(res.variantName);
        console.log("new variant:",newVariant);
        this.variants[this.variants.length] = newVariant;
        this.reloadVariantSelector(this.selectedVariantIndex);
      });
    });

    $('#btn-save').off("click").on("click",() => {
      console.log("Save Variants changes click");
      this.variantsHandler.applyChanges(this.variants);
    });

    $('#btn-delete-variant').off("click").on("click",() => {
      if(this.selectedVariantIndex < 0){
        return;
      }
      var variantToDeleteName = this.variants[this.selectedVariantIndex].name;
      console.log("Delete variant click,", variantToDeleteName);
      this.openConfirmDialog("Delete Variant","Delete variant " + this.variants[this.selectedVariantIndex].name  + "?").then(()=>{
        console.log("yes");
        this.manageVariantDelete(variantToDeleteName);
      }, () => {
        console.log("cancel");
      });
    });

  }

  manageVariantDelete(variantToDeleteName){
    console.log("manageVariantDelete:",variantToDeleteName);
    this.variants = _.filter(this.variants,(v) => {
      return v.name !== variantToDeleteName;
    });
    this.reloadUI();
  }


  openConfirmDialog(message,detailedMessage){
    return new Promise((resolve,reject) => {
      atom.confirm({
        message:message,
        detailedMessage:detailedMessage,
        buttons:{
          yes: resolve,
          cancel: reject
        }
      });
    });
  }

  onRemove(){
    console.log("onRemove");
  }
}
