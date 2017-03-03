'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Handlebars from 'Handlebars';
import PluginsSearch from './plugins-search'
import PluginsScanner from './plugins-scanner'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class PluginInstallViewUIHandler {

  constructor() {
    console.log("create PluginInstallViewUIHandler");
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
    this.pluginsScanner.scan(atom.project.getPaths()[0], function(){
      //scan complete
    });
    $('#search-spinner').hide();
  }

  bindJS(){
    console.log("bindJS");

    var that = this;
    $("#txt-plugins-search").keypress(function(e) {
      if (e.which == 13){
        that.submitSearch();
      }
    });

    $('.platform-select').click(function(evt){
      $("#" + evt.target.id).toggleClass('selected');
    });

  }

  onRemove(){
    console.log("onRemove");
  }

  submitSearch(){
    var that = this;
    var search = $("#txt-plugins-search").val();
    var keywords = _.split(search, ' ');
    $('#search-spinner').show();
    this.pluginSearch.search(null, keywords, null, function(error, results){
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
    /**
    var TemplatesView = require("./motif-mam-doc-template.js");
    var source = TemplatesView.render();
    that.docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
  }
  var jsonSchemaData = { 'jsonSchema': jsonSchema };
  var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => that.docTemplate(jsonSchemaData)));
  document.getElementById('vipera-tools-mam-schema-doc-container').innerHTML = result;
    **/

  }

}
