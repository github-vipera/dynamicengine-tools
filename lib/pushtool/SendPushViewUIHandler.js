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

    $('#clear-send-push-form').click((evt)=>{
      this.clearForm();
    });
  }

  clearForm(){
    $('#push-val-title').val('');
    $('#push-val-topic').val('');
    $('#push-val-body').val('');
    $('#push-val-alert').val('');
    $('#push-val-sound').val('');
    $('#push-val-badge').val('');
    $('#push-val-category').val('');
  }

  sendPush(){
      Logger.debug("sendPush required");

      var recipientsStr = $('#push-val-recipients').val();
      var recipients = _.split(recipientsStr, ',');
      recipients = _.map(recipients, _.trim);
      recipients = _.filter(recipients, function(o) { return o.length>0; });

      var title = $('#push-val-title').val();
      var topic = $('#push-val-topic').val();
      var body = $('#push-val-body').val();
      var alert = $('#push-val-alert').val();
      var sound = $('#push-val-sound').val();
      var badge = $('#push-val-badge').val();
      var category = $('#push-val-category').val();

      var pushData = {};

      pushData = this.fillPushData(pushData, recipients, 'recipients');
      pushData = this.fillPushData(pushData, $('#push-val-title').val(), 'title');
      pushData = this.fillPushData(pushData, $('#push-val-topic').val(), 'topic');
      pushData = this.fillPushData(pushData, $('#push-val-body').val(), 'body');
      pushData = this.fillPushData(pushData, $('#push-val-alert').val(), 'alert');
      pushData = this.fillPushData(pushData, $('#push-val-sound').val(), 'sound');
      pushData = this.fillPushData(pushData, $('#push-val-badge').val(), 'badge');
      pushData = this.fillPushData(pushData, $('#push-val-category').val(), 'category');

      //var clientToken = '4e6dcdb2785b95473be9641b8f77f1faa90fa84b337037ee7687d396ccc246f6';

      this.pushSender.sendPush(pushData, 'ios', function(error, results){
          if (error){
            if (error.severity==="error"){
              atom.notifications.addError(error.message);
            }
            if (error.severity==="warning"){
              atom.notifications.addWarning(error.message);
            }
          }
          else {
            atom.notifications.addSuccess("Push notification sent successfully.");
          }
      });
  }

  fillPushData(pushData, value, name){
    if (value && value.length>0){
      pushData[name] = value;
    }
    return pushData;
  }

  onRemove(){
    Logger.debug("onRemove");
  }



}
