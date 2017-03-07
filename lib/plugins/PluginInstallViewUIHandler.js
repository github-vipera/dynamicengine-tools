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
export default class PluginInstallViewUIHandler {

  constructor() {
    Logger.debug("create PluginInstallViewUIHandler");
    this.pluginManager = new PluginManager(Logger);
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
    this.pluginSearch = new PluginsSearch();
    this.pluginsScanner = new PluginsScanner();
    this.scanPlugins();
    $('#search-spinner').hide();
  }

  scanPlugins(){
    this.pluginsScanner.scan(atom.project.getPaths()[0], (installedPlugins)=>{
      //scan complete
    });
  }

  bindJS(){
    Logger.debug("bindJS");

    var that = this;
    $("#txt-plugins-search").keypress(function(e) {
      if (e.which == 13){
        that.submitSearch();
      }
    });

    $('.platform-select').click(function(evt){
      $("#" + evt.target.id).toggleClass('selected');
    });

    $('#btn-install-plugin-manually').click((evt)=>{
      this.promptForInstallPluginManually();
    });


  }

  promptForInstallPluginManually(){
    if (!this.addPreferenceModalPanel){
      var pluginInstallView = require('./plugin-install-view');
      this.addPreferenceModalPanel = atom.workspace.addModalPanel({
        item: pluginInstallView.getModalForManualInstall($),
        visible: true
      });
      $('#cancel-plugin-install').on('click', (evt)=>{
        this.addPreferenceModalPanel.hide();
      });
      $('#do-plugin-manually-install').on('click', (evt)=>{
        this.addPreferenceModalPanel.hide();
        this.installPlugin($('#txt-manual-plugin-install-spec').val());
      });

    } else {
      this.addPreferenceModalPanel.show();
    }
  }


  onRemove(){
    Logger.debug("onRemove");
  }

  submitSearch(){
    var that = this;
    var search = $("#txt-plugins-search").val();
    var keywords = _.split(search, ' ');
    $('#search-spinner').show();
    this.pluginSearch.search(keywords, keywords, null, function(error, results){
      $('#search-spinner').hide();
      that.displayResults(results);
      console.log(JSON.stringify(results));
    });
  }

  displayResults(results){
    var that = this;
    var TemplatesView = require("./plugins-search-results-template.js");
    var source = TemplatesView.render();
    var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
    var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(results)));
    document.getElementById('plugins-search-results-container').innerHTML = result;

    $('[btn-install-plugin]').on('click', function(evt){
      that.installPlugin($(evt.currentTarget).attr('pluginId'));
    });

  }

  installPlugin(pluginSpec){
    Logger.info("Installing plugin "+ pluginSpec +"...");
    var that = this;
    this.pluginManager.addPlugin(pluginSpec).then(()=>{
      Logger.info("Plugin " + pluginSpec +" unistalled succesffully");
      atom.notifications.addSuccess("Plugin "+ pluginSpec + " installed successfully.", {dismissable:true});
      this.scanPlugins();
    }, (err)=>{
      Logger.error("Install plugin error: ", err);
      atom.notifications.addError("Plugin "+ pluginSpec+ " installation error." , { dismissable: true, detail: err});
    });
  }

}
