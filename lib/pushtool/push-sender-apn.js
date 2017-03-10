'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
var apn = allowUnsafeNewFunction(()=> allowUnsafeEval(() => require('apn')));

export default class PushSenderAPN {

  constructor() {
    console.log("creating PushSenderAPN");

    this.options = {
        cert: "/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/aps_development.pem",
        key: "/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/key.pem",
        passphrase:"vipera17",
        production: false
    };

    this.apnProvider = new apn.Provider(this.options);

  }

  sendPush(pushData, clientToken, completionCallback){
    Logger.debug("Sending to APN...Data: " + pushData);
    //TODO!!
  }

}
