'use babel'
var {
    allowUnsafeEval,
    allowUnsafeNewFunction
} = require('loophole');
var express = allowUnsafeEval(() => require('express'));
//var ProtocolHandler = require('./ProtocolHandler');
//var logger = require('./loggers/logger');
var fs = require('fs');
//var logger = require('./loggers/logger');

export default class PlatformRemoteServer {

    constructor(platformPath, port,logger) {
        this.platformPath = platformPath;
        this.port = port;
        this.initExpressAndHttp();
        this.io = undefined;
        this.httpSockets = [];
        this.socketList = [];
        this.logger=logger;
    }
    setEventBus(eventBus){
      this.eventBus=eventBus;
    }

    initExpressAndHttp() {
        this.expressApp = express();
        this.http = require('http').Server(this.expressApp);
    }

    startServer() {
        if(!this.expressApp){
          this.initExpressAndHttp();
        }
        this.io = require('socket.io')(this.http);
        this.configIO();
        this.configExpressApp();
        this.configHttp();
    }

    configIO() {
        this.io.on('connection', (socket) => {
            var address = socket.handshake.address;
            this.logInfo("on debugger session connection for " + address);

            //that.eventBus.publish("LOG", { 'message' : 'on debugger session connection'});
            this.socketList.push(socket);
            socket.on('disconnect', () => {
                this.logDebug("Device disconnected: from " + address);
                //this.socketList.splice(this.socketList.indexOf(socket), 1);
            });
            socket.on('deviceReady', (msg) => {
                this.logDebug("onDevice Ready: " + JSON.stringify(msg));
                socket.deviceInfo = msg;
                lastDeviceInfo = msg.deviceInfo;
                lastModelString = msg.modelString;
            });

            socket.on('serverRequest',(request) => {
              this.logDebug("receive serverRequest: " + JSON.stringify(request));
              if(this.serverManager){
                this.logDebug("Server Manager available");
                this.serverManager.sendData(request,(resp,req) => {
                  var respWrapper={
                    uid:request.uid,
                    data: resp
                  };
                  socket.emit("serverResponse",respWrapper);
                });
              }
            });

            socket.on('close', (socket) => {
                //socket.destroy();
                this.socketList.splice(this.socketList.indexOf(socket), 1);
            });
        });
    }

    configExpressApp() {
        this.expressApp.use(express.static(this.platformPath, null));
        this.expressApp.get('/__dedebugger/**', (req, res) => {
            //req.header["user-agent"]
            //var deInfoHeader = req.headers["x-requested-with"];
            //var deDebugHeader = req.headers["dedebug-device-type"];
            var urlRelative = req.url;
            urlRelative = urlRelative.replace('/__dedebugger/', '/injectedfiles/');
            res.sendFile(__dirname + urlRelative);
        });
    }

    configHttp() {
        this.http.on('connection', (socket) => {
            this.logInfo('HTTP socket opened ' + socket);
            this.httpSockets.push(socket);

            // Remove the socket when it closes
            socket.on('close', () => {
                console.log('HTTP socket closed ' + socket);
                this.httpSockets.splice(this.httpSockets.indexOf(socket), 1);
            });

        });

        this.http.listen(this.port, () => {
            this.logInfo('Dynamic Engine Debugger listening on port ' + this.http.address().port);
            this.logInfo('Type "http://localhost:' + this.http.address().port + '" to start the app debugging.');
            //openChromeWindow();
            /*that.eventBus.publish("DEBUGGER_STARTED", {
                'status': 'started'
            });*/
        });
    }

    stopServer() {
        console.log("stopServer")
        this.httpSockets.forEach(function(socket) {
                socket.destroy();
            })
            //expressApp.close();
        if(!this.io){
          //this.logDebug("Debugger already stopped");
          return;
        }
        this.io.httpServer.close();
        this.http.close();
        this.serverManager=undefined;
        // ADD EXTRA CLEAN
        this.cleanServerState();
    }

    cleanServerState(){
      this.expressApp=undefined;
      this.httpServer=undefined;
      this.io=undefined;
    }

    isRunning(){
      return this.http.listening;
    }


    logInfo(msg) {
        this.logger.info(msg);
        console.info(msg);
    }

    logDebug(msg) {
        this.logger.debug(msg);
        console.debug(msg);
    }

    logError(msg){
        this.logger.error(msg);
        console.error(msg);
    }

    executeOperation(operation){
      switch (operation.type) {
        case "doLiveReload":
          this.io.emit("doLiveReload");
          break;
        case "doEval":
          this.io.emit("doEval",operation.cmd);
          break;
        default:
          this.logError("unknown operation: " +operation );
      }
    }

    setServerManager(serverManager){
      this.serverManager=serverManager;
    }

}
