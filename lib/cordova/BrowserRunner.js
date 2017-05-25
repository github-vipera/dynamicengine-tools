'use babel'
import CommandExecutor from './CommandExecutor'
var spawn = require('child_process').spawn;
var kill = require('tree-kill');
export default class BrowserRunner {
    constructor() {
        this.spawnRef = undefined;
        this.executor=new CommandExecutor();
        this.isWin = /^win/.test(process.platform);
    }

    prepareCommand(cmd){
      if (this.isWin){
        cmd = cmd + ".cmd";
      }
      return cmd;
    }

    requirePatch(data){
      if(!data){
        return false;
      }
      return data.toString().startsWith("Static file server");
    }
    start(path, port) {
        var cmd = "cordova";
        var commandArgs = "--port=" + port;
        if (this.spawnRef) {
            return;
        }
        var options = {
            cwd: path
        };
        this.executor.updatePath();
        cmd = this.prepareCommand(cmd);
        this.spawnRef = spawn(cmd, ["run", "browser","--", commandArgs], options);
        this.spawnRef.stdout.on('data', (data) => {
            if (this.logger) {
                this.logger.debug("[BrowserRunner] " + data.toString())
            }
            if(this.requirePatch(data)){
              console.info("[BrowserRunner apply patch]")
              this.executor.patchExtraBrowserFile();
            }
            console.log(`[BrowserRunner]: ${data}`);
        });

        this.spawnRef.stderr.on('data', (data) => {
            if (this.logger) {
                this.logger.error("[scriptTools] " + data.toString())
            }
            console.error(`[BrowserRunner]: ${data}`);
        });

        this.spawnRef.on('close', (code) => {
            console.log(`[BrowserRunner] child process exited with code ${code}`);
            if (this.logger) {
                this.logger.info(`child process exited with code ${code}`)
            }
            this.spawnRef = undefined;
        });
    }
    stop() {
        console.log("BrowserRunner kill")
        if (!this.spawnRef) {
            return;
        }
        kill(this.spawnRef.pid);
    }

    isRunning(){
      return  this.spawnRef != undefined;
    }

}
