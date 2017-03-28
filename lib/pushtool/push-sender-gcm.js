'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
var gcm = allowUnsafeNewFunction(()=> allowUnsafeEval(() => require('node-gcm')));

export default class PushSenderGCM {

  constructor(configuration) {
    console.log("creating PushSenderGCM");

    this.configuration = configuration;

  }

  sendPush(pushData, completionCallback){
    Logger.debug("Sending to GCM...Data: " + JSON.stringify(pushData));

    var message = new gcm.Message();

    var message = new gcm.Message();
    // Add notification payload as key value
    if (pushData.title){
      message.addNotification('title', pushData.title);
    }
    if (pushData.body){
      message.addNotification('body', pushData.body);
    }
    if (pushData.icon){
      message.addNotification('icon', pushData.icon);
    }
    if (pushData.badge){
      message.addNotification('badge', pushData.badge);
    }
    if (pushData.sound){
      message.addNotification('sound', pushData.sound);
    }
    if (pushData.payload){
      message.addData(pushData.payload);
    }

    var recipients = pushData.recipients;

    Logger.debug("APN note: " + JSON.stringify(note));

    var sender = new gcm.Sender(this.configuration.apiKey);

    // Send the message
    // ... trying only once
    sender.sendNoRetry(message, { registrationTokens: recipients }, function(err, response) {
      if (err) {
        Logger.error("Error sending GCM notification: " + err);
        console.error(err);
      } else {
        Logger.info("GCM message sent: " + response);
      }
    });

  }

}