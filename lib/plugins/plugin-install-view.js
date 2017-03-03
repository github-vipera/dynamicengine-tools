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
                         <button class='btn selected platform-select' id='platform-select-android'>Android</button>
                         <button class='btn platform-select' id='platform-select-ios'>iOS</button>
                         <button class='btn platform-select' id='platform-select-windows'>Windows</button>
                         <button class='btn platform-select' id='platform-select-blackberry'>Blackberry</button>
                         <button class='btn platform-select' id='platform-select-ubuntu'>Ubuntu</button>
                         <button class='btn platform-select' id='platform-select-firefox'>Firefox OS</button>
                         <button class='btn platform-select' id='platform-select-macos'>Mac OS</button>
                         <button class='btn platform-select' id='platform-select-browser'>Browser</button>
                     </div>
                 </div>

                 <div class='block' style='padding-top:10px;'>
                   <div class='btn-group'>
                       <button class='btn' id='btn-install-plugin-by-id'>Install plugin manually...</button>
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
