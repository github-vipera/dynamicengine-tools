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

  init(onCancelCallback, onCreateCallback){
    var that = this;

    this.onCancelCallback = onCancelCallback;
    this.onCreateCallback = onCreateCallback;

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
    this.checkParameters(projectInfo, function(){
      alert("OK lo creo subito!");
    }, function(error){
      alert(error);
    })
  }

  buildProjectInfo(){
      var projectInfo = {};
      projectInfo.name = $('#de-tools-cordova-project-name').val();
      projectInfo.packageId = $('#de-tools-cordova-package-id').val();
      projectInfo.path = $('#de-tools-cordova-project-path').val();
      projectInfo.type = this.getSelectedProjectType();
      projectInfo.platforms = this.getSelectedPlatforms();
      return projectInfo;
  }

  getSelectedProjectType(){
    //TODO!!
    return "cordova";
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
    successCallback();
  }

/**
  checkParameters(){
    var isOK = 0;
    isOK += this.checkElementParameter('de-tools-cordova-project-name');
    isOK += this.checkElementParameter('de-tools-cordova-package-id');
    isOK += this.checkElementParameter('de-tools-cordova-project-path');
    return (isOK==0);
  }

  checkElementParameter(elementId){
    var val = this.checkParameter($('#' + elementId).val());
    if (val!=0){
      this.logger.warn("Invalid value for " + elementId);
    }
    return val;
  }

  checkParameter(value){
    if (value.length==0){
      return 1;
    } else {
      return 0;
    }
  }
**/

  triggerCancelled(){
      this.onCancelCallback();
  }

  toggleFramework(evt){
    $('#de-tools-cordova-project-cordova-std').removeClass('selected');
    $('#de-tools-cordova-project-ionic-1').removeClass('selected');
    $('#de-tools-cordova-project-ionic-2').removeClass('selected');
    $('#'+evt.target.id).addClass('selected');
    this.onFrameworkSelected(evt.target.id);
  }

  onFrameworkSelected(framework){
    if (framework==="de-tools-cordova-project-cordova-std"){
      $('#de-tools-cordova-project-ionic-templates').css('display', 'none');
    } else {
      $('#de-tools-cordova-project-ionic-templates').css("display", "initial");
    }
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
