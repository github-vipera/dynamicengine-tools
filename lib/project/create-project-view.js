'use babel';
module.exports = {
    render: function() {
        return `
        <img class="va-white-logo" src="atom://dynamicengine-debugger/resources/VA_white.png" style="position:absolute;opacity:0.05;top:-5px;right:-4px;height:50px;">

            <div class="">
            <section class="section">
              <div class="section-container" style="">
                <div class="section-heading" style="min-width:500px;font-size: 1em;font-weight: bold;line-height: 1;-webkit-user-select: none;cursor: default;display:inline-block;">
                  <span>Create New App Project</span>
                </div>
              </div>

              <div style="height:12px"></div>

              <div class='block'>
                <label>Project name</label>
                <input id='de-tools-cordova-project-name' type='text' class='input-text native-key-bindings' placeholder='Your project name'>
              </div>

              <div class='block'>
                <label>Package ID</label>
                <input id='de-tools-cordova-package-id' type='text' class='input-text native-key-bindings' placeholder='Your project package ID' value="com.yourcompany.yourapp">
              </div>

              <div class='block'>
                <label>Destintion Path</label>
                  <div style="height: 15px;width: 100%;padding-bottom: 30px;">
                    <input id='de-tools-cordova-project-path' type='text' class='input-text native-key-bindings' placeholder='Your project path' style="width:calc(100% - 138px);display: inline-block;">
                    <button class='inline-block btn highlight' id='vipera-tools-mam-newprj-choosefolder' style="margin-top:4px;margin-bottom:4px;width: 130px;">Choose Folder...</button>
                  </div>
              </div>

              <div class='block'>
                <label style="display:block; padding-bottom:5px">Project Type</label>
                  <div class='btn-group'>
                      <button class='btn selected' id="de-tools-cordova-project-cordova-std">Standard Apache Cordova</button>
                      <button class='btn' id="de-tools-cordova-project-ionic-1">Ionic Framework</button>
                      <button class='btn' id="de-tools-cordova-project-ionic-2">Ionic 2 Framework</button>
                  </div>
              </div>

              <div id="de-tools-cordova-project-ionic-templates" style="display:none;">
                <label class="text-warning" style="display:block; padding-bottom:5px">In order to create a Ionic project you need to have installed on your computer the Ionic cli utility.<br>
                To check if it's already installed launch 'ionic help' command into the terminal.
                <br>(To install the cli use the command: 'npm install -g ionic')</label>
                <label style="display:block; padding-bottom:5px">Project Template</label>
                <div class='block settings-view'>
                    <select id="ionic-template-select" class="form-control">
                      <option id="ionic-template-blank" value="blank">Blank</option>
                      <option id="ionic-template-tabs" value="tabs">Tabs</option>
                      <option id="ionic-template-seidemenu" value="sidemenu">Side Menu</option>
                      <option id="ionic-template-maps" value="maps">Maps</option>
                      <option id="ionic-template-complex-list" value="complex-list">Complex List</option>
                      <option id="ionic-template-salesforce" value="salesforce">Salesforce</option>
                    </select>
                </div>
              </div>

              <div class='block' style="margin-top:20px;">
                <label style="display:block; padding-bottom:5px">Platforms</label>
                <label class='input-label' style='padding-left:0px;'><input id="de-tools-cordova-project-platform-android"  class='input-checkbox' type='checkbox' style='padding-right:4px;' checked>Android </label>
                <label class='input-label' style='padding-left:10px;'><input  id="de-tools-cordova-project-platform-ios"  class='input-checkbox' type='checkbox' style='padding-right:4px;' checked>iOS</label>
                <label class='input-label' style='padding-left:10px;'><input id="de-tools-cordova-project-platform-browser" class='input-checkbox' type='checkbox' style='padding-right:4px;' checked>Browser</label>
              </div>

              <div style="height:1px;background-color:#5d5d5d;margin-top:20px;margin-bottom:8px;"></div>

              <div class='block'>
                <div class='btn-group'>
                  <button class='inline-block btn' id='vipera-tools-mam-newprj-cancel'>Cancel</button>
                  <button class='inline-block btn btn-info' id='vipera-tools-mam-newprj-create'>Create</button>
                </div>
              </div>

            </section>
            </div>


        `
    }

}
