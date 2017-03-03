'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var fs = require('fs');
export default class VariantsViewUIHandler {
  constructor() {
    console.log("create VariantsViewUIHandler");
  }
  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0] + "/variants_def.xml";
    if(fs.existsSync(path)){
      this.showNoVariantsDef();
    }
    this.bindJS();
  }
  showNoVariantsDef(){
    console.log("showNoVariantsDef");
  }

  bindJS(){
    console.log("bindJS");

  }

  onRemove(){
    console.log("onRemove");
  }
}
