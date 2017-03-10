'use babel'
import $ from 'JQuery'
export default class CollapsablePanelHandler {
  constructor(containerName){
    this.containerName=containerName;
  }
  collapse(){
    console.log("collapse");
    this.headerRef.removeClass("expanded");
    this.headerRef.addClass("collapsed");
    this.bodyRef.addClass("body-collapsed");
  }
  expand(){
    console.log("expand");
    this.headerRef.removeClass("collapsed");
    this.headerRef.addClass("expanded");
    this.bodyRef.removeClass("body-collapsed");
  }
  isExpanded(){
    return !this.bodyRef.hasClass('body-collapsed');
  }

  bindJS(){
    console.info("bindJS for CollapsablePanelHandler",this.containerName);
    this.containerRef=$("[collapsable-name='" + this.containerName +"']");
    this.headerRef= $("[collapsable-header-of='" + this.containerName +"']");
    this.bodyRef= $("[collapsable-body-of='" + this.containerName +"']");

    this.headerRef.on('click',(evt) => {
      this.toggle();
    });
  }
  toggle(){
    if(this.isExpanded()){
      this.collapse();
    }else{
      this.expand();
    }
  }
}