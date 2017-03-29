'use babel'
export default class Config {
  static getConfig(){
    let settings={};
    settings.RemoteServerUrl= atom.config.get('cordova-de-debugger.RemoteServerUrl');
    settings.iOSRunPort= atom.config.get('cordova-de-debugger.iosRunPort');
    settings.androidRunPort= atom.config.get('cordova-de-debugger.androidRunPort');
    settings.browserRunPort= atom.config.get('cordova-de-debugger.browserRunPort');
    return settings;
  }
}
