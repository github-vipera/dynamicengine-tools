'use babel'
import PlatformRemoteServer from './PlatformRemoteServer';
import PlatformHelper from './PlatformHelper';
import BrowserRunner from './BrowserRunner'
import DEServerManagerController from '../server/DEServerManagerController'

export default class CompositeRemoteServer {
  constructor(logger) {
    this.logger=logger;
    this.androidServer=undefined;
    this.iosServer=undefined;
    this.browserRunner=undefined;
    this.serverManager=undefined;
    this.defaultInit();
  }
  defaultInit(){
    this.androidServer=new PlatformRemoteServer(PlatformHelper.getAndroidAssetsPath(),3000,this.logger);
    this.iosServer=new PlatformRemoteServer(PlatformHelper.getiOSAssetsPath(),3001,this.logger);
    this.browserRunner = new BrowserRunner();
  }
  startServer(config){
    this.config=config;
    this.androidServer.startServer();
    this.iosServer.startServer();
    this.browserRunner.start(atom.project.getPaths()[0],3002);
    this.serverManager=new DEServerManagerController(this.config,this.logger);
    this.serverManager.setupForDebug(this.config);
    this.setServerManager(this.serverManager);
  }
  setServerManager(serverManager){
    this.androidServer.setServerManager(serverManager);
    this.iosServer.setServerManager(serverManager);
  }

  stopServer(){
    this.androidServer.stopServer();
    this.iosServer.stopServer();
    this.browserRunner.stop();
    this.disposeServerManager();
  }

  disposeServerManager(){
    if(this.serverManager){
      this.serverManager.clean();
    }
    this.serverManager=undefined;
  }

  getConfig(){
    return this.config;
  }

  isRunning(){
    return this.androidServer.isRunning() && this.iosServer.isRunning() &&  this.browserRunner.isRunning()
  }
  executeOperation(operation){
    this.execOnPlatformServer(this.androidServer,operation);
    this.execOnPlatformServer(this.iosServer,operation);
  }
  execOnPlatformServer(platformServer,operation){
    if(platformServer && platformServer.isRunning()){
      platformServer.executeOperation(operation);
    }
  }
}
