'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import chokidar from 'chokidar';
var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');

export default class AndroidSigningViewUIHandler {
  constructor() {
    Logger.debug("create AndroidSigningViewUIHandler");
  }
  init(){
    Logger.debug("onInit");
    var that = this;
    this.projectPath = atom.project.getPaths()[0];
    this.bindJS();
    $('#search-spinner').hide();
  }
  bindJS(){

  }

  writeBuildJson(buildJson){
    if (!buildJson){
      buildJson = this.defaultBuildJson();
    }
    var string = JSON.stringify(buildJson,null,'\t');
    fs.writeFile(this.buildJsonPath(),string,function(err) {
      if(err) return console.error(err);
        console.log('done');
    });
  }

  defaultBuildJson(){
      return {
        "ios" : {
          "debug" : {},
          "release" : {}
        },
        "android" : {
          "debug" : {},
          "release" : {}
        }
      };
  }
  buildJsonPath(){
      return this.projectPath + "/build.json";
  }

  onRemove(){

  }
}
