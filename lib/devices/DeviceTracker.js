'use babel'
const adb = require('adbkit');
const _ = require('lodash');
export default class DeviceTracker {
  constructor(){
    this.trackerInstance=undefined;
    this.listenersMap={};
  }
  startTracking(name){
    if(this.trackerInstance){
      this.trackerInstance.stop();
    }
    this._createTrackerForPlatform(name);
  }
  _createTrackerForPlatform(platform){
    if(platform === "android"){
       this._createAndroidTrackerAdapter();
    }else if(platform === "ios"){
       //this._createiOSTrackerAdapter()
    }
  }

  _createAndroidTrackerAdapter(){
    const client = adb.createClient();
    client.trackDevices()
    .then((tracker) => {

        tracker.on('add', (device) => {
            console.log('Device was plugged in:', device);
            this._fireCallback("DEVICE_LIST_CHANGE",device);
        });
        tracker.on('remove', (device) => {
            console.log('Device was unplugged: ', device.id)
            this._fireCallback("DEVICE_LIST_CHANGE",device);
        });
        tracker.on('end', () => {
            console.log('Tracking stopped')
            this._fireCallback("DEVICE_STOP_TRACKING");
        });

        this.trackerInstance={
          stop:function(){
            tracker.end();
          }
        }
    })
    .catch((err) => {
        console.error('Something went wrong:', err.stack);
        this.trackerInstance = undefined;
    });
  }

  _createiOSTrackerAdapter(){
    // const iosDevice = require('node-ios-device');
    // const handler = iosDevice.trackDevices()
    //    .on('devices', (devices) => {
    //      console.log("ios tracker devices: ",devices);
    //      this.fireCallback('DEVICE_LIST_CHANGE',devices);
    //     })
    //    .on("error",(err) => {
    //        console.error('Something went wrong:', err);
    //        this.trackerInstance = undefined;
    //    });
    // this.trackerInstance= {
    //   stop:function(){
    //     handler.stop();
    //   }
    // }
  }

  _fireCallback(topic,data){
    if(!this.listenersMap[topic]){
      return;
    }
    _.forEach(this.listenersMap[topic],function(callback){
      callback(data);
    });
  }

  on(topic,callback){
    if(!this.listenersMap[topic]){
      this.listenersMap[topic]=[callback];
    }else{
      this.listenersMap[topic].push(callback);
    }
  }

  off(topic,callback){
    if(!this.listenersMap[topic]){
      return;
    }
    _.remove(this.listenersMap[topic],function(item){
      item === callback;
    });
  }

  offAllTopic(){
    this.listenersMap={};
  }
  isTrackingEnabled(){
    return this.trackerInstance != undefined;
  }

  stopTracking(){
    if(this.trackerInstance){
      this.trackerInstance.stop();
    }
    this.trackerInstance=undefined;
  }

}
