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

  createNewProjectWithSpawn(projectInfo){
    console.log("Creating new project with spawn for ",projectInfo);
    var cmd = "";
    var args = [];
    options=this.getCmdOptions();
    var execNpmInstall = false;
    if (projectInfo.type==='ionic1'){
      cmd="ionic"
      args = ["start", "-a", projectInfo.name, "-i", projectInfo.packageId, "-t", projectInfo.template,  projectInfo.path];
    }
    else if (projectInfo.type==='ionic2'){
      cmd="ionic"
      args = ["start", "-a", projectInfo.name, "-i", projectInfo.packageId, "-t", projectInfo.template, "--v2",  projectInfo.path];
      execNpmInstall = true;
    } else {
      //by default is cordova (projectInfo.type==='cordova')
      cmd="cordova"
      args = ["create",projectInfo.path, projectInfo.packageId, projectInfo.name];
    }

    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Creating Project  ${projectInfo.name}]: ${data}`)
          }
          console.log(`[Build  ${projectInfo.name}]: ${data}`);
      });
      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[scriptTools] " + data.toString())
          }
          console.error(`[Creating Project  ${projectInfo.name}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Creating Project  ${projectInfo.name}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Creating Project  ${projectInfo.name}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            this.removeAllPlatforms(projectInfo).then((res) => {
              this.addPlatformsWithSpawn(projectInfo, projectInfo.platforms[0]).then((res) => {
                if(!execNpmInstall){
                  resolve("Creation done");
                }else{
                  this.logger.info("Project require npm install ...");
                  this.execNpmInstall(projectInfo.path).then(resolve,reject);
                }
              },(err) => {
                reject("Creation Fail");
              })
            },(err) => {
              reject("Creation Fail");
            })
          }else{
            reject("Creation Fail");
          }
      });
    });
  }

  execNpmInstall(path){
    var cmd="npm"
    var args = ["install"];
    var options=this.getCmdOptions(path);
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[npm install]: ${data}`)
          }
          console.log(`[npm install]: ${data}`);
      });
      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[npm install] " + data.toString())
          }
          console.error(`[npm install]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[npm install] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[npm install] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("npm install done");
          }else{
            reject("npm install Fail");
          }
      });
    });

    /*return new Promise((resolve,reject) => {
      resolve();
    });*/
  }

  removeAllPlatforms(projectInfo){
    return new Promise((resolve,reject) => {
      this.getPlatforms(projectInfo.path).then((res)=>{
        if(res && res.installed && res.installed.length > 0 && res.installed[0]){
          this.logger.info("Detected installed platform,",JSON.stringify(res.installed));
          this.execRemovePlatformsWithSpawn(res.installed,projectInfo.path).then(resolve,reject);
        }else {
          resolve();
        }
      },(error) => {
        console.error("error:",error);
      });
    });
  }


  addPlatformsWithSpawn(projectInfo){
    console.log("Adding platforms with spawn for ",projectInfo);
    var cmd="cordova"
    var args = ["platform","add","--save"];
    var platformsStr = "";
    _.forEach(projectInfo.platforms,(platform) => {
      args[args.length] = platform;
      platformsStr += " " + platform;
    });
    var options={
        cwd: projectInfo.path,
        detached:false
    };
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Adding platform  [${platformsStr}] to  ${projectInfo.name}]: ${data}`)
          }
          console.log(`[Adding platforms  [${platformsStr}] to  ${projectInfo.name}]: ${data}`);
      });
      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[scriptTools] " + data.toString())
          }
          console.error(`[Adding platform  [${platformsStr}] to  ${projectInfo.name}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Adding Platform [${platformsStr}] to ${projectInfo.name}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Adding Platform [${platformsStr}] to ${projectInfo.name}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("Add Platform done");
          }else{
            reject("Add Platform Fail");
          }
      });
    });
  }

  execRemovePlatformsWithSpawn(platformList,path){
    _.forEach(platformList,(item,index)=>{
      platformList[index]=item.split(" ")[0];
    })
    console.log("Executing remove-platform with spawn for ",platformList);
    var cmd="cordova"
    var args = ["platform","remove","--save"].concat(platformList);
    var options=this.getCmdOptions(path);
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      this.spawnRef.stdout.on('data', (data) => {
          if (this.logger) {
              this.logger.debug(`[Remove-platform  ${platformList}]: ${data}`)
          }
          console.log(`[Remove-platform  ${platformList}]: ${data}`);
      });

      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[Remove-platform] " + data.toString())
          }
          console.error(`[Remove-platform  ${platformList}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[Remove-platform  ${platformList}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[Remove-platform  ${platformList}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve("Remove-platform Done");
          }else{
            reject("Remove-platform Fail");
          }
      });
    });
  }



  execBuildWithSpawn(platform,cliOptions){
    console.log("Executing build with spawn for ",platform,cliOptions);
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
  execRunWithSpawn(platform,target,cliOptions){
    console.log("Execute run with spawn for " + platform,"and cliOptions",cliOptions);
    this.applyGlobalCliOptions(cliOptions);
    var cmd="cordova"
    var args = ["run",platform];
    if(target){
      args[2] = "--target=" + target;
    }
    _.forEach(cliOptions.flags,(single) => {
      args[args.length] = single;
    });
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
  getPlatforms(path){
    var cmd="cordova platform list";
    var options=this.getCmdOptions(path);
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

  getCmdOptions(path){
    return{
        cwd: path || this.basePath,
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
