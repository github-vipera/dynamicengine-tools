'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import moment from 'moment'
import DEToolsProject from '../project/DEToolsProject';

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class PushSettingsViewUIHandler {

  constructor() {
    Logger.debug("create PushSettingsViewUIHandler");
    this.project = new DEToolsProject();
  }

  init(){
    Logger.debug("onInit");
    this.bindJS();
    this.loadConfig();
  }

  bindJS(){
    Logger.debug("bindJS");

    $('[push-config-param]').on('change', (evt)=>{
        this.storeConfig();
    });

  }

  onRemove(){
    Logger.debug("onRemove");
  }

  loadConfig(){
    this.project.load().then(()=>{
      var pushConfig = this.project.get('pushtool-config');
        if (pushConfig){
          $('#push-settings-apn-pempath').val(pushConfig.ios.apn.certPath);
          $('#push-settings-apn-keypath').val(pushConfig.ios.apn.keyPath);
          $('#push-settings-apn-passphrase').val(pushConfig.ios.apn.passphrase);
         }
      });
  }

  storeConfig(){
    var pushConfig = {}; //this.project.getDB().get('pushtool-latest-send');
    pushConfig.ios = {};
    pushConfig.ios.apn = {};
    pushConfig.ios.apn.certPath = $('#push-settings-apn-pempath').val();
    pushConfig.ios.apn.keyPath = $('#push-settings-apn-keypath').val();
    pushConfig.ios.apn.passphrase = $('#push-settings-apn-passphrase').val();
    this.project.save('pushtool-config', pushConfig);
  }

}
