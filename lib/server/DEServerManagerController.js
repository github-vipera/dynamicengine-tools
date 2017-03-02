'use babel'
export default class DEServerManagerController {
  constructor(settings,logger){
    this.config=settings;
    this.logger=logger;
    this.createMotifConnector();
  }
  createMotifConnector(){
    var serverURL=this.config.RemoteServerUrl;
    var useMock=this.config.MockImplementationPath || false;
    this.logger.info("DEServerManagerController MOTIF URL: " + serverURL);
    var Clazz=undefined
    if(!useMock){
      Clazz = require('./connectors/MotifConnector');
      this.motifConnection=new Clazz(serverURL,this.config,this.logger);
    }else{
      this.logger.warn("Found MotifConnectorMock: loading...");
      Clazz = require('./connectors/MotifConnectorMock');
      this.logger.warn("Found MotifConnectorMock: Mock loaded");
      this.motifConnection=new Clazz(serverURL,this.config,this.logger);
    }
  }

  // class methods
  sendData = function(request, callback) {
    this.motifConnection.sendRequest(request.requestData, function(resp){
        callback(resp, request);
    });
  }

  setupForDebug = function(params) {
    this.motifConnection.setupForDebug(params);
  }

  clean(){
    this.logger.info("DEServerManagerController clean");
    if(this.motifConnection){
      this.motifConnection.clean();
    }
  }

}
