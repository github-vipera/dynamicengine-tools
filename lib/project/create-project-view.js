'use babel';
module.exports = {
    render: function() {
        return `
            <img class="va-white-logo" src="atom://dynamicengine-debugger/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">
              <atom-panel class='padded'>
                <div class="inset-panel">
                  <div class="panel-heading">Project setup</div>
                  <div class="panel-body padded">
                    <div class='block'>
                      <label>Project name</label>
                      <input id='de-cordova-project-name' type='text' class='input-text native-key-bindings' placeholder='Your project name'>
                    </div>
                    <div class='block'>
                      <label style="display:block; padding-bottom:5px">Platforms</label>
                      <label class='input-label'><input class='input-checkbox' type='checkbox' checked> Android </label>
                      <label class='input-label'><input class='input-checkbox' type='checkbox' checked> iOS</label>
                    </div>
                  </div>
                </div>
              </atom-panel>
        `
    }

}
