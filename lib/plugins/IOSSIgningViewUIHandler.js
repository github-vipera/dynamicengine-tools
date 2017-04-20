'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import IOSProvisioningUtility from './IOSProvisioningUtility.js';
import Handlebars from 'Handlebars';
import chokidar from 'chokidar';

var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
export default class IOSSIgningViewUIHandler {

  constructor() {
    Logger.debug("create IOSSIgningViewUIHandler");
    this.iosProvisioningUtility = new IOSProvisioningUtility();
    this.provisioningProfiles = {};
  }

  init(){
    Logger.debug("onInit");
    var that = this;
    this.buildJson = this.defaultBuildJson();
    this.projectPath = atom.project.getPaths()[0];
    this.bindJS();
    $('#search-spinner').hide();
  }

  refreshProvisioningProfiles(completionCallback){
    var that = this;
    this.iosProvisioningUtility.loadProvisioningProfiles(function(err,success){
        //alert("Finito! " + success);
        if (err){
          alert(err);
          completionCallback(err);
        } else {
          that.loadProvisioningProfilesSelectors(success);
          if (completionCallback){
            completionCallback(null, this.provisioningProfiles);
          }
        }
    });
  }

  loadProvisioningProfilesSelectors(data){
    this.provisioningProfiles = data;

    $('#ios-provisioning-debug-select').empty();
    $('#ios-provisioning-release-select').empty();

    $('#ios-provisioning-debug-select').append($('<option>', {
      value: '-none-',
      text: ''
    }));
    $('#ios-provisioning-release-select').append($('<option>', {
      value: '-none-',
      text: ''
    }));

    Object.keys(data).forEach(function(k){
      $('#ios-provisioning-debug-select').append($('<option>', {
        value: k,
        text: data[k].appId
      }));
      $('#ios-provisioning-release-select').append($('<option>', {
        value: k,
        text: data[k].appId
      }));
    });
  }

  bindJS(){
    Logger.debug("bindJS");
    var that = this;

    $('#btn-refresh-ios-provisioning-profiles').on('click', function(evt){
      that.reloadProvisioningProfiles();
    });

    $('#btn-refresh-ios-provisioning-save-changes').on('click', function(evt){
      that.applyChanges();
    });

    $('#btn-refresh-ios-provisioning-revert-changes').on('click', function(evt){
      that.reloadBuildJson();
    });

    $('#ios-provisioning-debug-select').on('change', function(evt){
      var provisioningProfile = that.provisioningProfiles[this.value];
      if (provisioningProfile){
        that.displayProvisioningInfo(provisioningProfile, "debug");
        /**
        var teamId = provisioningProfile.teamIdentifier[0];
        $("#ios-provisioning-debug-team-id").val(teamId);
        var data = {
          "appId" : provisioningProfile.appIdentifier,
          "teamName" : provisioningProfile.teamName,
          "teamId" : teamId,
          "uuid" : provisioningProfile.data.UUID
        };
        var source   = $("#ios-provisioning-profile-debug-details").html();
        var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
        var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(data)));
        document.getElementById('ios-provisioning-profile-debug-details-rendered').innerHTML = result;
        **/
      }
    });

    $('#ios-provisioning-release-select').on('change', function(evt){
        var provisioningProfile = that.provisioningProfiles[this.value];
        if (provisioningProfile){
          that.displayProvisioningInfo(provisioningProfile, "release");
            /**
            var teamId = provisioningProfile.teamIdentifier[0];
            $("#ios-provisioning-release-team-id").val(teamId);
            var data = {
              "appId" : provisioningProfile.appIdentifier,
              "teamName" : provisioningProfile.teamName,
              "teamId" : teamId,
              "uuid" : provisioningProfile.data.UUID
            };
            var source   = $("#ios-provisioning-profile-release-details").html();
            var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
            var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(data)));
            document.getElementById('ios-provisioning-profile-release-details-rendered').innerHTML = result;
            **/
        }
    });

    this.reloadProvisioningProfiles();
  }

  displayProvisioningInfo(provisioningProfile, buildType){
    if (provisioningProfile){
      var teamId = provisioningProfile.teamIdentifier[0];
      $("#ios-provisioning-"+buildType+"-team-id").val(teamId);
      var data = {
        "appId" : provisioningProfile.appIdentifier,
        "teamName" : provisioningProfile.teamName,
        "teamId" : teamId,
        "uuid" : provisioningProfile.data.UUID
      };
      var source   = $("#ios-provisioning-profile-"+buildType+"-details").html();
      var docTemplate = allowUnsafeEval(() => allowUnsafeNewFunction(() => Handlebars.compile(source)));
      var result = allowUnsafeEval(() => allowUnsafeNewFunction(() => docTemplate(data)));
      document.getElementById("ios-provisioning-profile-"+buildType+"-details-rendered").innerHTML = result;
    }
  }

  reloadProvisioningProfiles(){
    var that = this;
    this.refreshProvisioningProfiles(function(err,success){
      that.reloadBuildJson();
      that.fileWatcher = chokidar.watch(that.buildJsonPath(), 'file', {
        ignored: /[\/\\]\./,
        persistent: true
      });
      that.fileWatcher.on('change', path => that.reloadBuildJson());
    });
  }

  writeBuildJson(buildJson){
    if (!buildJson){
      buildJson = this.buildJson;
    }
    var string = JSON.stringify(buildJson,null,'\t');
    fs.writeFile(this.buildJsonPath(),string,function(err) {
      if(err) return console.error(err);
        console.log('done');
    })
  }

  reloadBuildJson(){
    var exists = fs.existsSync(this.buildJsonPath());
    if (!exists){
      this.buildJson = this.defaultBuildJson();
      this.writeBuildJson(this.buildJson);
    } else {
      this.buildJson = JSON.parse(fs.readFileSync(this.buildJsonPath(), 'utf8'));
    }

    //Refresh UI
    if (this.buildJson.ios.debug.codeSignIdentity){
      $('#ios-provisioning-debug-code-sign-identity').val(this.buildJson.ios.debug.codeSignIdentity);
    }
    if (this.buildJson.ios.debug.packageType){
      $('#ios-provisioning-debug-pkg-type').val(this.buildJson.ios.debug.packageType);
    }
    if (this.buildJson.ios.debug.developmentTeam){
      $('#ios-provisioning-debug-team-id').val(this.buildJson.ios.debug.developmentTeam);
    }
    if (this.buildJson.ios.debug.provisioningProfile){
      var profile = this.getProfileByUUID(this.buildJson.ios.debug.provisioningProfile);
      if (profile){
        $('#ios-provisioning-debug-select').val(profile.data.Entitlements['application-identifier']);
        this.displayProvisioningInfo(profile, "debug");
      }
    }

    if (this.buildJson.ios.release.codeSignIdentity){
      $('#ios-provisioning-release-code-sign-identity').val(this.buildJson.ios.release.codeSignIdentity);
    }
    if (this.buildJson.ios.release.packageType){
      $('#ios-provisioning-release-pkg-type').val(this.buildJson.ios.release.packageType);
    }
    if (this.buildJson.ios.release.developmentTeam){
      $('#ios-provisioning-release-team-id').val(this.buildJson.ios.release.developmentTeam);
    }
    if (this.buildJson.ios.release.provisioningProfile){
      var profile = this.getProfileByUUID(this.buildJson.ios.release.provisioningProfile);
      if (profile){
        $('#ios-provisioning-release-select').val(profile.data.Entitlements['application-identifier']);
        this.displayProvisioningInfo(profile, "release");
      }
    }

    return this.buildJson;
  }

  getProfileByUUID(uuid){
    var that = this;
    for (var k in this.provisioningProfiles) {
     if (that.provisioningProfiles[k].data.UUID===uuid){
       return that.provisioningProfiles[k];
     }
   }
   return null;
  }

  defaultBuildJson(){
      return {
        "ios" : {
          "debug" : {},
          "release" : {}
        },
        "android" : {}
      };
  }

  buildJsonPath(){
      return this.projectPath + "/build.json";
  }

  onRemove(){
    Logger.debug("onRemove");
  }

  applyChanges(){
    var provisioningProfile = this.provisioningProfiles[$('#ios-provisioning-debug-select').val()];
    if (provisioningProfile){
      this.buildJson.ios.debug.developmentTeam = provisioningProfile.teamIdentifier[0];
      this.buildJson.ios.debug.provisioningProfile = provisioningProfile.data.UUID;
      this.buildJson.ios.debug.codeSignIdentity = $('#ios-provisioning-debug-code-sign-identity').val();
      this.buildJson.ios.debug.packageType = $('#ios-provisioning-debug-pkg-type').val();
    }

    var provisioningProfile = this.provisioningProfiles[$('#ios-provisioning-release-select').val()];
    if (provisioningProfile){
      this.buildJson.ios.release.developmentTeam = provisioningProfile.teamIdentifier[0];
      this.buildJson.ios.release.provisioningProfile = provisioningProfile.data.UUID;
      this.buildJson.ios.release.codeSignIdentity = $('#ios-provisioning-release-code-sign-identity').val();
      this.buildJson.ios.release.packageType = $('#ios-provisioning-release-pkg-type').val();
    }

    this.writeBuildJson();
  }


}
