'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'
var fs = require('fs');
import PushSenderAPN from './push-sender-apn'

export default class PushSender {

  constructor() {
    console.log("creating PushSender");

    //register available senders
    var apnSender = new PushSenderAPN();
    this.platformSenderList = { platforms : {
        ios : apnSender
      }
    };

  }

  buildPushData(){
    return {};
  }

  sendPush(pushData, clientToken, completionCallback){
    Logger.debug("sendPush called for " + JSON.stringify(pushData));
    this.platformSenderList.platforms.ios.sendPush(pushData, clientToken);
  }

}
