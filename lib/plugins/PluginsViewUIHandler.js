'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import PluginsSearch from './plugins-search'
import PluginsScanner from './plugins-scanner'
import PluginManager from '../cordova/PluginManager'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class PluginsViewUIHandler {

  constructor() {
    Logger.debug("create PluginsViewUIHandler");
    this.pluginManager = new PluginManager(Logger);
    console.log("PIPPO ", this.commandExecutor);
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
  }

  init(){
    Logger.debug("onInit");
    var path= atom.project.getPaths()[0];
    this.bindJS();
    this.pluginSearch = new PluginsSearch();
    this.pluginsScanner = new PluginsScanner();
    this.scanPlugins()
  }

  scanPlugins(){
    this.pluginsScanner.scan(atom.project.getPaths()[0], (installedPlugins)=>{
      //alert("Scan complete!");
      $('#installed-plugins-count-badge').html(installedPlugins.count);
      this.displayInstalledPlugins(installedPlugins);
    });
  }

  bindJS(){
    Logger.debug("bindJS");
  }

  onRemove(){
    Logger.debug("onRemove");
  }

  displayInstalledPlugins(installedPlugins){
    var that = this;
    Logger.debug("displayInstalledPlugins ");
    //Logger.debug(installedPlugins);
    var that = this;
    var TemplatesView = require("./plugins-installed-results-template.js");
    var source = TemplatesView.render();
    var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
    var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(installedPlugins)));
    document.getElementById('plugins-installed-results-container').innerHTML = result;

    $('[uninstall-plugin-action]').on('click', function(evt){
      that.uninstallPlugin($(evt.currentTarget).attr('pluginId'));
    });
  }

  uninstallPlugin(pluginId){
    Logger.info("Uninstalling plugin "+ pluginId +"...");
    this.pluginManager.removePlugin(pluginId).then(()=>{
      Logger.info("Plugin " + pluginId +" unistalled succesffully");
      this.scanPlugins();
    }, (err)=>{
      Logger.error("Uninstall plugin error: ", err);
    });
  }


}
