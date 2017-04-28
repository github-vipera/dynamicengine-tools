'use babel'
import DeviceTracker from './DeviceTracker'
class DeviceManager {
  constructor() {
    console.log("Create device manager");
    this.deviceTracker=new DeviceTracker();
  }
  getTracker(){
    return this.deviceTracker;
  }
  getList(){

  }
}

module.exports = new DeviceManager();
