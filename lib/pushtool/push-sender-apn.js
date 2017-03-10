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

    /**
    note.payload = {'messageFrom': 'John Appleseed' , 'name': 'John'};
    //note.topic = "com.vipera.lab.hellocordova";
    note.category = "invite";
    //note.action =["yes", "no"];
    **/

    var recipients = pushData.recipients;

    Logger.debug("APN note: " + JSON.stringify(note));

    for (i=0;i<recipients.length;i++){
      this.apnProvider.send(note, recipients[i]).then( (result) => {
          Logger.info("Push sent to APN: " + sresult);
          completionCallback(null, "Sent!");
      });
    }

  }

}
