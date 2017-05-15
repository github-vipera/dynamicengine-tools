'use babel'
import SKDManager from '../sdkmanagement/SDKManager'
export default class DEPluginsDataLoader {
  constructor() {}

  loadData(useSdkManager) {
    if(useSdkManager){
      return SKDManager.getSDKPackages();
    }

    var ret = [
      {
        "name": "de-motifconnector-plugin",
        "url": "https://gitlab.vipera.com/dynamic-engine/de-motifconnector-plugin",
        "repoUrl": "https://gitlab.vipera.com/dynamic-engine/de-motifconnector-plugin.git",
        "version": "1.0.0",
        "description": "MOTIF Connector plugin",
        "lastUpdate": "27/08/1973"
      },
      {
        "name": "de-splashscreen-plugin",
        "url": "https://gitlab.vipera.com/dynamic-engine/de-splashscreen-plugin",
        "repoUrl": "https://gitlab.vipera.com/dynamic-engine/de-splashscreen-plugin.git",
        "version": "1.0.0",
        "description": "Splash Screen Plugin",
        "lastUpdate": "27/08/1973"
      },
      {
        "name": "de-tools-plugin",
        "url": "https://gitlab.vipera.com/dynamic-engine/de-tools-plugin",
        "repoUrl": "https://gitlab.vipera.com/dynamic-engine/de-tools-plugin.git",
        "version": "1.0.0",
        "description": "Plugin for connection with official Dynamic Engine Debugger tools",
        "lastUpdate": "27/08/1973"
      },
      {
        "name": "de-core-plugin",
        "url": "https://gitlab.vipera.com/dynamic-engine/de-core-plugin",
        "repoUrl": "https://gitlab.vipera.com/dynamic-engine/de-core-plugin.git",
        "version": "1.0.0",
        "description": "Core plugin",
        "lastUpdate": "27/08/1973"
      },
      {
        "name": "de-assetmanager-plugin",
        "url": "https://gitlab.vipera.com/dynamic-engine/de-assetmanager-plugin",
        "repoUrl": "https://gitlab.vipera.com/dynamic-engine/de-assetmanager-plugin.git",
        "version": "1.0.0",
        "description": "Dynamic Engine Asset Update plugin",
        "lastUpdate": "27/08/1973"
      }


    ];
    return ret;
  }

}
