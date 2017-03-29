'use babel'
export default class CordovaCommandBuilder {
    constructor() {

    }
    createPrepare(platform){
      let cmd="cordova prepare"
      if(platform){
        cmd += " " + platform;
      }
      return cmd;
    }
    createBuild(platform){
      let cmd="cordova build";
      if(platform){
        cmd += " " + platform;
      }
      return cmd;
    }
}
let cordovaCommandBuilderRef=new CordovaCommandBuilder()
export default cordovaCommandBuilderRef;
