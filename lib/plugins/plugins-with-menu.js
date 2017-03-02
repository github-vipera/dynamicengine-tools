module.exports = {
    render: function() {
      return `
      <div style="display:flex;height: 100%;">
          <div style="flex:2; border-right: 1px solid">
            <!--<ul style="list-style-type: none">
              <li><h3 class="icon icon-puzzle">Plugins<h3></li>
              <li><h3 class="icon icon-plus">Install<h3></li>
            </ul> -->

            <atom-panel class=''>
                <div class='select-list'>
                    <ol class='list-group'>
                        <li class='selected'>
                            <div class='icon icon-puzzle'>Plugins</div>
                        </li>
                        <li>
                            <div class='icon icon-plus'>Install</div>
                        </li>
                    </ol>
                </div>
            </atom-panel>

          </div>

            <div class="panel padded" style="height: 100%; overflow-y: scroll; flex:5">
              <div class='block icon icon-puzzle'>
                <h1 style="display: inline"> Installed plugin </h1>
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
