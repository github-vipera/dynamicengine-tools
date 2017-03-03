'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import http from 'http'
import httpReq from 'request';
var fs = require('fs');

export default class PluginsScanner {

  constructor() {
    console.log("creating PluginsScanner");
    this.pluginIds = [];
  }


  scan(path){
    console.log("Scanning folder '" + path + "' for plugins...");
    try {
      this.pluginIds = new Array();
      this.path = path;
      this.pluginsPath = path +"/plugins";
      this.fetchJson = JSON.parse(fs.readFileSync(this.pluginsPath + "/fetch.json", 'utf8'));
      console.log("Plugins loaded: " + JSON.stringify(this.fetchJson));

      for (var pluginId in this.fetchJson) {
        this.scanPlugin(pluginId, path);
      }

      return true;
    } catch (err){
      this.fetchJson = {};
      //atom.notifications.addError("Uhm...this project does not seem to be a Cordova project.");
      console.log("Error: " + err);
    }
  }

  scanPlugin(pluginId, path){
    console.log("scanPlugin for "+ pluginId + " in path " + path);
    this.pluginIds.push(pluginId);
  }

  getInstalledPlugin(){
    return this.fetchJson;
  }

  isPluginInstalled(pluginId){
    var check = this.fetchJson[pluginId];
    return ((check!=null)&&(check!=undefined)); 
  }

}
