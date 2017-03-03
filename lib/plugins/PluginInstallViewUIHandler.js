'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var fs = require('fs');
export default class PluginInstallViewUIHandler {
  constructor() {
    console.log("create PluginInstallViewUIHandler");
  }
  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0];
    this.bindJS();
  }

  bindJS(){
    console.log("bindJS");

    var that = this;
    $("#txt-plugins-search").keypress(function(e) {
      if (e.which == 13){
        that.submitSearch();
      }
    });

  }

  onRemove(){
    console.log("onRemove");
  }

  submitSearch(){
    alert("Submitted!");
  }

}
