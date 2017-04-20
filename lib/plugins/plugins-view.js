module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-puzzle inline-block">Installed Plugins</h1>
              <span class='badge inline-block' style="vertical-align:top;" id='installed-plugins-count-badge'></span>
              <button class='inline-block btn' style="vertical-align:top;" id='refresh-installed-plugins'><span class='fa fa-refresh' style='padding-right:4px;'></span>Reload</button>
            </div>
        </div>
      </div>

      <div class="section">
        <div class='section-container'>

          <div id='plugins-installed-results-container'></div>

          </div>
        </div>
      </div>

      </div>
      `
    }
}
