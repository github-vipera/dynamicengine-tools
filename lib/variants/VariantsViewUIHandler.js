'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var fs = require('fs');
export default class VariantsViewUIHandler {
  constructor() {
    console.log("create PluginsUIHandler");
  }
  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0];
    if(!fs.existsSync(path)){
      this.showNoVariantsDef();
    }
    this.bindJS();
  }

  showNoVariantsDef(){
    
  }

  bindJS(){
    console.log("bindJS");

  }

  onRemove(){
    console.log("onRemove");
  }
}
