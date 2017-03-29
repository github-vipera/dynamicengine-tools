'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger.js'

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
      this.selectPanel("SendPushMenuItem");
    }
  }

  initUI(){
    $('#SendPushMenuItem').bind('click', (evt) => {
        this.selectPanel('SendPushMenuItem');
    });
    $('#PushSettingsMenuItem').bind('click', (evt) => {
        this.selectPanel('PushSettingsMenuItem');
    });

  }


  selectPanel(panelId){
    console.log("selectPanel with id:",panelId);
    $('#SendPushMenuItem').removeClass('menu-item-selected');
    $('#PushSettingsMenuItem').removeClass('menu-item-selected');
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
  }

  replaceMainContainer(selectedView){
    $("div[ui-view='push-tool-mainview']").replaceWith(selectedView.view.render());
  }
  removeViewFromMainContainer(){
    $("div[ui-view='push-tool-mainview']").empty();
  }


  setRouteConfig(config){
    this.routeConfig=config;
  }

}
