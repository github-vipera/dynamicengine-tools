'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import PluginsSearch from './plugins-search'

var fs = require('fs');
export default class PluginInstallViewUIHandler {
  constructor() {
    console.log("create PluginInstallViewUIHandler");
  }
  init(){
    console.log("onInit");
    var path= atom.project.getPaths()[0];
    this.bindJS();
    this.pluginSearch = new PluginsSearch();
  }

  bindJS(){
    console.log("bindJS");

    var that = this;
    $("#txt-plugins-search").keypress(function(e) {
      if (e.which == 13){
        that.submitSearch();
      }
    });

  }

  onRemove(){
    console.log("onRemove");
  }

  submitSearch(){
    var search = $("#txt-plugins-search").val();
    var keywords = _.split(search, ' ');
    this.pluginSearch.search(null, keywords, null, function(error, results){
      alert(JSON.stringify(results));
    });
  }

}
