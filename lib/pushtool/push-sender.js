'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'
var fs = require('fs');
import PushSenderAPN from './push-sender-apn'
import PushSenderGCM from './push-sender-gcm'

export default class PushSender {

  constructor(configuration) {
    console.log("creating PushSender");

    this.configuration = configuration;

    //register available senders
    this.configuration.ios.apn.production = false; //TODO make flag available in configuration
    var apnSender = new PushSenderAPN(this.configuration.ios.apn);
    var gcmSender = new PushSenderGCM(this.configuration.google);

    this.platformSenderList = { platforms : {
        ios : apnSender,
        android: gcmSender
      }
    };

  }

  buildPushData(){
    return {};
  }

  sendPush(pushData, platform, completionCallback){
    Logger.debug("sendPush called for " + JSON.stringify(pushData));

    if (!(pushData.recipients) || (pushData.recipients.length==0)){
      completionCallback({message:"Unable to send push notification: invalid recipients list.", severity:"warning"});
      return;
    }

    if (platform==='ios'){
      this.platformSenderList.platforms.ios.sendPush(pushData, completionCallback);
    }

    if (platform==='android'){
      this.platformSenderList.platforms.android.sendPush(pushData, completionCallback);
    }

    if (platform==='both'){
      this.platformSenderList.platforms.ios.sendPush(pushData, completionCallback);
      this.platformSenderList.platforms.android.sendPush(pushData, completionCallback);
    }
    
  }

}
