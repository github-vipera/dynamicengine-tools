'use babel';
import { CompositeDisposable } from 'atom';
import CommandExecutor from './cordova/CommandExecutor';
import CompositeRemoteServer from './cordova/CompositeRemoteServer';
import Pane from 'atom-quick-pane';
import RunSettingsUIHandler from './runconfig/RunSettingsUIHandler';
import ProjectManagementUiHandler from './plugins/ProjectManagementUiHandler.js';
import CreateProjectUIHandler from './project/CreateProjectUIHandler';
import PushToolUIHandler from './pushtool/PushToolUIHandler.js';
import Logger from './logger/Logger';
import EventBus from './events/DebuggerEventBus';
import ConsoleHandler from './logger/ConsoleHandler'
import ScriptTools from './scriptTools/ScriptTools'
import $ from 'JQuery'
export default {

  /**
  * DEFINE TOOLS PREFERENCES
  */
  config:{
    RemoteServerUrl: {
      title: 'MOTIF Server Url',
      description: 'Set the url of your MOTIF server',
      type: 'string',
      default: "http://localhost:8080/json"
    },
    iOSRunPort: {
      title: 'iOS run port',
      description: 'Set the iOS platform run port',
      type: 'integer',
      default: 3001,
      minimum: 1024
    },
    androidRunPort: {
      title: 'Android run port',
      description: 'Set the Android platform run port',
      type: 'integer',
      default: 3000,
      minimum: 1024
    },
    browserRunPort: {
      title: 'Browser run port',
      description: 'Set the Browser platform run port',
      type: 'integer',
      default: 3002,
      minimum: 1024
    }
  },

  subscriptions: null,
  compositeServer: undefined,
  activate(state) {
    console.log("cordova-de-debugger activate");
    //Logger.info("de-cordova activate");
    this.compositeServer=new CompositeRemoteServer(Logger);
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cordova-de-debugger:test': () => this.test(),
      'cordova-de-debugger:project-management' : () => this.openProjectManagement(),
      'cordova-de-debugger:run-configuration': () => this.openRunConfiguration(),
      'cordova-de-debugger:create-project': () => this.createProject(),
      'cordova-de-debugger:reload': () => this.doLiveReload(),
      'cordova-de-debugger:push-tool': () => this.openPushTool(),
      'cordova-de-debugger:show-console': () => this.showConsole(),

    }));

    this.setUpEventBus();
    this.createAndSetupConsoleHandler();
  },

  setUpEventBus(){
    console.log("Setup event bus");
    Logger.on('logging', function (transport, level, msg, meta) {
        // [msg] and [meta] have now been logged at [level] to [transport]
        console.log(`[Logger1 - ${level}]: ${msg}`);
    });
  },

  createAndSetupConsoleHandler(){
    console.log("createAndSetupConsoleHandler");
    this.consoleHandler=new ConsoleHandler(EventBus);
    this.consoleHandler.setLogger(Logger);
  },

  deactivate() {
  },

  serialize() {
    return {

    };
  },

  testComposite(){
    if(!this.compositeServer){
      this.compositeServer=new CompositeRemoteServer();
      this.compositeServer.startServer();
    }else{
      this.compositeServer.stopServer();
      this.compositeServer=undefined;
    }
  },

  test() {
    console.log('CordovaDeDebugger test!');
    /*var PluginManager = require('./cordova/PluginManager');
    var pluginManagerInst = new PluginManager(Logger);
    pluginManagerInst.addPlugin("cordova-plugin-device").then((res) => {
      console.log(res);
      pluginManagerInst.removePlugin("cordova-plugin-device").then((res) => {
        console.log(res);
      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });*/
    this.openProjectManagement();
  },
  openRunConfiguration() {
    console.log('CordovaDeDebugger runConfiguration!');
    this.openRunConfigurationPanel();
  },
  createProject(){
    console.log('CordovaDeDebugger createProject!');
    var createProjectView = require("./project/create-project-view");
    var createProjectViewProm = Pane({
        element: 'div',
        title: 'Project setup',
        split: 'center',
        activatePane: true
      },  (err, div) => {
        if (err) throw err
        this.createProjectDiv=div;
        div.innerHTML = createProjectView.render();
        this.createProjectUIHandler=new CreateProjectUIHandler(div);
      },  () => {
          console.info("runSettingsView closed");
          this.createProjectDiv=undefined;
      });
      createProjectViewProm.then(()=>{
        console.log("createProject panel opened")
      });
  },
  doLiveReload(){
    if(this.compositeServer){
      var op={
        type:"doLiveReload"
      }
      var executor=new CommandExecutor();
      executor.execPrepareWithBrowserPatch().then(() => {
        console.log("Complete prepare with patch done");
        this.compositeServer.executeOperation(op);
      },(err) => {
        console.error(err);
      });
    }
  },
  openRunConfigurationPanel(){
    Logger.debug("openRunConfigurationPanel");
    var runSettingsView = require("./runconfig/run-settings-view");
    var runSettingsViewProm = Pane({
        element: 'div',
        title: 'Run Configuration',
        split: 'right',
        activatePane: true
      },  (err, div) => {
        if (err) throw err
        this.runSettingsDiv=div;
        div.innerHTML = runSettingsView.render();
        if(!this.runSettingsUIHandler){
          var executor=new CommandExecutor(Logger);
          this.runSettingsUIHandler=new RunSettingsUIHandler(div,executor,this.compositeServer);
        }
        this.runSettingsUIHandler.updateCmdExecutor();
        $(div).css("height","100%");
        $(div).css("overflow-y","scroll");
        this.runSettingsUIHandler.init();
        if(this.scriptTools){
          this.scriptTools.appendOn(div);
        }else{
          this.scriptTools=new ScriptTools(Logger,div);
        }

      },  () => {
          console.info("runSettingsView closed");
          this.runSettingsDiv=undefined;
          this.runSettingsUIHandler.destroyDiv();
      });
      runSettingsViewProm.then((value) => {

      });
  },

  openProjectManagement(){
    Logger.debug("openProjectManagement");
    var projectManagementView = require("./plugins/project-management-view");
    var runSettingsViewProm = Pane({
        element: 'div',
        title: 'Project Management',
        split: 'center',
        activatePane: true
      },  (err, div) => {
        if (err) throw err
        this.projectManagementViewDiv = div;
        div.innerHTML = projectManagementView.render();
        if(!this.pluginManagerUIHandler){
          var executor = new CommandExecutor(Logger);
          this.pluginManagerUIHandler = new ProjectManagementUiHandler(div, executor, this.compositeServer);
          this.pluginManagerUIHandler.setRouteConfig(this.getProjectManagementRouteConfig());
        }
        this.pluginManagerUIHandler.init();
      },  () => {
          console.info("openProjectManagement closed");
          //this.runSettingsDiv=undefined;
          //this.runSettingsUIHandler.destroyDiv();
      });
      runSettingsViewProm.then((value) => {

      });
  },

  getProjectManagementRouteConfig(){
    var config ={};
    var pluginView=require("./plugins/plugins-view");
    var pluginInstallView=require("./plugins/plugin-install-view");
    var variantsView=require("./variants/variants-view");
    var dePluginsView=require("./plugins/deplugins-view");
    // add import and new of your controller here
    var VariantsViewUIHandler =require("./variants/VariantsViewUIHandler");
    var PluginInstallViewUIHandler = require("./plugins/PluginInstallViewUIHandler");
    var PluginsViewUIHandler = require("./plugins/PluginsViewUIHandler");
    var DEPluginsViewUIHandler = require("./plugins/DEPluginsViewUIHandler");

    config["InstalledPluginsPanel"] = {
      menuId:"InstalledPluginsMenuItem",
      view: pluginView,
      controller: new PluginsViewUIHandler() // TODO: add controller
    }
    config["InstallPanel"] = {
      menuId: "InstallMenuItem",
      view: pluginInstallView,
      controller: new PluginInstallViewUIHandler()
    }
    config["VariantsPanel"] = {
      menuId: "VariantsMenuItem",
      view: variantsView,
      controller: new VariantsViewUIHandler()
    }
    config["DEPluginsPanel"] = {
      menuId: "DEPluginsMenuItem",
      view: dePluginsView,
      controller: new DEPluginsViewUIHandler()
    }
    return config;
  },

  openPushTool(){
    Logger.debug("openPushTool");
    var pushToolView = require("./pushtool/pushtool-view");
    var pushToolViewProm = Pane({
        element: 'div',
        title: 'Push Tool',
        split: 'center',
        activatePane: true
      },  (err, div) => {
        if (err) throw err
        this.pushToolViewDiv = div;
        div.innerHTML = pushToolView.render();
        if(!this.pushToolUIHandler){
          this.pushToolUIHandler = new PushToolUIHandler(div);
          this.pushToolUIHandler.setRouteConfig(this.getPushToolRouteConfig());
        }
        this.pushToolUIHandler.init();
      },  () => {
          console.debug("openPushTool closed");
      });
      pushToolViewProm.then((value) => {

      });
  },

  getPushToolRouteConfig(){
    var config ={};
    var sendPushView=require("./pushtool/send-push-view");
    var pushSettingsView=require("./pushtool/push-settings-view");
    // add import and new of your controller here
    var SendPushViewUIHandler =require("./pushtool/SendPushViewUIHandler");
    var PushSettingsViewUIHandler = require("./pushtool/PushSettingsViewUIHandler");

    config["PushSettingsPanel"] = {
      menuId:"PushSettingsMenuItem",
      view: pushSettingsView,
      controller: new PushSettingsViewUIHandler()
    }
    config["SendPushPanel"] = {
      menuId: "SendPushMenuItem",
      view: sendPushView,
      controller: new SendPushViewUIHandler()
    }
    return config;
  },

  showConsole(){
    this.consoleHandler.show();
  }

};
