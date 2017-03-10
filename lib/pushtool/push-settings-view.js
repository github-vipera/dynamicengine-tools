module.exports = {
    render: function() {
      return `
      <div class="push-settings-panel" ui-view="main">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-plus">Push Settings</h1>
              <div class="search-container clearfix">
                <div class="editor-container">
                 <div class='block'>
                  <input id='txt-plugins-search' style='display:initial;width:95%;' class='input-search native-key-bindings' type='search' placeholder='Search a plugin'>
                  <span id='search-spinner' class='loading loading-spinner-tiny inline-block'></span>
                 </div>

                 <div class='block' style='padding-top:10px;'>
                     <div class='btn-group'>
                         <button class='btn selected platform-select' platform-select platform='android'><i class='fa fa-android' aria-hidden="true" style='padding-right:4px;'></i>Android</button>
                         <button class='btn platform-select' platform-select platform='ios'><i class='fa fa-apple' aria-hidden="true" style='padding-right:4px;'></i>iOS</button>
                         <!--
                         <button class='btn platform-select' id='platform-select-windows'><i class='fa fa-windows' aria-hidden="true" style='padding-right:4px;'></i>Windows</button>
                         <button class='btn platform-select' id='platform-select-blackberry'>Blackberry</button>
                         <button class='btn platform-select' id='platform-select-ubuntu'><i class='fa fa-linux' aria-hidden="true" style='padding-right:4px;'></i>Ubuntu</button>
                         <button class='btn platform-select' id='platform-select-firefox'><i class='fa fa-firefox' aria-hidden="true" style='padding-right:4px;'></i>Firefox OS</button>
                         <button class='btn platform-select' id='platform-select-macos'>Mac OS</button>
                         -->
                         <button class='btn platform-select' platform-select platform='browser'><i class='fa fa-chrome' aria-hidden="true" style='padding-right:4px;'></i>Browser</button>
                     </div>
                 </div>

                 <div class='block' style='padding-top:10px;'>
                   <div class='btn-group'>
                       <button class='btn' id='btn-install-plugin-manually'>Install plugin manually...</button>
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
