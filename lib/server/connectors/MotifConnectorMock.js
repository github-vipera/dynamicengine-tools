'use babel'
var NativeStorage;
import DEStorage from './../storage/DEStorage'
import MotifConnector from './MotifConnector'
import DEUtilities from './../DEUtilities'
import _ from 'lodash';
var mockImplementation=undefined;
var chokidar = require('chokidar');
var reload = require('require-reload')(require);

export default class MotifConnectorMock extends MotifConnector {
  constructor(remoteURL,config,logger){
    super(remoteURL,config,logger);
    // init NativeStorage
    if(NativeStorage == undefined){
      this.logger.info("NativeStorage reload")
      NativeStorage = reload('./../storage/NativeStorage')(config);
    }
  }
  sendRequest(request, callback){
    try {
          var app = request.req.app;
          var dom = request.req.dom;
          var op = request.req.op;
          var srv = request.req.srv;
          var objectToCall = null;
          var that = this;

          this.logger.debug("Sending request to MOTIF: " + JSON.stringify(request));

          objectToCall = mockImplementation[dom][app][srv];
          this.executeRequest(objectToCall, op, request, callback);

      } catch(ex){
          var errMsg = "MOTIF Mock Connector error: " + ex;
          if (ex.lineNumber){
              errMsg = errMsg + " (line:" + ex.lineNumber +")";
          }
          if (ex.fileName){
              errMsg = errMsg + " (line:" + ex.fileName +")";
          }
          this.logger.error(errMsg);
          //TODO!! reply with error
      }
  }
  executeRequest(objectToCall, operation, request, callback){
    var ret = (objectToCall[operation](request));
    if (callback){
        callback(ret);
    }
  }

  requireMockInformation(path,config){
    var mockImplInfo={
      "implPath":path,
      "libraryLoader":config.libraryLoader
    };
    return mockImplInfo;
  }

  setupForDebug(params) {
      try {
          //mockImplementation = require(params.mockImplementationFilePath);
          if (mockImplementation==null){
              var path=this.config.MockImplementationPath;
              var mockInfo=this.requireMockInformation(path,this.config);
              this.fileWatcher = chokidar.watch(path, 'file', {
                ignored: /[\/\\]\./,
                persistent: true
              });
              this.fileWatcher.on('change', path => this.reloadMockImpl(path,mockInfo));

              //mockImplementation = reload(path)(this.logger,  NativeStorage, DEStorage, DEUtilities, _);
              mockImplementation = reload('./MotifConnectorMockWrapper.js')(this.logger,  NativeStorage, DEStorage, DEUtilities, _, mockInfo);
              if (mockImplementation.appStarted) {
                  mockImplementation.appStarted();
              }
          }

      } catch(exx){
          this.logger.error(exx.toString());
      }
  }
  reloadMockImpl(path,mockInfo){
    console.log("reloadMockImpl")
    this.logger.info('Mock implementation file '+ path + ' has been changed.');
    mockImplementation = reload('./MotifConnectorMockWrapper.js')(this.logger,  NativeStorage, DEStorage, DEUtilities, _, mockInfo);
    this.logger.info('Mock implementation file '+ path + ' has been reloaded!');
  }

  clean(){
    this.logger.debug("Clean motif connector mock");
    if(this.fileWatcher){
      this.fileWatcher.close();
    }
    NativeStorage=undefined
    DEStorage.clear();
    mockImplementation=undefined;
  }
}
