module.exports = {
    render: function() {
      return `
      <div style="display:flex;height: 100%;">


          <div style="" class='plugins-settings-left-menu-bar-container'>
                <div class='select-list plugins-settings-left-menu-bar'>
                    <ol id='plugin-settings-menu-list' class='list-group panels-menu nav nav-pills nav-stacked plugins-settings-left-menu-list' style='margin-bottom: 0;padding-left: 0;list-style: none;'>
                        <li class='plugins-settings-left-menu-list-item menu-item-selected' id='InstalledPluginsMenuItem'>
                            <div class='icon icon-puzzle'>Installed Plugins</div>
                        </li>
                        <li class='plugins-settings-left-menu-list-item' id='InstallMenuItem'>
                            <div class='icon icon-plus'>Install</div>
                        </li>
                    </ol>
                </div>
          </div>





          <div class="panel padded plugins-settings-panel hidden-panel" id="InstallPanel">
              <div class='block icon icon-puzzle'>
                <h1 style="display: inline">Install plugins</h1>
              </div>

          </div>


            <div class="panel padded plugins-settings-panel" id="InstalledPluginsPanel">
              <div class='block icon icon-puzzle'>
                <h1 style="display: inline">Installed plugins</h1>
                <span class='badge'style="margin-left:10px ; vertical-align: bottom">8</span>
              </div>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>

              <atom-panel class='padded'>
                  <div class="inset-panel padded">
                    <h2> Plugin id <span class='text-subtle'>&nbsp;&nbsp;(0.1.0)</span></h2>
                    <h3> Plugin Name </h3>
                    <p style="padding-bottom:10px"> This is a placeholder for your plugin description </p>
                    <div style="position:absolute; right:10px; bottom:10px; display:block">
                        <p>&nbsp</p>
                        <button class='btn icon icon-gear inline-block-tight' style="float: right;">Settings</button>
                        <button class='btn btn-primary icon icon-cloud-download inline-block-tight' style="float: right;">Install</button>
                        <button class='btn btn-error icon icon-octoface inline-block-tight' style="float: right;">Remove</button>
                    </div>
                  </div>
              </atom-panel>


            </div>

        </div>
      `
    }
}
