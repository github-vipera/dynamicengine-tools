'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'
import CordovaUtils from '../cordova/utils/CordovaUtils'

export default class PushToolUIHandler {
  constructor(div) {
    Logger.debug("createing PushTool");
    this.div;
    this.currentView=undefined;
  }

  init(){
    this.initUI();
    Logger.debug("init called");
    if(this.currentView){
      var toSelect=this.currentView.menuId;
      this.currentView=undefined;
      this.selectPanel(toSelect);
    }else{
      this.selectPanel("InstalledPluginsMenuItem");
    }
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
    console.log("selectPanel with id:",panelId);
    $('#InstalledPluginsMenuItem').removeClass('menu-item-selected');
    $('#InstallMenuItem').removeClass('menu-item-selected');
    $('#VariantsMenuItem').removeClass('menu-item-selected');
    $('#' + panelId).addClass('menu-item-selected');

    var panelId = _.replace(panelId, 'MenuItem', 'Panel');
    console.log("PanelId:",panelId);

    var selectedView = this.routeConfig[panelId];
    if(selectedView){
      console.info("View founded in config");
      if(selectedView == this.currentView){
        console.info("View already selected");
        return;
      }
      if(this.currentView && this.currentView.controller){
        this.currentView.controller.onRemove();
      }
      this.currentView=selectedView;
      this.replaceMainContainer(selectedView);
      if(selectedView.controller){
        selectedView.controller.init();
      }
    }else{
      this.currentView=undefined;
      this.removeViewFromMainContainer();
    }
    /*
    $('#InstalledPluginsPanel').addClass('hidden-panel');
    $('#InstallPanel').addClass('hidden-panel');
    $('#' + panelId).removeClass('hidden-panel');
    */
  }

  replaceMainContainer(selectedView){
    $("div[ui-view='main']").replaceWith(selectedView.view.render());
  }
  removeViewFromMainContainer(){
    $("div[ui-view='main']").empty();
  }


  setRouteConfig(config){
    this.routeConfig=config;
  }

}