'use babel'
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var fse = require('fs-extra');
import CordovaCommandBuilder from './CordovaCommandBuilder';
import CordovaUtils from './utils/CordovaUtils';
export default class PluginManager {
  constructor(logger,path) {
    this.logger=logger;
    this.basePath = path != undefined ? path : atom.project.getPaths()[0];
  }

  getPluginsList(){
    var args=["plugin","ls"];
    return new Promise((resolve,reject) => {
      this.execOperationWithSpawn(args,"Plugin_list",true).then((res)=>{
        console.log("Plugin_list result:",res);
        var plugins=CordovaUtils.parsePluginList(res.operationResult);
        resolve(plugins);
      },(err) => {
        console.error(err);
        reject(err);
      });
    });
  }

  addPlugin(pluginSpec){
    var args=["plugin","add","--save","--nofetch",pluginSpec];
    var that = this;
    return new Promise((resolve,reject) => {
      this.execOperationWithSpawn(args,"Plugin_Add",false).then((res)=>{
        console.log("Plugin_Add result:",res);
        resolve.bind(that)(res);
      },(err) => {
        console.error(err);
        reject(err);
      });
    });
  }
  removePlugin(pluginId){
    var args=["plugin","remove","--save",pluginId];
    return new Promise((resolve,reject) => {
      this.execOperationWithSpawn(args,"Plugin_Remve",false).then((res)=>{
        console.log("Plugin_Add result:",res);
        resolve(res);
      },(err) => {
        console.error(err);
        reject(err);
      });
    });
  }

  execOperationWithExec(cmd){
    return new Promise((resolve,reject) => {
      var options=this.getCmdOptions();
      exec(cmd,options,(error, stdout, stderr) => {
        if(error){
          console.error(error.toString());
          reject(error);
          return;
        }
        console.log("exec prepare done");
        resolve(stdout);
      });
    });
  }

  execOperationWithSpawn(args,operationLogTag,withResult){
    console.log("execOperationWithSpawn");
    var cmd="cordova";
    var options={
        cwd: this.basePath,
        detached:false
    };
    this.spawnRef = spawn(cmd, args, options);
    return new Promise((resolve,reject) => {
      var operationResult=undefined;
      this.spawnRef.stdout.on('data', (data) => {
          if(withResult && data && data.toString() != "\n"){
            operationResult=data.toString();
          }
          if (this.logger) {
              this.logger.debug(`[${operationLogTag} progress]: ${data}`)
          }
          console.log(`[${operationLogTag} progress]: ${data}`);
      });

      this.spawnRef.stderr.on('data', (data) => {
          if (this.logger) {
              this.logger.error("[Run] " + data.toString())
          }
          console.error(`[${operationLogTag}]: ${data}`);
      });

      this.spawnRef.on('close', (code) => {
          console.log(`[${operationLogTag}] child process exited with code ${code}`);
          if (this.logger) {
              this.logger.info(`[${operationLogTag}] child process exited with code ${code}`)
          }
          this.spawnRef = undefined;
          if(code === 0){
            resolve({
              "msg":`${operationLogTag} DONE`,
              "operationResult": operationResult
            });
          }else{
            reject(`${operationLogTag} FAIL`);
          }
      });
    });
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
