'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import PluginsSearch from './plugins-search'
import PluginsScanner from './plugins-scanner'
import PluginManager from '../cordova/PluginManager'

var chokidar = require('chokidar');
var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class PluginsViewUIHandler {

  constructor() {
    Logger.debug("create PluginsViewUIHandler");
    this.pluginManager = new PluginManager(Logger);
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
  }

  init(){
    Logger.debug("onInit");
    var path= atom.project.getPaths()[0] +"/plugins/";
    this.bindJS();

    this.fileWatcher = chokidar.watch(path, 'file', {
      ignored: /[\/\\]\./,
      persistent: true
    });
    this.fileWatcher.on('change', path => this.scanPlugins());

    this.pluginSearch = new PluginsSearch();
    this.pluginsScanner = new PluginsScanner();
    this.scanPlugins();
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
    $('#refresh-installed-plugins').on('click', (evt)=>{
      this.scanPlugins();
    });
  }

  onRemove(){
    Logger.debug("onRemove");
    if(this.fileWatcher){
      this.fileWatcher.close();
    }
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
      $(evt.currentTarget).addClass("is-uninstalling");
      that.uninstallPlugin($(evt.currentTarget).attr('pluginId'));
    });
  }

  uninstallPlugin(pluginSpec){
    Logger.info("Uninstalling plugin "+ pluginSpec +"...");
    this.pluginManager.removePlugin(pluginSpec).then(()=>{
      $('[pluginId="' + pluginSpec +'"]').removeClass("is-uninstalling");
      Logger.info("Plugin " + pluginSpec +" unistalled succesffully");
      atom.notifications.addSuccess("Plugin "+ pluginSpec + " uninstalled successfully.", {dismissable:true});
      this.scanPlugins();
    }, (err)=>{
      $('[pluginId="' + pluginSpec +'"]').removeClass("is-uninstalling");
      Logger.error("Uninstall plugin error: ", err);
      atom.notifications.addError("Plugin "+ pluginSpec+ " uninstallation error." , { dismissable: true, detail: err});
    });
  }


}
