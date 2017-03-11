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
  }

  init(){
    Logger.debug("onInit");
    this.bindJS();
  }

  bindJS(){
    Logger.debug("bindJS");
  }

  onRemove(){
    Logger.debug("onRemove");
  }

}
