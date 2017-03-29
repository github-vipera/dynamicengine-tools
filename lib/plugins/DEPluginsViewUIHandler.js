'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import PluginManager from '../cordova/PluginManager'
import moment from 'moment'
import DEPluginsDataLoader from './deplugins_dataloader'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class DEPluginsViewUIHandler {

  constructor() {
    Logger.debug("create DEPluginsViewUIHandler");
    this.pluginManager = new PluginManager(Logger);
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
    Handlebars.registerHelper('formatLastUpdate', function(date) {
      return moment(date).fromNow();
    });
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
    $('#search-spinner').hide();

    var dePluginsList = this.getDEPluginsList(); //TODO!!
    this.displayDEPlugins(dePluginsList);

  }

  bindJS(){
    Logger.debug("bindJS");

    var that = this;

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
    this.pluginManager.addPlugin(pluginSpec).then(()=>{
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
    var data = loader.loadData();
    return data;
      /**
    var pluginItem = this.createPluginItem("de-motifconnector-plugin","https://gitlab.vipera.com/dynamic-engine/de-motifconnector-plugin", "https://gitlab.vipera.com/dynamic-engine/de-motifconnector-plugin.git", "1.0.0", "MOTIF Connector plugin", "27/08/1973");
    list.push(pluginItem);

    pluginItem = this.createPluginItem("de-splashscreen-plugin","https://gitlab.vipera.com/dynamic-engine/de-splashscreen-plugin", "https://gitlab.vipera.com/dynamic-engine/de-splashscreen-plugin.git", "1.0.0", "Splash Screen Plugin", "27/08/1973");
    list.push(pluginItem);

    return list;
    **/
  }

  createPluginItem(name, url, repoUrl, version, description, lastUpdate){
    return {
      "name" : name,
      "url" : url,
      "repoUrl" : repoUrl,
      "version" : version,
      "description" : description,
      "lastUpdate" : lastUpdate
    };
  }

}
