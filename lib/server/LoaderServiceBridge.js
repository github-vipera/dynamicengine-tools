'use babel'
export default class LoaderServiceBridge {
  constructor() {
    this.serviceMap = new Map();
  }
  getService(name){
    return this.serviceMap.get(name);
  }
  addService(name,service){
    this.serviceMap.set(name,service);
  }
}
