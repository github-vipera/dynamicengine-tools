'use babel'
import PlatformRemoteServer from './PlatformRemoteServer';
import PlatformHelper from './PlatformHelper';
import BrowserRunner from './BrowserRunner'
import DEServerManagerController from '../server/DEServerManagerController'
const fs = require("fs");
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
    var androidPort = parseInt(atom.config.get('dynamicengine-tools.androidRunPort'));
    var iosPort = parseInt(atom.config.get('dynamicengine-tools.iOSRunPort'));
    this.androidServer=new PlatformRemoteServer(PlatformHelper.getAndroidAssetsPath(),androidPort,this.logger);
    this.iosServer=new PlatformRemoteServer(PlatformHelper.getiOSAssetsPath(),iosPort,this.logger);
    this.browserRunner = new BrowserRunner();
  }

  completeConfig(){
    console.log("completeConfig");
    var dbDir=this.config.localdatabase;
    if(dbDir){
      if(!fs.existsSync(dbDir)){
        console.log("Directory: ",dbDir," not exists: create this");
        fs.mkdirSync(dbDir);
      }
    }
  }

  startServer(config){
    /*this.config=config;
    this.completeConfig();
    this.androidServer.startServer();
    this.iosServer.startServer();
    var browserPort = parseInt(atom.config.get('dynamicengine-tools.browserRunPort'));
    this.browserRunner.start(atom.project.getPaths()[0],browserPort);
    this.createAndSetupServerManager();*/
    this.startPlatformServer(config,"all");
  }

  startPlatformServer(config,platform){
    this.config=config;
    this.completeConfig();
    switch (platform) {
      case 'android':
        this.androidServer.startServer();
        break;
      case 'ios':
        this.iosServer.startServer();
        break;
      case 'browser':
      case 'all':
        this.androidServer.startServer();
        this.iosServer.startServer();
        var browserPort = parseInt(atom.config.get('dynamicengine-tools.browserRunPort'));
        this.browserRunner.start(atom.project.getPaths()[0],browserPort);
        break;
      default:
    }
    this.createAndSetupServerManager();
  }

  createAndSetupServerManager(){
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
    return this.androidServer.isRunning() || this.iosServer.isRunning() ||  this.browserRunner.isRunning()
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
