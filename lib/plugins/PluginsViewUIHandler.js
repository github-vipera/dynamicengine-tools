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
    var path= atom.project.getPaths()[0];
    this.bindJS();
    this.pluginSearch = new PluginsSearch();
    this.pluginsScanner = new PluginsScanner();
    this.pluginsScanner.scan(atom.project.getPaths()[0]);
    $('#search-spinner').hide();
  }

  bindJS(){
    console.log("bindJS");
  }

  onRemove(){
    console.log("onRemove");
  }

  
}
