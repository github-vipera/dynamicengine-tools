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
    // Add notification payload as key value
    if (pushData.alert){
      message.addData('title', pushData.alert);
    }
    if (pushData.title){
      message.addData('title', pushData.title);
    }
    if (pushData.body){
      message.addData('body', pushData.body);
    }
    if (pushData.icon){
      message.addData('icon', pushData.icon);
    }
    if (pushData.badge){
      message.addData('badge', pushData.badge);
    }
    if (pushData.sound){
      message.addData('sound', pushData.sound);
    }
    if (pushData.payload){
      message.addData('payload',pushData.payload);
    }

    var recipients = pushData.recipients;

    Logger.debug("GCM message: " + JSON.stringify(message));

    var sender = new gcm.Sender(this.configuration.gcm.apikey);

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
