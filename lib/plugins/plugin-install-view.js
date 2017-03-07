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
    },

    renderModalForManualInstall: function() {
      return `
      <atom-panel class='' style='background-color:transparent;paddin:5px;'>
        <div class="manual-plugin-installation-popup">
          <div class='block'>
           <input id='txt-manual-plugin-install-spec' style='display:initial;' class='input-search native-key-bindings' type='search' placeholder='Enter a plugin ID or path'>
          </div>


          <span style="width:100%;display:flex;" class="inline-block">
            <label style="flex:1;"></label>
            <button style="margin-left:10px;margin-right:10px;margin-top:nullpx;" class="no normal btn" id="cancel-plugin-install">Cancel</button>
            <button style="" class="btn-success normal btn" id="do-plugin-manually-install">Install</button>
          </span>

        </div>
      </atom-panel>
      `
    },

    getModalForManualInstall: function(JQuery){
      var item= JQuery(document.createElement('div'));
         item.append(this.renderModalForManualInstall());
         return item;
    }

}
