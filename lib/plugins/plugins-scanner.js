'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import http from 'http'
import httpReq from 'request';
import Logger from '../logger/Logger'
var fs = require('fs');
var xml2js = require('xml2js');


export default class PluginsScanner {

  constructor() {
    console.log("creating PluginsScanner");
    this.pluginIds = [];
  }


  scan(path, completionCallback){
    Logger.info("Scanning folder '" + path + "' for plugins...");
    try {
      this.pluginIds = new Array();
      this.path = path;
      this.pluginsPath = path +"/plugins";
      this.fetchJson = JSON.parse(fs.readFileSync(this.pluginsPath + "/fetch.json", 'utf8'));
      this.completionCallback = completionCallback;
      this.scanningPlugins = 0;

      Logger.debug("Plugins loaded: " + JSON.stringify(this.fetchJson));

      //mark total plugins to notify when completed
      this.scanningPlugins =  Object.keys(this.fetchJson).length;
      if (this.scanningPlugins===0){
        this.completionCallback(this.getInstalledPlugin());
        return true;
      }

      for (var pluginId in this.fetchJson) {
        var pluginInfo = this.fetchJson[pluginId];
        var path = this.pluginsPath + "/" + pluginId;
        if (pluginInfo.source.type==='local' && pluginInfo.source.path){
          path = this.path + "/" + pluginInfo.source.path;
        }
        try {
          this.scanPlugin(pluginId, path);
        } catch (ex){
          Logger.error("Error in plugin scan: " + ex);
        }
      }

      return true;
    } catch (err){
      this.fetchJson = {};
      //atom.notifications.addError("Uhm...this project does not seem to be a Cordova project.");
      Logger.error("Error: " + err);
    }
  }

  scanPlugin(pluginId, path){
    var that = this;
    Logger.info("scanPlugin for "+ pluginId + " in path " + path);
    this.pluginIds.push(pluginId);
    var parser = new xml2js.Parser();
    fs.readFile(path + "/plugin.xml", function(err, data) {
      if (err){
        Logger.error("Error scanning plugin '"+ pluginId + "' in path "+ path +":");
        Logger.error(err);
      } else {
        parser.parseString(data, function (err, result) {
            var pluginId = result.plugin.$.id;
            that.fetchJson[pluginId].plugin = result.plugin;
            //console.dir(result);
        });
      }
      that.scanningPlugins--;
      if (that.scanningPlugins==0){
          that.completionCallback(that.getInstalledPlugin());
      }
    });

  }

  getInstalledPlugin(){
    var countVal = Object.keys(this.fetchJson).length;
    var ret = { plugins : this.fetchJson, count: countVal };
    return ret;
  }

  isPluginInstalled(pluginId){
    var check = this.fetchJson[pluginId];
    return ((check!=null)&&(check!=undefined));
  }

}
