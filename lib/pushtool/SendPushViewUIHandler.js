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

    $('#send-push-btn').click((evt)=>{
      this.sendPush();
    });
  }

  sendPush(){
      Logger.debug("sendPush required");

      var title = $('#push-val-title').val();
      var topic = $('#push-val-topic').val();
      var body = $('#push-val-body').val();
      var alert = $('#push-val-alert').val();
      var sound = $('#push-val-sound').val();
      var badge = $('#push-val-badge').val();
      var category = $('#push-val-category').val();

      var pushData = { alert: alert };

      var clientToken = '4e6dcdb2785b95473be9641b8f77f1faa90fa84b337037ee7687d396ccc246f6';

      this.pushSender.sendPush(pushData, clientToken)
  }

  onRemove(){
    Logger.debug("onRemove");
  }



}
