'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
var apn = allowUnsafeNewFunction(()=> allowUnsafeEval(() => require('apn')));

export default class PushSenderAPN {

  constructor(configuration) {
    console.log("creating PushSenderAPN");

    this.configuration = configuration;

    this.options = {
        cert: this.configuration.certPath /*"/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/aps_development.pem"*/,
        key: this.configuration.keyPath /*"/Users/marcobonati/Develop/sources/Vipera/DynamicEngine2/Tools/PushServer/key.pem"*/,
        passphrase: this.configuration.passphrase /*"vipera17"*/,
        production: this.configuration.production /*false*/
    };
    this.apnProvider = new apn.Provider(this.options);
  }

  sendPush(pushData, completionCallback){
    Logger.debug("Sending to APN...Data: " + JSON.stringify(pushData));

    var note = new apn.Notification();

    //note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    /**
    note.badge = 0;
    note.sound = "ping.aiff";
    note.title = "Questo è il titolo";
    note.body = "Questo è il body";
    **/

    if (pushData.badge){
      note.badge = pushData.badge;
    }
    if (pushData.sound){
      note.sound = pushData.sound;
    }
    if (pushData.title){
      note.title = pushData.title;
    }
    if (pushData.body){
      note.body = pushData.body;
    }
    if (pushData.topic){
      note.topic = pushData.topic;
    }
    if (pushData.category){
      note.category = pushData.category;
    }
    if (pushData.alert){
      note.alert = pushData.alert;
    }
    if (pushData.payload){
      note.payload = pushData.payload;
    }

    var recipients = pushData.recipients;

    Logger.debug("APN note: " + JSON.stringify(note));

    for (i=0;i<recipients.length;i++){
      this.apnProvider.send(note, recipients[i]).then( (result) => {
          if (result.failed.length>0){
            var details = "Error results: " + JSON.stringify(result.failed);
            completionCallback({ message: result.failed[0].response.reason, severity:"error", details: details}, null);
          } else {
            completionCallback(null, "Message sent.");
          }
          console.dir(result);
      });
    }


  }

}
