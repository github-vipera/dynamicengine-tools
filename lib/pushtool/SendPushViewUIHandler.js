'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import moment from 'moment'
import PushSender from './push-sender.js'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class SendPushViewUIHandler {

  constructor() {
    Logger.debug("create SendPushViewUIHandler");
    this.pushSender = new PushSender();
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];
    this.bindJS();
  }

  bindJS(){
    Logger.debug("bindJS");

    $('[push-platform-select]').click(function(evt){
      $(evt.currentTarget).toggleClass("selected");
    });

  }


  onRemove(){
    Logger.debug("onRemove");
  }



}
