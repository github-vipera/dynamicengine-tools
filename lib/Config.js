'use babel'
export default class Config {
  static getConfig(){
    let settings={};
    settings.RemoteServerUrl= atom.config.get('dynamicengine-tools.RemoteServerUrl');
    settings.iOSRunPort= atom.config.get('dynamicengine-tools.iosRunPort');
    settings.androidRunPort= atom.config.get('dynamicengine-tools.androidRunPort');
    settings.browserRunPort= atom.config.get('dynamicengine-tools.browserRunPort');
    return settings;
  }
}
