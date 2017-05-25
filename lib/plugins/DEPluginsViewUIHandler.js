'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import PluginManager from '../cordova/PluginManager'
import moment from 'moment'
import DEPluginsDataLoader from './deplugins_dataloader'
import registryUrl from 'registry-url'
import SDKManager from '../sdkmanagement/SDKManager'

var spawn = require('child_process').spawn;
var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
const remote = require('remote');
const dialog = remote.require('electron').dialog;

export default class DEPluginsViewUIHandler {

  constructor() {
    Logger.debug("create DEPluginsViewUIHandler");
    this.spawnRef = undefined;
    this.pluginManager = new PluginManager(Logger);
    this.isWin = /^win/.test(process.platform);
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
    Handlebars.registerHelper('formatLastUpdate', function(date) {
      return moment(date).fromNow();
    });

    //offlineMode
    this.offlineMode=false;
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
    $('#search-spinner').hide();

    //var dePluginsList = this.getDEPluginsList(); //TODO!!
    //this.displayDEPlugins(dePluginsList);
    this.updateUI();
  }


  prepareCommand(cmd){
    if (this.isWin){
      cmd = cmd + ".cmd";
    }
    return cmd;
  }

  bindJS(){
    Logger.debug("bindJS");

    var that = this;

    $('#install-vipera-npm-registry').off('click').on('click', (evt)=>{
        this.setViperaNPMRegistry();
    });
    $('#restore-default-npm-registry').off('click').on('click', (evt)=>{
        this.restoreDefaultNPMRegistry();
    });

    $('#current-npm-registry').html(registryUrl());

    //OFFLINE MANAGEMENT
    $("#offline-mode-button").off('click').on('click',() => {
      this.setOfflineMode(!this.offlineMode);
    });

    $('#current-offline-sdk-location').html(SDKManager.sdkLocation);

    $('#set-vipera-sdk-location').off('click').on('click', (evt)=>{
       var sdkPath = dialog.showOpenDialog({properties: ['openDirectory']});
       if(!sdkPath){
         return;
       }
       if(!fs.existsSync(sdkPath[0])){
         atom.notifications.addError("Invalid sdk path");
         return;
       }
       this.setViperaSdkLocation(sdkPath[0]);
       this.reloadPluginList();
    });


  }

  restoreDefaultNPMRegistry(){
    this.setNPMRegistry('https://registry.npmjs.org/');
  }

  setViperaNPMRegistry(){
    this.setNPMRegistry(atom.config.get('dynamicengine-tools.ViperaNPMRegistry'));
  }

  setNPMRegistry(registryURL){
    var cmd = "npm";
    cmd = this.prepareCommand(cmd);
    this.spawnRef = spawn(cmd, ["set", "registry", registryURL], {});
    this.spawnRef.stdout.on('data', (data) => {
        if (Logger) {
            logger.info("[NPM Registry Set] " + data.toString())
        }
        //console.log(`[BrowserRunner]: ${data}`);
    });

    this.spawnRef.stderr.on('data', (data) => {
        if (Logger) {
            Logger.error("[scriptTools] " + data.toString())
        }
        //console.error(`[BrowserRunner]: ${data}`);
    });

    this.spawnRef.on('close', (code) => {
        //console.log(`[BrowserRunner] child process exited with code ${code}`);
        if (Logger) {
            Logger.info(`setNPMRegistry process exited with code ${code}`)
        }
        this.spawnRef = undefined;
        $('#current-npm-registry').html(registryUrl());
    });
  }

  onRemove(){
    Logger.debug("onRemove");
  }

  displayDEPlugins(data){
    var that = this;
    var TemplatesView = require("./deplugins-list-template.js");
    var source = TemplatesView.render();
    var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
    var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate({ "data": data })));
    document.getElementById('deplugins-list-container').innerHTML = result;

    $('[btn-install-plugin]').on('click', function(evt){
      $(evt.currentTarget).addClass("is-installing");
      that.installPlugin($(evt.currentTarget).attr('pluginId'));
    });

  }

  installPlugin(pluginSpec){
    Logger.info("Installing plugin "+ pluginSpec +"...");
    var that = this;
    let options=undefined;
    if(this.offlineMode){
      options = SDKManager.getInstallOptions();
    }
    this.pluginManager.addPlugin(pluginSpec,options).then(()=>{
      $('[pluginId="' + pluginSpec +'"]').removeClass("is-installing");
      Logger.info("Plugin " + pluginSpec +" unistalled succesffully");
      atom.notifications.addSuccess("Plugin "+ pluginSpec + " installed successfully.", {dismissable:true});
      this.scanPlugins();
    }, (err)=>{
      $('[pluginId="' + pluginSpec +'"]').removeClass("is-installing");
      Logger.error("Install plugin error: ", err);
      atom.notifications.addError("Plugin "+ pluginSpec+ " installation error." , { dismissable: true, detail: err});
    });
  }

  getDEPluginsList(){
    var list = new Array();
    var loader = new DEPluginsDataLoader();
    var data = loader.loadData(this.offlineMode);
    return data;
  }

  setOfflineMode(value){
    console.log("Switch offlineMode from ",this.offlineMode," to ", value);
    this.offlineMode = value;
    this.updateUI();
  }

  setViperaSdkLocation(value){
    console.log("Set vipera sdk location: ",value);
    SDKManager.sdkLocation = value;
    $('#current-offline-sdk-location').html(SDKManager.sdkLocation);
  }

  updateUI(){
    if(this.offlineMode){
      $("[hide-for-offline]").hide();
      $("[show-for-offline]").show();
      $("#offline-mode-button").addClass("selected");
      this.reloadPluginList();
    }else{
      $("[hide-for-offline]").show();
      $("[show-for-offline]").hide();
      $("#offline-mode-button").removeClass("selected");
      this.reloadPluginList();
    }
  }

  reloadPluginList(){
    var dePluginsList = this.getDEPluginsList();
    this.displayDEPlugins(dePluginsList);
  }




}
