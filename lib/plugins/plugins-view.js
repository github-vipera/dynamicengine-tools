module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-puzzle inline-block">Installed Plugins</h1>
              <span class='badge inline-block' style="vertical-align:top;" id='installed-plugins-count-badge'></span>
              <button class='inline-block btn btn-xs' style="vertical-align:top;" id='refresh-installed-plugins'>Reload</button>
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
