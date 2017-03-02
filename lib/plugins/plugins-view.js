module.exports = {
    render: function() {
      return `
        <div class="panel padded" style="height: 100%; overflow-y: scroll;">
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



        </div>
      `
    }
}
