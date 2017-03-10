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
    Logger.debug("Sending to APN...Data: " + JSON.stringify(pushData));

    var note = new apn.Notification();

    //note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    /**
    note.badge = 0;
    note.sound = "ping.aiff";
    note.title = "Questo è il titolo";
    note.body = "Questo è il body";
    **/
    note.alert = "You have a new message";
    /**
    note.payload = {'messageFrom': 'John Appleseed' , 'name': 'John'};
    //note.topic = "com.vipera.lab.hellocordova";
    note.category = "invite";
    //note.action =["yes", "no"];
    **/

    this.apnProvider.send(note, clientToken).then( (result) => {
        Logger.info("Push sent to APN: " + sresult);
        // see documentation for an explanation of result
    });
  }

}
