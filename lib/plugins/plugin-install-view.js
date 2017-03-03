module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-plus">Install New Plugins</h1>
              <div class="search-container clearfix">
                <div class="editor-container">
                 <input id='txt-plugins-search' class='input-search native-key-bindings' type='search' placeholder='Search a plugin'>
                </div>
            </div>
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
