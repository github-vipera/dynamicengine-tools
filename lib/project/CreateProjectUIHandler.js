'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var remote = require('remote');
var dialog = remote.require('electron').dialog;

export default class CreateProjectUIHandler{

  constructor(logger, cmdExecutor){
    this.cmdExecutor = cmdExecutor;
    this.logger = logger;
    this.init();
  }

  init(onCancelCallback, onProgressCallback, onCreateCallback){
    var that = this;

    this.onCancelCallback = onCancelCallback;
    this.onCreateCallback = onCreateCallback;
    this.onProgressCallback = onProgressCallback;

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('de-tools-newproject');

    var NewProjHTML = require("./create-project-view.js");
    this.element.innerHTML = NewProjHTML.render();

    $('#vipera-tools-mam-newprj-choosefolder').on('click', function(){
      that.chooseFolder();
    });

    $('#de-tools-cordova-project-cordova-std').on('click', function(evt){
      that.toggleFramework(evt);
    });
    $('#de-tools-cordova-project-ionic-1').on('click', function(evt){
      that.toggleFramework(evt);
    });
    $('#de-tools-cordova-project-ionic-2').on('click', function(evt){
      that.toggleFramework(evt);
    });

    $('#vipera-tools-mam-newprj-cancel').on('click', function(evt){
      that.triggerCancelled();
    });

    $('#vipera-tools-mam-newprj-create').on('click', function(evt){
      that.createProject();
    });
  }

  createProject() {
    var projectInfo = this.buildProjectInfo();
    this.checkParameters(projectInfo, (projectInfo)=>{
      this.logger.info("Creating new project for: " + JSON.stringify(projectInfo));
      this.triggerProgress();
      this.cmdExecutor.createNewProjectWithSpawn(projectInfo).then((res) => {
        this.logger.log("Project creation completed");
        this.setWaitTo(false);
        atom.notifications.addSuccess("Project created successfully");
        this.triggerDone();
      },(err) => {
        this.logger.error("Project creation failed " + err);
        this.setWaitTo(false);
        atom.notifications.addError("Project creation failed.");
        this.triggerDone();
      })

      //this.logger.info("New project created!");
      //this.triggerDone();
    }, (error)=>{
      alert(error);
    })
  }

  buildProjectInfo(){
      var projectInfo = {};
      projectInfo.name = $('#de-tools-cordova-project-name').val();
      projectInfo.packageId = $('#de-tools-cordova-package-id').val();
      projectInfo.path = $('#de-tools-cordova-project-path').val() + "/" + projectInfo.name;
      projectInfo.type = this.getSelectedProjectType();
      projectInfo.platforms = this.getSelectedPlatforms();
      return projectInfo;
  }

  getSelectedPlatforms(){
    //here don't use $ (jquery) to check values!!
    var ret = new Array();
    if (document.getElementById('de-tools-cordova-project-platform-browser').checked){
      ret.push("browser");
    }
    if (document.getElementById('de-tools-cordova-project-platform-ios').checked){
      ret.push("ios");
    }
    if (document.getElementById('de-tools-cordova-project-platform-android').checked){
      ret.push("android");
    }
    return ret;
  }

  reset(){
    $('#de-tools-cordova-project-name').val('');
    $('#de-tools-cordova-package-id').val('com.yourcompany.yourapp');
    $('#de-tools-cordova-project-path').val('');
  }

  checkParameters(projectInfo, successCallback, failureCallback){
    if (projectInfo.name.length==0){
      failureCallback("Invalid Project name.");
      return;
    }
    if (projectInfo.packageId.length==0){
      failureCallback("Invalid Package ID.");
      return;
    }
    if (projectInfo.path.length==0){
      failureCallback("Invalid destination path.");
      return;
    }
    if (projectInfo.type.length==0){
      failureCallback("Invalid project type.");
      return;
    }
    if (projectInfo.platforms.length==0){
      failureCallback("Invalid platform.");
      return;
    }
    successCallback(projectInfo);
  }

  triggerProgress(){
      if (this.onProgressCallback){
        this.onProgressCallback();
      }
  }

  triggerCancelled(){
    if (this.onCancelCallback){
      this.onCancelCallback();
    }
  }

  triggerDone(){
    if (this.onCreateCallback){
      this.onCreateCallback();
    }
  }

  toggleFramework(evt){
    $('#de-tools-cordova-project-cordova-std').removeClass('selected');
    $('#de-tools-cordova-project-ionic-1').removeClass('selected');
    $('#de-tools-cordova-project-ionic-2').removeClass('selected');
    $('#'+evt.target.id).addClass('selected');
    this.onFrameworkSelected();
  }

  onFrameworkSelected(framework){
    var prjType = this.getSelectedProjectType();
    if (prjType==="cordova"){
      $('#de-tools-cordova-project-ionic-templates').css('display', 'none');
    } else {
      $('#de-tools-cordova-project-ionic-templates').css("display", "initial");
    }
  }

  getSelectedProjectType(){
    if ($('#de-tools-cordova-project-cordova-std').hasClass('selected')){
      return "cordova";
    }
    if ($('#de-tools-cordova-project-ionic-1').hasClass('selected')){
      return "ionic1";
    }
    if ($('#de-tools-cordova-project-ionic-2').hasClass('selected')){
      return "ionic2";
    }
    return "cordova";
  }


  chooseFolder() {
    var path = dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    $('#de-tools-cordova-project-path').val(path);
  }

  getElement(){
    return this.element;
  }

}
