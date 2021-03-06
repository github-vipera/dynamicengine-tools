'use babel';


module.exports = {
    render: function() {
        return `
            <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;bottom:4px;right:4px;height:110px;">
              <atom-panel class='padded'>
                <div class="inset-panel" collapsable-name="platform">
                  <div class="panel-heading" collapsable-header-of="platform">
                    <span class='icon icon-device-mobile'></span>
                    Platforms
                    <span class='text-subtle'>&nbsp;&nbsp;(Select one platform)</span>
                    <span collapsable-icon class='icon icon-fold collapsable-icon'></span>
                    <span class='icon icon-repo-sync refresh' id="derunsettings-refreshUI"></span>
                  </div>
                  <div class="panel-body padded" collapsable-body-of="platform">
                    <div class='block'>
                      <select id="derunsettings-platform-select" class="form-control input-select" style="color: inherit; background-color: inherit">
                        <!-- <option>Android</option>
                        <option>iOS</option> -->
                      </select>
                    </div>

                    <!-- VARIAN SELECTOR -->
                    <div class='block'>
                      <label>Build variant</label>
                      <select id="derunsettings-variant-select" class="form-control input-select" style="color: inherit; background-color: inherit">

                      </select>
                      <span id="derunsettings-loader-variant" class='loading loading-spinner-small inline-block' style="display:none"></span>
                    </div>

                    <div class='block' id="derunsettings-devices-block" style="display:none">
                      <label>Device/Emulator</label>
                      <select id="derunsettings-device-select" class="form-control input-select" style="color: inherit; background-color: inherit">
                        <!--<option>Nexus 4</option>
                        <option>Nexus 5x</option>-->
                      </select>
                      <span id="derunsettings-loader-devices" class='loading loading-spinner-small inline-block' style="display:none"></span>
                    </div>

                    <!-- BUILD FLAG -->
                    <div class="inset-panel border-panel">
                      <div class="panel-heading">
                      <i class="fa fa-wrench" aria-hidden="true" style="padding-right: 5px;"></i>Build settings
                        <span class='text-subtle'>&nbsp;&nbsp;</span>
                      </div>
                      <div class="panel-body padded">
                        <div class='block build-flag-block'>
                          <label class='input-label'><input class='input-checkbox' type='checkbox' id="cbx-release"> Release </label>
                          <label class='input-label'><input class='input-checkbox' type='checkbox' id="cbx-buildConfig">Force BuildConfig</label>
                        </div>
                      </div>
                    </div>


                    <div class="block">
                      <div style='padding:8px; margins:8px;'>
                            <div class='block padded'>
                              <button id='derunsettings-btn-build' class='inline-block-tight btn'><span class="icon icon-gear"></span>Build</button>
                              <button id='derunsettings-btn-run' class='inline-block-tight btn'><span class="icon icon-playback-play"></span>Run</button>
                              <button id='derunsettings-btn-stop' class='inline-block-tight btn'><span class='icon icon-primitive-square'></span>Stop</button>
                              <button id='derunsettings-btn-clear' class='inline-block-tight btn'><span class='icon icon-trashcan'></span>Clear</button>
                              <button id='derunsettings-server-btn-liveReload' class='inline-block-tight btn'><span class='icon icon-repo-sync'></span>Live Reload</button>
                            </div>
                            <!-- <div id="derunsettings-status-indicator" style="height:2px;background:#565656;"></div> -->
                            <div class='block'>
                              <progress id="derunsettings-progress" class='inline-block' style="width:100%; display:none"></progress>
                            </div>
                            <div class="block">
                              <div id="derunsettings-status-indicator" style="height:2px;background:#565656;"></div>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </atom-panel>

              <atom-panel class='padded'>
                <div class="inset-panel" collapsable-name="remote">
                  <div class="panel-heading" collapsable-header-of="remote">
                    <span class='icon icon-versions'></span>
                    Remote Server
                    <span collapsable-icon class='icon icon-fold collapsable-icon'></span>
                  </div>
                  <div class="panel-body padded" collapsable-body-of="remote">

                    <div class='block'>
                      <label>Server Mock Implementation</label>
                      <input id='derunsettings-txt-serverMockImpl' type='text' class='input-text native-key-bindings' placeholder='Server Mock Implementation'>
                    </div>
                    <!--<div class='block'>
                      <label>Native storage directory</label>
                      <input id='derunsettings-txt-localdatabase' type='text' class='input-text native-key-bindings' placeholder='Native storage directory'>
                    </div>-->
                    <div class='block'>
                      <label>Library loader</label>
                      <input id='derunsettings-txt-libraryLoader' type='text' class='input-text native-key-bindings' placeholder='JS library loader file'>
                    </div>
                  </div>
                </div>
              </atom-panel>

        `
    }

}
