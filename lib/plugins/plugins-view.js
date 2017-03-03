module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-puzzle inline-block">Installed Plugins</h1>
              <span class='badge inline-block' style="vertical-align:top;" id='installed-plugins-count-badge'></span>
            </div>
        </div>
      </div>

      <div class="section">
        <div class='section-container'>

          <div id='plugins-installed-results-container'></div>

          <!--
            <h1 style="display: inline">Found</h1>
          -->

          </div>
        </div>
      </div>

      </div>
      `
    }
}
