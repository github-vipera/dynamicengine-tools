'use babel'
import Logger from '../logger/Logger'

var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var provisioning = require('provisioning');


export default class IOSProvisioningUtility {

  constructor() {
    Logger.debug("creating IOSProvisioningUtility");

    this.path = atom.project.getPaths()[0];
    this.projectFileName = this.path + "/.detools.project" ;

    this.homeFolder = process.env['HOME'];
    this.provisioningProfileFolder = this.homeFolder + "/Library/MobileDevice/Provisioning Profiles/";

    Logger.debug("Current home folder: " + this.homeFolder);
    Logger.debug("Provisioning profile folder: " + this.provisioningProfileFolder);

    //this.loadProvisioningProfiles();

  }

  getHomeFolder(){
    return this.homeFolder;
  }

  loadProvisioningProfiles(completionCallback){
    Logger.debug('Loading available Provisioning Profiles...');

    var that = this;

    this.provisiongProfiles = {};

    Logger.debug('Loading provisioning profile '+ filename +'...');

    if (!filename){
      completionCallback("Provisioning profiles folder not found.", undefined);
      return;
    }
    
    var provisioningFileNames = fs.readdirSync(this.provisioningProfileFolder);
    this.totalFilesToProcess = provisioningFileNames.length;
    for (var i=0;i<provisioningFileNames.length;i++){
      var filename = this.provisioningProfileFolder + provisioningFileNames[i];
      Logger.debug('Loading provisioning profile '+ filename +'...');
      provisioning(filename, function(error, data){
        if (error){
          Logger.debug('Error loading provisioning profile: '+ error);
        }
        else if (data){
          var appIdentifier = data.Entitlements['application-identifier'];
          var teamIdentifier = data.TeamIdentifier;
          var teamName = data.TeamName;
          var applicationIdentifierPrefix = data.ApplicationIdentifierPrefix;
          var appId = appIdentifier.substring(applicationIdentifierPrefix[0].length + 1, appIdentifier.length);
          that.provisiongProfiles[appIdentifier] = {
            "appId" : appId,
            "appIdentifier" : appIdentifier,
            "teamIdentifier" : teamIdentifier,
            "teamName" : teamName,
            "data" : data
          };
        } else {

        }
        that.totalFilesToProcess--;
        if (that.totalFilesToProcess==0){
          completionCallback(undefined, that.provisiongProfiles)
        }
      });
    }

    Logger.debug('...loading available Provisioning Profiles...');

  }

}
