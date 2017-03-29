'use babel';
var unirest = require('unirest');
export default class MotifConnector {
  constructor(remoteURL,config,logger){
    this.remoteURL=remoteURL;
    this.config=config;
    this.logger=logger;
  }
  sendRequest(request, callback) {
    this.logger.debug("Sending request to MOTIF: " + JSON.stringify(request));
    unirest.post(this.remoteURL)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(request)
        .end((response) => {
            this.logger.debug("MOTIF Response : " + JSON.stringify(response.body));
            if (callback){
                callback(response.body);
            }
        });

  }
  setupForDebug(params) {
      //NOP
  }

  clean(){
    
  }
}
