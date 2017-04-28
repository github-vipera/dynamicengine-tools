'use babel'
const adb = require('adbkit');
const iosDevice = require('node-ios-device');
export default class DeviceTracker {
  constructor(){
    this.trackerInstance=undefined;
    this.listenersMap={};
  }
  startTracking(name){
    if(this.trackerInstance){
      this.trackerInstance.stop();
    }
  }
  _createTrackerForPlatform(platform){
    if(platform === "android"){
       this.createAndroidTrackerAdapter();
    }else if(platform === "ios"){
       this.createiOSTrackerAdapter()
    }
  }

  _createAndroidTrackerAdapter(){
    const client = adb.createClient();
    client.trackDevices()
    .then((tracker) => {

        tracker.on('add', function(device) {
            console.log('Device was plugged in:', device);
            this._fireCallback("DEVICE_LIST_CHANGE",device);
        });
        tracker.on('remove', function(device) {
            console.log('Device was unplugged: ', device.id)
            this._fireCallback("DEVICE_LIST_CHANGE",device);
        });
        tracker.on('end', function() {
            console.log('Tracking stopped')
            this._fireCallback("DEVICE_STOP_TRACKING",device);
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

  createiOSTrackerAdapter(){
    const handle = iosDevice
       .trackDevices()
       .on('devices', (devices) => {
         this.fireCallback('DEVICE_LIST_CHANGE',devices);
       }));
       .on("error",(err) => {
           console.error('Something went wrong:', err.stack);
           this.trackerInstance = undefined;
       });
    this.trackerInstance= {
      stop:function{
        handler.stop();
      }
    }
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
