'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import chokidar from 'chokidar';
const fs = require('fs');
const {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
const remote = require('remote');
const dialog = remote.require('electron').dialog;

export default class AndroidSigningViewUIHandler {
  constructor() {
    Logger.debug("create AndroidSigningViewUIHandler");
  }
  init(){
    Logger.debug("onInit");
    var that = this;
    this.projectPath = atom.project.getPaths()[0];
    this.reloadConfig();
    this.bindJS();
  }
  bindJS(){
    $("#btn-refresh-android-signing").off('click').on("click",() => {
      this.reloadConfig();
    });
    $("#btn-save-signing-changes").off('click').on("click",() => {
      this.saveConfig();
    });
    $("[set-keystore-path-for]").off('click').on('click',(evt) => {
      var elem=$(evt.currentTarget);
      var buildName= elem.attr("set-keystore-path-for");
      var path = dialog.showOpenDialog();
      this.updateKeyStorePath(buildName,path);
    });
  }

  reloadConfig(){
    var exists = fs.existsSync(this.buildJsonPath());
    if (!exists){
      this.buildJson = this.defaultBuildJson();
      this.writeBuildJson(this.buildJson);
    } else {
      this.buildJson = JSON.parse(fs.readFileSync(this.buildJsonPath(), 'utf8'));
    }
    this.updateUI(this.buildJson.android);
  }

  updateUI(json){
    var debugConfig=json.debug;
    var releaseConfig=json.release;
    this.updateUISection("debug",debugConfig);
    this.updateUISection("release",releaseConfig);
  }

  updateUISection(name,json){
    console.log("updateUISection for: ",name);
    $("#android-keystore-path-" + name).val(json.keystore);
    $("#android-store-password-" + name).val(json.storePassword);
    $("#android-keystore-alias-" + name).val(json.alias);
    $("#android-key-pass-" + name).val(json.password);
  }

  updateKeyStorePath(name,path){
    $("#android-keystore-path-" + name).val(path);
  }

  getCurrentSectionValues(name){
    return{
      keystore: $("#android-keystore-path-" + name).val() || undefined,
      storePassword:  $("#android-store-password-" + name).val() || undefined,
      alias: $("#android-keystore-alias-" + name).val() || undefined,
      password: $("#android-key-pass-" + name).val() || undefined,
      keystoreType: ""
    }
  }

  saveConfig(){
    var debug = this.getCurrentSectionValues("debug");
    var release = this.getCurrentSectionValues("release");
    this.buildJson.android = {
      "debug":debug,
      "release":release
    };
    this.writeBuildJson(this.buildJson);

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
