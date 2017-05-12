'use babel'
import $ from 'JQuery'
import CordovaUtils from '../cordova/utils/CordovaUtils'
import VariantsHandler from '../variants/VariantsHandler'
import CollapsablePanelHandler from '../uiCommon/CollapsablePanelHandler'
import DEToolsProject from '../project/DEToolsProject'
import _ from 'lodash'
export default class RunSettingsUIHandler {
  constructor(div,cmdExecutor,platformServer) {
    console.log("create RunSettingsUIHandler");
    this.div;
    this.cmdExecutor=cmdExecutor;
    this.platformServer=platformServer;
    this.variantsHandler=new VariantsHandler();
    this.currentSelection={
      platform:null
    };
  }

  initCollapsables(){
    this.platformCollapsable= new CollapsablePanelHandler("platform");
    this.platformCollapsable.bindJS();

    this.remoteCollapsable= new CollapsablePanelHandler("remote");
    this.remoteCollapsable.bindJS();

    this.scriptCollapsable= new CollapsablePanelHandler("scriptTools");
    this.scriptCollapsable.bindJS();
  }

  init(){
    this.initPlatformList();
    this.updateUIState();
    this.project = new DEToolsProject();
    this.loadSettings();
  }
  initPlatformList(){
    this.cmdExecutor.getPlatforms().then((res) => {
      if(res && res.installed){
        this.addPlatformsToSelect(res.installed);
      }
      this.initCollapsables();
      this.initVariantSelect();
      this.bindJS();
    },(err) => {
      console.error(err);
      this.handleNoCordovaBaseProject();
    });
  }

  appendNoVariantItem(){
    if(!this.selectRef){
      this.selectRef=$("#derunsettings-variant-select");
    }
    this.selectRef.empty();
    var noVariantEl="<option value=''>No variant</option>";
    this.selectRef.append(noVariantEl);
  }

  initVariantSelect(){
    this.variantsHandler.initEmptyObject();
    this.variantsHandler.load().then(() => {
      var variants=this.variantsHandler.getVariants();
      this.appendNoVariantItem();
      _.forEach(variants,(single) => {
        var el="<option value=" + single.name+ ">" + single.name + "</option>";
        this.selectRef.append(el);
      });
    },(err) => {
      console.log("Error: ",err);
      this.appendNoVariantItem();
    });
  }

  handleNoCordovaBaseProject(){
    console.log("handleNoCordovaBaseProject");
    atom.notifications.addError("Main project is not cordova based project");
  }


  addPlatformsToSelect(items){
    $('#derunsettings-platform-select').empty();
    $.each(items, function (i, item) {
      var value=item.name
      $('#derunsettings-platform-select').append($('<option>', {
          value: value,
          text : value
      }));
    });
  }
  addDevicesToSelect(items){
    $('#derunsettings-device-select').empty();
    $.each(items, function (i, item) {
      var value=item;
      $('#derunsettings-device-select').append($('<option>', {
          value: value,
          text : value
      }));
    });
  }

  reloadDeviceByPlatform(platform){
    $('#derunsettings-device-select').empty();
    $('#derunsettings-device-select').hide();
    $('#derunsettings-devices-block').show();
    this.loadDeviceByPlatform(platform);
  }

  loadDeviceByPlatform(platform){
    $("#derunsettings-loader-devices").show();
    this.cmdExecutor.getAllDeviceByPlatform(platform).then((res) => {
      this.addDevicesToSelect(res);
      $('#derunsettings-device-select').show();
      $("#derunsettings-loader-devices").hide();
      $('#derunsettings-device-select').val("[AUTO]");
    },(err) => {
      console.error(err);
      $('#derunsettings-device-select').show();
      $("#derunsettings-loader-devices").hide();
    });
  }

  bindJS(){
    /**
    * button build
    */
    $("#derunsettings-btn-build").off('click').on('click',() => {
      console.log("Build click");
      var platform = $('#derunsettings-platform-select').val();
      if(platform){
        console.log("Platform:" + platform);
        this.launchBuildOnPlatform(platform);
      }
    });
    /**
    * button run
    */
    $("#derunsettings-btn-run").off('click').on('click',() => {
      console.log("run click");
      var platform = $('#derunsettings-platform-select').val();
      var target = $('#derunsettings-device-select').val();
      if(platform && target){
        console.log("Platform: " + platform + " target: " + target);
        this.launchRunOnPlatform(platform,target);
      }
    });
    /**
    * button stop
    */
    $("#derunsettings-btn-stop").off('click').on('click',() => {
      console.log("stop click");
      this.cmdExecutor.stopSpawn();
      this.setStatusIndicator(false);
      this.platformServer.stopServer();
    });

    /**
    * button clear
    */
    $("#derunsettings-btn-clear").off('click').on('click',() => {
      console.log("clear click");
      this.launchClean();
    });

    /**
    * Setup platform select
    */
    $('#derunsettings-platform-select').val(this.currentSelection.platform ? this.currentSelection.platform : null);
    $('#derunsettings-platform-select').off('change').on('change',() => {
      var platform = $('#derunsettings-platform-select').val();
      if(platform){
        console.log("change Platform to: " + platform);
        this.currentSelection.platform = platform;
        this.reloadDeviceByPlatform(platform);
      }
      this.updateButtons();
    });

    /**
    * Setup device/emulator select
    */
    $('#derunsettings-device-select').val(null);
    $('#derunsettings-device-select').off('change').on('change',() => {
      var target = $('#derunsettings-device-select').val();
      if(target){
        console.log("change target to: " + target);
      }
      this.updateButtons();
    });
    /**
     * livereload
    */
    $('#derunsettings-server-btn-liveReload').off('click').on('click',() =>{
      this.doLiveReload();
    });


    $('#derunsettings-refreshUI').off('click').on('click',(evt) =>{
      evt.preventDefault();
      evt.stopPropagation();
      if(this.platformServer && this.platformServer.isRunning()){
        atom.notifications.addWarning("Not available during Run phase",{"detail":"skyp refresh","dismissable":true});
        return;
      }
      this.reloadAllViewInfo();
    });

    /**+++++++++++++++++++++++
    * MANAGE REMOTE SERVER bindjs
    */
    this.bindJSRemoteServerSection();
    this.updateButtons();
  }


  bindJSRemoteServerSection(){
    $('#derunsettings-txt-serverMockImpl').off("drop").on("drop", function(event){
       event.preventDefault();
       var filePath = event.originalEvent.dataTransfer.getData("initialpath");
       if (filePath){
         $('#derunsettings-txt-serverMockImpl').val(filePath);
       }
    });

    $('#derunsettings-txt-localdatabase').off("drop").on("drop", function(event){
       event.preventDefault();
       var filePath = event.originalEvent.dataTransfer.getData("initialpath");
       if (filePath){
         $('#derunsettings-txt-localdatabase').val(filePath);
       }
    });

    $('#derunsettings-txt-libraryLoader').off("drop").on("drop", function(event){
       event.preventDefault();
       var filePath = event.originalEvent.dataTransfer.getData("initialpath");
       if (filePath){
         $('#derunsettings-txt-libraryLoader').val(filePath);
       }
    });
  }




  unbindJS(){
    console.info("unbindJS called");

    $("#derunsettings-btn-build").off('click');
    $("#derunsettings-btn-run").off('click');
    $("#derunsettings-btn-stop").off('click');
    $("#derunsettings-btn-clear").off('click');
    $('#derunsettings-platform-select').off('change');
    $('#derunsettings-device-select').off('change');

    $('#derunsettings-txt-serverMockImpl').off("drop");
    $('#derunsettings-txt-localdatabase').off("drop");
    $('#derunsettings-txt-libraryLoader').off("drop");

    $('#derunsettings-server-btn-run').off('click');
    $('#derunsettings-server-btn-stop').off('click');
    $('#derunsettings-server-btn-build').off('click');
    $('#derunsettings-server-btn-liveReload').off('click');
  }


  updateUIState(){
    console.log("Update state");
    this.updateServerStatusIndicator();
    this.setWaitTo(this.cmdExecutor.isBusy());
    this.updateUIWithSettings(this.platformServer.getConfig());
  }

  updateUIWithSettings(config){
    console.warn("updateUIWithSettings: ",config);
    if(config){
      this.restoreConfig(config);
    }
  }

  updateButtons(){
    var platform=$('#derunsettings-platform-select').val();
    var target=$('#derunsettings-device-select').val();
    console.info("UpdateButton Platform: " + platform + " target: " + target);
    if(platform){
      $("#derunsettings-btn-build").prop("disabled",false);
      if(target){
        $("#derunsettings-btn-run").prop("disabled",false);
      }else{
        $("#derunsettings-btn-run").prop("disabled",true);
      }
    }else{
      $("#derunsettings-btn-build").prop("disabled",true);
      $("#derunsettings-btn-run").prop("disabled",true);
    }
  }



  setDisableAllInput(value){
    $("#derunsettings-btn-build").prop("disabled",value);
    $("#derunsettings-btn-run").prop("disabled",value);
    $("#derunsettings-btn-clear").prop("disabled",value);
    //$("#derunsettings-btn-stop").prop("disabled",value);
    $('#derunsettings-platform-select').prop("disabled",value);
    $('#derunsettings-device-select').prop("disabled",value);
  }

  setWaitTo(value){
    this.waitForOperation=value;
    this.setDisableAllInput(value);
    if(value) {
      $('#derunsettings-progress').show();
    }else{
      $('#derunsettings-progress').hide();
    }
  }

  createCliOptionsForBuild(){
    console.log("Create cli options");
    var variant=this.selectRef.val();
    var envVars=new Array();
    if(variant){
      console.info("VARIANT: " ,variant);
      envVars.push({
        name:"CORDOVA_BUILD_VARIANT",
        value:variant
      })
    }
    else{
      envVars.push({
        name:"CORDOVA_BUILD_VARIANT",
        value:undefined
      })
    }
    var flags=new Array();
    if($('#cbx-release').is(':checked')){
      flags.push("--release");
    }
    if($('#cbx-buildConfig').is(':checked')){
      flags.push("--buildConfig");
    }
    return {
      envVars: envVars,
      flags:flags
    }
  }


  launchBuildOnPlatform(platform){
    this.setWaitTo(true);
    var cliOptions=this.createCliOptionsForBuild();
    this.cmdExecutor.execBuildWithSpawn(platform,cliOptions).then((res) => {
      console.log("build completed");
      this.setWaitTo(false);
      atom.notifications.addSuccess("Build done");
    },(err) => {
      console.error("build failed");
      this.setWaitTo(false);
      atom.notifications.addError("Build failed");
    })
  }
  launchRunOnPlatform(platform,target){
    this.saveServerSettings();
    this.startPlatformServer(platform);
    if(platform === "browser"){
      return;
    }
    this.setWaitTo(true);
    var cliOptions=this.createCliOptionsForBuild();
    this.cmdExecutor.execRunWithSpawn(platform,target,cliOptions).then((res) => {
      console.log("run completed");
      this.setWaitTo(false);
      atom.notifications.addSuccess("Run done");
    },(err) => {
      console.error("run failed: " + err);
      this.setWaitTo(false);
      atom.notifications.addError("Run failed");
    })
  }
  launchClean(){
    this.setWaitTo(true);
    this.cmdExecutor.execCleanWithSpawn().then((res) => {
      this.setWaitTo(false);
      atom.notifications.addSuccess("Clean success");
    },() => {
      this.setWaitTo(false);
      atom.notifications.addError("Clean fail");
    });
  }

  getDefaultLocalDatabasePath(){
    return atom.project.getPaths()[0] + "/dbFolder";
  }

  createConfig(){
    var localdatabase=$('#derunsettings-txt-localdatabase').val();
    if(!localdatabase){
      localdatabase=this.getDefaultLocalDatabasePath();
    }
    return {
      RemoteServerUrl: atom.config.get('dynamicengine-tools.RemoteServerUrl'),
      MockImplementationPath : $('#derunsettings-txt-serverMockImpl').val(),
      localdatabase : localdatabase,
      libraryLoader: $('#derunsettings-txt-libraryLoader').val()
    };
  }

  restoreConfig(config){
    $('#derunsettings-txt-serverMockImpl').val(config.MockImplementationPath);
    $('#derunsettings-txt-localdatabase').val(config.localdatabase);
    $('#derunsettings-txt-libraryLoader').val(config.libraryLoader);
  }


  startPlatformServer(platform){
    if(!this.platformServer.isRunning()){
      var config=this.createConfig();
      this.platformServer.startPlatformServer(config,platform);
    }
    this.setStatusIndicator(true);
  }
  setStatusIndicator(value){
    var ref=document.getElementById('derunsettings-status-indicator');
    if(ref == undefined){
      console.error("derunsettings-status-indicator is undefined")
      return;
    }
    if(value){
      document.getElementById('derunsettings-status-indicator').style.background = 'green';
    }else{
      document.getElementById('derunsettings-status-indicator').style.background = '#565656';
    }
  }
  updateServerStatusIndicator(){
    this.setStatusIndicator(this.platformServer.isRunning());
  }

  doLiveReload(){
    if(this.platformServer){
      var op={
        type:"doLiveReload"
      }
      this.cmdExecutor.execPrepareWithBrowserPatch().then(() => {
        console.log("Complete prepare with patch done");
        this.platformServer.executeOperation(op);
      },(err) => {
        console.error(err);
      });
    }else{
      console.error("compositeServer is undefined");
    }
  }

  updateCmdExecutor(){
    this.cmdExecutor.updatePath();
  }

  saveServerSettings(){
    console.log("saveServerSettings");
    var cfg=this.createConfig();
    this.project.save('remote-server-config', cfg);
  }
  loadSettings(){
    this.project.load().then(()=>{
      var cfg = this.project.get('remote-server-config');
      if (cfg){
        this.restoreConfig(cfg);
      }
    },(err) => {
      console.error(err);
    });
  }

  reloadAllViewInfo(){
    //this.platformCollapsable.unbindJS();
    //this.remoteCollapsable.unbindJS();
    //this.scriptCollapsable.unbindJS();
    //this.unbindJS();
    //this.init(this.currentSelection);
    $('#derunsettings-device-select').empty();
    this.initCollapsables();
    this.initVariantSelect();
    this.bindJS();
    if(this.currentSelection.platform){
      this.reloadDeviceByPlatform(this.currentSelection.platform);
    }

  }

  destroyDiv(){
    this.selectRef=undefined;
    this.unbindJS();
    this.div=undefined;
  }

}
