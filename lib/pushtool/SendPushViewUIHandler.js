'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import moment from 'moment'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class SendPushViewUIHandler {

  constructor() {
    Logger.debug("create PluginInstallViewUIHandler");
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
  }

  bindJS(){
    Logger.debug("bindJS");

  }


  onRemove(){
    Logger.debug("onRemove");
  }



}
