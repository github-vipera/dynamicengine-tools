'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Handlebars from 'Handlebars';
import PluginsSearch from './plugins-search'
import PluginsScanner from './plugins-scanner'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class PluginsViewUIHandler {

  constructor() {
    console.log("create PluginsViewUIHandler");
    Handlebars.registerHelper('formatRating', function(number) {
      return parseFloat(number).toFixed(1);
    });
  }

  init(){
    console.log("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
    this.pluginSearch = new PluginsSearch();
    this.pluginsScanner = new PluginsScanner();
    this.pluginsScanner.scan(atom.project.getPaths()[0], function(installedPlugins){
      //alert("Scan complete!");
      $('#installed-plugins-count-badge').html(installedPlugins.count);
      that.displayInstalledPlugins(installedPlugins);
    });
  }

  bindJS(){
    console.log("bindJS");
  }

  onRemove(){
    console.log("onRemove");
  }

  displayInstalledPlugins(installedPlugins){
    console.log("displayInstalledPlugins");
    var that = this;
    var TemplatesView = require("./plugins-installed-results-template.js");
    var source = TemplatesView.render();
    var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
    var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(installedPlugins)));
    document.getElementById('plugins-installed-results-container').innerHTML = result;

    //plugins-installed-results-template
  }

}
