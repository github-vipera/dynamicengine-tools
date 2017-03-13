module.exports = {
    render: function() {
      return `
      <div class="push-settings-panel" ui-view="push-tool-mainview">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-gear">Push Settings</h1>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>

            <div id='push-config-container'></div>

            </div>
          </div>
        </div>

      </div>
      `
    }

}
