'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import CordovaUtils from '../cordova/utils/CordovaUtils'
export default class PluginsUIHandler {

  constructor(div,cmdExecutor,platformServer) {
    console.log("create PluginsUIHandler");
    this.div;
    this.cmdExecutor=cmdExecutor;
    this.platformServer=platformServer;
  }

  init(){
    this.initUI();
    console.log("init called");
  }

  initUI(){
    $('#InstalledPluginsMenuItem').bind('click', (evt) => {
        this.selectPanel('InstalledPluginsMenuItem');
        //alert('Show installed plugins!');
    });
    $('#InstallMenuItem').bind('click', (evt) => {
        this.selectPanel('InstallMenuItem');
        //alert('Show Install Panel!');
    });
  }

  selectPanel(panelId){
    $('#InstalledPluginsMenuItem').removeClass('menu-item-selected');
    $('#InstallMenuItem').removeClass('menu-item-selected');
    $('#' + panelId).addClass('menu-item-selected');


    var panelId = _.replace(panelId, 'MenuItem', 'Panel');
    $('#InstalledPluginsPanel').addClass('hidden-panel');
    $('#InstallPanel').addClass('hidden-panel');
    $('#' + panelId).removeClass('hidden-panel');
  }

}
