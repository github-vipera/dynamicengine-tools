'use babel'
import $ from 'JQuery'
import _ from 'lodash'
var remote = require('remote');
var dialog = remote.require('electron').dialog;

export default class CreateProjectUIHandler{

  constructor(){
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
  }

  reset(){
    $('#de-tools-cordova-project-name').val('');
    $('#de-tools-cordova-package-id').val('com.yourcompany.yourapp');
    $('#de-tools-cordova-project-path').val('');
  }

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
