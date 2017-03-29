'use babel'
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var fse = require('fs-extra');
import CordovaCommandBuilder from './CordovaCommandBuilder';
import CordovaUtils from './utils/CordovaUtils';
import _ from 'lodash';
export default class CommandExecutor {
  constructor(logger,path) {
    this.logger=logger;
    this.basePath = path != undefined ? path : atom.project.getPaths()[0];
  }

  updatePath(path){
    this.basePath = path != undefined ? path : atom.project.getPaths()[0];
  }

  execPrepare(platform){
    return new Promise((resolve,reject) => {
      var cmd=CordovaCommandBuilder.createPrepare(platform);
      var options=this.getCmdOptions();
      exec(cmd,options,(error, stdout, stderr) => {
        if(error){
          console.error(error.toString());
          reject(error);
          return;
        }
        console.log("exec prepare done");
        resolve();
      });
    });
  }
  execPrepareWithBrowserPatch(){
    return new Promise((resolve,reject) => {
      this.execPrepare().then(() => {
        this.patchExtraBrowserFile();
        resolve();
      },(err) => {
        reject(err);
      });
    });
  }

  applyGlobalCliOptions(cliOptions){
    if(cliOptions.envVars){
      _.forEach(cliOptions.envVars,(single) => {
        this.logger.info("Set Env variable:",single);
        process.env[single.name] = single.value;
      });
    }
  }

  execBuildWithSpawn(platform,cliOptions){
    console.log("Executre build with spawn for ",platform,cliOptions);
    this.applyGlobalCliOptions(cliOptions);
    var cmd="cordova"
    var args = ["build",platform];
    _.forEach(cliOptions.flags,(single) => {
      args[args.length] = single;
    });
    var options=this.getCmdOptions();
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Build  ${platform}]: ${data}`)
          }
          console.log(`[Build  ${platform}]: ${data}`);
      });

      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[scriptTools] " + data.toString())
          }
          console.error(`[Build  ${platform}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Build  ${platform}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Build  ${platform}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("Build done Done");
          }else{
            reject("Build Fail");
          }
      });
    });
  }
  execRunWithSpawn(platform,target){
    console.log("Execute run with spawn for " + platform);
    var cmd="cordova"
    var args = ["run",platform];
    if(target){
      args[2] = "--target=" + target;
    }
    var options={
        cwd: this.basePath,
        detached:false
    };
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Run  ${platform}]: ${data}`)
          }
          console.log(`[Run  ${platform}]: ${data}`);
      });

      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[Run] " + data.toString())
          }
          console.error(`[Run  ${platform}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Run  ${platform}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Run  ${platform}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("Run done Done");
          }else{
            reject("Run Fail");
          }
      });
    });
  }
  execCleanWithSpawn(platform){
    console.log("Execute cleans with spawn");
    var cmd="cordova"
    var args = ["clean"];
    if(platform){
      args[1]=platform;
    }else{
      platform="all";
    }
    var options={
        cwd: this.basePath,
        detached:false
    };
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Clean  ${platform}]: ${data}`)
          }
          console.log(`[Clean  ${platform}]: ${data}`);
      });

      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[Clean] " + data.toString())
          }
          console.error(`[Clean  ${platform}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Clean  ${platform}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Clean  ${platform}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("Clean Done");
          }else{
            reject("Clean Fail");
          }
      });
    });
  }
  getAllDeviceByPlatform(platform){
    var cmd="cordova run " + platform + " --list";
    var options=this.getCmdOptions();
    return new Promise((resolve,reject) => {
      exec(cmd,options,(error, stdout, stderr) => {
        if(error){
          console.error(error.toString());
          reject(error);
          return;
        }
        console.log("exec getAllDeviceByPlatform done " + stdout);
        var detectedDevice= CordovaUtils.parseDeviceList(stdout);
        resolve(detectedDevice);
      });
    });
  }
  getPlatforms(){
    var cmd="cordova platform list";
    var options=this.getCmdOptions();
    return new Promise((resolve,reject) => {
      exec(cmd,options,(error, stdout, stderr) => {
        if(error){
          console.error(error.toString());
          reject(error);
          return;
        }
        console.log("exec getPlatforms done " + stdout);
        var platforms= CordovaUtils.parsePlatformList(stdout);
        resolve(platforms);
      });
    });
  }
  copyFile(src,dest){
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  }
  patchExtraBrowserFile(){
    fse.emptyDirSync(this.basePath + "/platforms/browser/www/__dedebugger");
    fse.emptyDirSync(this.basePath + "/platforms/browser/www/socket.io");
    fse.copySync(__dirname + "/injectedfiles/DEDebuggerClient.js",this.basePath + "/platforms/browser/www/__dedebugger/DEDebuggerClient.js");
    fse.copySync(__dirname + "/injectedfiles/socket.io.js",this.basePath + "/platforms/browser/www/socket.io/socket.io.js");
    //var path=__dirname;
  }

  getCmdOptions(){
    return{
        cwd: this.basePath,
        detached:false
    };
  }

  isBusy(){
    return this.spawnRef != undefined;
  }

  stopSpawn(){
    console.log("stop run Spawn")
    if (!this.spawnRef) {
        return;
    }
    kill(this.spawnRef.pid);
  }


}
