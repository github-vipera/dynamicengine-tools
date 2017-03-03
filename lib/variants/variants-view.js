module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class='block icon icon-versions'>
            <h1 style="display: inline">Variants</h1>
          </div>
        </div>

        <div class="section">
          <div class='block'>
            <h1 style="display: inline">No Variants defined</h1>
          </div>
        </div>

      </div>
      `
    }
}
