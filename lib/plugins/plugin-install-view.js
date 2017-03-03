module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-plus">Install New Plugins</h1>
              <div class="search-container clearfix">
                <div class="editor-container">
                 <div class='block'>
                  <input id='txt-plugins-search' style='display:initial;width:95%;' class='input-search native-key-bindings' type='search' placeholder='Search a plugin'>
                  <span id='search-spinner' class='loading loading-spinner-tiny inline-block'></span>
                 </div>

                 <div class='block' style='padding-top:10px;'>
                     <div class='btn-group'>
                         <button class='btn selected'>Android</button>
                         <button class='btn'>iOS</button>
                         <button class='btn'>Windows</button>
                         <button class='btn'>Blackberry</button>
                         <button class='btn'>Ubuntu</button>
                         <button class='btn'>Firefox OS</button>
                         <button class='btn'>Mac OS</button>
                         <button class='btn'>Browser</button>
                     </div>
                 </div>

                </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>

            <div id='plugins-search-results-container'></div>

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
