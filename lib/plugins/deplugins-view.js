module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;bottom:4px;right:4px;height:110px;">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-puzzle inline-block">Dynamic Engine Plugins</h1>
              <span class='badge inline-block' style="vertical-align:top;" id='installed-plugins-count-badge'></span>
              <button class='inline-block btn' style="vertical-align:top;" id='refresh-installed-plugins'><span class='fa fa-refresh' style='padding-right:4px;'></span>Reload</button>
            </div>
            <div class="block">
             <button class='inline-block btn' style="vertical-align:top;" id='install-vipera-npm-registry'><span class='icon icon-repo-clone' style='padding-right:4px;'></span>Set Vipera NPM Registry</button>
             <button class='inline-block btn' style="vertical-align:top;" id='restore-default-npm-registry'><span class='icon icon-repo' style='padding-right:4px;'></span>Restore Default NPM Registry</button>
            <div style="margin-top:8px;" class="text-subtle">Current NPM registry:&nbsp&nbsp<span class="inline-block highlight" id="current-npm-registry">Unknown</span></div>
            </div>
        </div>
      </div>

      <div class="section">
        <div class='section-container'>

          <div id='deplugins-list-container'></div>

          </div>
        </div>
      </div>

      </div>
      `
    }
}
