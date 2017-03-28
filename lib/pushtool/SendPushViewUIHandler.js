'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import Handlebars from 'Handlebars';
import moment from 'moment'
import PushSender from './push-sender.js'
import DEToolsProject from '../project/DEToolsProject'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class SendPushViewUIHandler {

  constructor() {
    Logger.debug("create SendPushViewUIHandler");
    /*
     var pushConfig = {
       ios: {
         apn: {
           certPath : "/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/aps_development.pem",
           keyPath: "/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/key.pem",
           passphrase : "vipera17",
           production : false
         }
       }
     }
     **/
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    var path= atom.project.getPaths()[0];

    this.project = new DEToolsProject();
    this.project.load().then(()=>{
      this.initFormPojectFile();
    });

    this.bindJS();
    this.loadLatestConfig();
  }

  initFormPojectFile(){
    var pushConfig = this.project.get('pushtool-config');
    this.pushSender = new PushSender(pushConfig);

    var latestSendConfig = this.project.get('pushtool-latest-send');
      if (latestSendConfig){
        $('#push-val-recipients').val(latestSendConfig.recipients);
        $('#push-val-title').val(latestSendConfig.title);
        $('#push-val-topic').val(latestSendConfig.topic);
        $('#push-val-body').val(latestSendConfig.body);
        $('#push-val-alert').val(latestSendConfig.alert);
        $('#push-val-sound').val(latestSendConfig.sound);
        $('#push-val-badge').val(latestSendConfig.badge);
        $('#push-val-category').val(latestSendConfig.category);
        $('#push-val-payload').val(latestSendConfig.payload);
      } else {
        //no config!
      }
  }

  loadLatestConfig(){
    this.project.load().then(()=>{
      var latestSendConfig = this.project.get('pushtool-latest-send');
        if (latestSendConfig){
          $('#push-val-recipients').val(latestSendConfig.recipients);
          $('#push-val-title').val(latestSendConfig.title);
          $('#push-val-topic').val(latestSendConfig.topic);
          $('#push-val-body').val(latestSendConfig.body);
          $('#push-val-alert').val(latestSendConfig.alert);
          $('#push-val-sound').val(latestSendConfig.sound);
          $('#push-val-badge').val(latestSendConfig.badge);
          $('#push-val-category').val(latestSendConfig.category);
          $('#push-val-payload').val(latestSendConfig.payload);
         }
      });
  }

  storeLastSendConfig(){
    var latestSendConfig = {}; //this.project.getDB().get('pushtool-latest-send');
    latestSendConfig.recipients = $('#push-val-recipients').val();
    latestSendConfig.title = $('#push-val-title').val();
    latestSendConfig.topic = $('#push-val-topic').val();
    latestSendConfig.body = $('#push-val-body').val();
    latestSendConfig.alert = $('#push-val-alert').val();
    latestSendConfig.sound = $('#push-val-sound').val();
    latestSendConfig.badge = $('#push-val-badge').val();
    latestSendConfig.category = $('#push-val-category').val();
    latestSendConfig.payload = $('#push-val-payload').val();
    this.project.save('pushtool-latest-send', latestSendConfig);
  }

  bindJS(){
    Logger.debug("bindJS");

    $('[send-push-param]').on('change', (evt)=>{
        this.storeLastSendConfig();
    });

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
    $('#push-val-payload').val('');
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
      var payloadStr = $('#push-val-payload').val();
      var payload = undefined;
      if (payloadStr){
        payload = JSON.parse(payloadStr);
      }

      var pushData = {};

      pushData = this.fillPushData(pushData, recipients, 'recipients');
      pushData = this.fillPushData(pushData, $('#push-val-title').val(), 'title');
      pushData = this.fillPushData(pushData, $('#push-val-topic').val(), 'topic');
      pushData = this.fillPushData(pushData, $('#push-val-body').val(), 'body');
      pushData = this.fillPushData(pushData, $('#push-val-alert').val(), 'alert');
      pushData = this.fillPushData(pushData, $('#push-val-sound').val(), 'sound');
      if (badge && badge.length>0){
        var badgeValue = parseInt(badge);
        pushData.badge = badgeValue;
      }
      pushData = this.fillPushData(pushData, $('#push-val-category').val(), 'category');
      if (payload){
          pushData.payload = payload;
      }

      // #push-platform-select
      var platform = 'ios';

      this.pushSender.sendPush(pushData, platform, function(error, results){
          if (error){
            if (error.severity==="error"){
              var  strMessage = "Error sending notification: " + error.message;
              var options = { dismissable: true };
              if (error.details){
                options.detail = error.details;
              }
              atom.notifications.addError(strMessage, options);
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
