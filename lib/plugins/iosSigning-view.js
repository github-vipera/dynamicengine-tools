module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-shield inline-block">iOS App Signing</h1>
              <div class='block'>
                <button class='btn icon icon-shield inline-block-tight' id="btn-refresh-ios-provisioning-profiles">Reload Provisioning Profiles</button>
                <button class='btn icon inline-block-tight' id="btn-refresh-ios-provisioning-revert-changes">Revert Changes</button>
                <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-refresh-ios-provisioning-save-changes">Save Changes</button>
              </div>
            </div>
        </div>
      </div>

      <div class="section  settings-view">
        <div class='section-container' style="max-width: none;">

            <div>
              <div class='container package-container' style="padding-top:20px;">
                <div class='package-card col-lg-8'>
                  <h3 style="margin-top: 0px;">Debug</h3>

                  <div class='block'>
                    <label  style="font-size: 0.7em;">Provisioning Profile</label>
                    <select id="ios-provisioning-debug-select" class="form-control" style="font-size:1em;">
                    </select>
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Development Team</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='Development Team' id="ios-provisioning-debug-team-id">
                  </div>

                  <div class='block'>
                    <label  style="font-size: 0.7em;">Code Sign Identity</label>
                    <input id="ios-provisioning-debug-code-sign-identity" class='input-text native-key-bindings' type='text' placeholder='Code Sign Identity' value='iPhone Developer'>
                  </div>

                  <div class='block'>
                    <label  style="font-size: 0.7em;">Package Type</label>
                    <div class='block settings-view'>
                        <select id="ios-provisioning-debug-pkg-type" class="form-control" style="font-size:1em;">
                          <option id="ios-provisioning-debug-pkg-type-development" value="development">Development</option>
                          <option id="ios-provisioning-debug-pkg-type-ad-hoc" value="ad-hoc">Ad-Hoc</option>
                          <option id="ios-provisioning-debug-pkg-type-enterprise" value="enterprise">Enterprise</option>
                          <option id="ios-provisioning-debug-pkg-type-app-store" value="app-store">App-Store</option>
                        </select>
                    </div>
                  </div>

                  <script id="ios-provisioning-profile-debug-details" type="text/x-handlebars-template">
                  <div class="ios-provisioning-profile-details">
                    <label class="block" style="font-size: 0.9em;">Application Identifier: {{appId}}</label><br>
                    <label class="block" style="font-size: 0.9em;">Development Team: {{teamName}} - {{teamId}}</label><br>
                    <label class="block" style="font-size: 0.9em;">UUID: {{uuid}}</label><br>
                  </div>
                  </script>
                  <div id="ios-provisioning-profile-debug-details-rendered" class="status-ignored"></div>

                </div>
              </div>
            </div>

            <div>
              <div class='container package-container' style="padding-top:20px;">
                <div class='package-card'>
                <h3 style="margin-top: 0px;">Release</h3>

                <div class='block'>
                  <label  style="font-size: 0.7em;">Provisioning Profile</label>
                  <select id="ios-provisioning-release-select" class="form-control" style="font-size:1em;">
                  </select>
                </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Development Team</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='Development Team' id="ios-provisioning-release-team-id">
                  </div>

                  <div class='block'>
                    <label  style="font-size: 0.7em;">Code Sign Identity</label>
                    <input id="ios-provisioning-release-code-sign-identity" class='input-text native-key-bindings' type='text' placeholder='Code Sign Identity' value='iPhone Developer'>
                  </div>

                  <div class='block'>
                    <label  style="font-size: 0.7em;">Package Type</label>
                    <div class='block settings-view'>
                        <select id="ios-provisioning-release-pkg-type" class="form-control" style="font-size:1em;">
                        <option id="ios-provisioning-release-pkg-type-development" value="development">Development</option>
                        <option id="ios-provisioning-release-pkg-type-ad-hoc" value="ad-hoc">Ad-Hoc</option>
                        <option id="ios-provisioning-release-pkg-type-enterprise" value="enterprise">Enterprise</option>
                        <option id="ios-provisioning-release-pkg-type-app-store" value="app-store">App-Store</option>
                        </select>
                    </div>
                  </div>

                  <script id="ios-provisioning-profile-release-details" type="text/x-handlebars-template">
                  <div class="ios-provisioning-profile-details">
                    <label class="block" style="font-size: 0.9em;">Application Identifier: {{appId}}</label><br>
                    <label class="block" style="font-size: 0.9em;">Development Team: {{teamName}} - {{teamId}}</label><br>
                    <label class="block" style="font-size: 0.9em;">UUID: {{uuid}}</label><br>
                  </div>
                  </script>
                  <div id="ios-provisioning-profile-release-details-rendered" class="status-ignored"></div>

                </div>
              </div>
            </div>

        </div>
      </div>

      </div>
      `
    }
}
