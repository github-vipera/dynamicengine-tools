module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-plus">Install New Plugins</h1>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>
            <div class='block icon icon-puzzle'>
              <h1 style="display: inline">Found</h1>
            </div>
          </div>
        </div>

      </div>
      `
    }
}
